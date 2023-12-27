const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const {User,Course} = require("../db/index");
const {secretpassword} = require("../jwt")


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = new User({
        username,
        password
    });
    const isUserPresent = await User.findOne({
        username : username
    });

    if(isUserPresent){
        res.status(403).json({
            message : "User already exists"
        })
        return;
    }
    user.save()
    res.json({
        message : "User added Successfully"
    })

});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({
        username,
        password
    });
    if(!user){
        res.status(404).json({
            message : "User does not exist, Sign Up first"
        });
        return;
    }
    const token = jwt.sign({
        username : username
    }, secretpassword);

    res.json({
        token : token
    });
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    courses = await Course.find();
    res.json(courses);
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if(!course){
        res.status(404).json({
            message : "Course does not exist"
        })
        return;
    }
    const username = res.locals.username;
    const user = await User.findOne({
        username : username
    })


    const userCourses = user.purchasedCourses;

    const query = {
        purchasedCourses : course
    }

    const courseExists = await User.findOne(query);

    if(courseExists){
        res.status(403).json({
            message : "You have already purchased this course"
        })
        return;
    }

    userCourses.push(course);
    const userId = user.id;
    const updateQuery = {
        purchasedCourses : userCourses
    }
    const updatedUser = await User.findByIdAndUpdate(userId,updateQuery,{
        new : true
    })

    res.json({
        message : "Course Purchased Successfully"
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = res.locals.username;
    const user = await User.findOne({
        username : username
    });
    res.json(user.purchasedCourses);
});

module.exports = router