const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require("../db/index");


// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    const user = new User({
        username,
        password
    })
    user.save();
    res.json({
        message : "User created successfully"
    });
});

router.get('/courses',userMiddleware, async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find();
    res.json(allCourses)
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if(!course){
        res.status(404).json({
            message : "Course Does not exist"
        })
        return;
    }
    const user = res.locals.user;

    const query = {
        purchasedCourses : course
    }

    const courseExist = await User.findOne(query);

    if(courseExist){
        res.status(403).json({
            message : "Course already exists"
        })
        return;
    }

    const userId = user.id;
    const purchasedCoursesUpdated = user.purchasedCourses;
    purchasedCoursesUpdated.push(course);

    const updateQuery = { 
        purchasedCourses : purchasedCoursesUpdated
    }
    const userUpdated = await User.findByIdAndUpdate(userId,updateQuery,{ 
        new : true
    });
    
    res.json({
        message : "Course Purchased Successfully"
    })
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    const user = res.locals.user;
    res.json(user.purchasedCourses);
});

module.exports = router