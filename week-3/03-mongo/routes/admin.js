const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin,Course} = require("../db/index.js");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    
    const admin = new Admin({
        username : username,
        password : password
    })  

    admin.save();

    res.json({
        message : "Admin Created Successfully"
    })


});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const course = new Course({
        title : title,
        description : description,
        price : price,
        imageLink : imageLink
    });
    course.save();

    res.json({
        message : "Course Added Successfully"
    });

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    res.json(allCourses);
    
}); 

module.exports = router;