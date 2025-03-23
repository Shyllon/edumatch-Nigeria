const Course = require("../models/course");

//Help to get All Courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//Help to get Course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//Logic to create New Course (Admin Only)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, duration, price } = req.body;

    const course = new Course({
      title,
      description,
      category,
      duration,
      price,
    });

    await course.save();
    res.status(201).json({ message: "Course added successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//Logic to update Course (Admin Only)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Course updated successfully", updatedCourse });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//Logic to delete Course (Admin Only)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
