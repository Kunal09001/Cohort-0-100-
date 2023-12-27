const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin,Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const router = Router();
const { secretpassword } = require("../jwt")
// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const admin = new Admin({
        username,
        password
    })

    const isAdminPresent = await Admin.findOne({
        username : username
    })
    if(isAdminPresent){
        res.status(403).json({
            message : "User already Exists"
        })
        return;
    }

    admin.save();
    res.json({
        message : "Admin added successfully"
    });
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const admin = await Admin.findOne({
        username,
        password
    });
    if(!admin){
        res.status(404).json({
            message : "Admin does not exit. Create the account first"
        })
        return;
    }
    console.log(secretpassword);
    const token = jwt.sign({ username : username}, secretpassword);
    res.json({
        token : token
    });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const course = new Course({
        title,
        description,
        price,
        imageLink
    })
    
    const isCourseExist = await Course.findOne({
        title : course.title
    });

    if(isCourseExist){
        res.status(403).json({
            message : "Course Title already exists"
        })
        return;
    }
    course.save();
    res.json({
        message : "Course created successfully"
    })
    
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    courses = await Course.find();
    res.json(courses);
});

module.exports = router