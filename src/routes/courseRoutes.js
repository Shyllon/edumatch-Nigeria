const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

// Public Routes (No Authentication Needed)
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Admin Routes (This allows only Admins to Modify Courses)
router.post("/", protect, admin, addCourse);
router.put("/:id", protect, admin, updateCourse);
router.delete("/:id", protect, admin, deleteCourse);

module.exports = router;
