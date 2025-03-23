const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    category: {
      type: String,
      enum: ["Science", "Arts", "Commerce", "Technology", "General"],
      required: [true, "Course category is required"],
    },
    duration: {
      type: String, // Example: "6 weeks", "3 months"
      required: [true, "Course duration is required"],
    },
    price: {
      type: Number,
      default: 0, // Default to free if no price is given
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
