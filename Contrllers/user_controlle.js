const User = require("../models/Users_model");
const Course = require("../models/Couser_model");

const bcrypt = require("bcryptjs");

const deleteUploadedFile = require("../utils/delete-uploaded-file");

const addCourseToUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    if (user.role !== "student") {
      return res.status(403).json({
        status: "fail",
        message: "Only students can enroll in courses",
      });
    }

    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        status: "fail",
        message: "Course not found",
      });
    }

    const alreadyEnrolled = user.myCourses.some(
      (id) => id.toString() === courseId
    );

    if (alreadyEnrolled) {
      return res.status(400).json({
        status: "fail",
        message: "Course already added",
      });
    }

    user.myCourses.push(course._id);

    course.students += 1;

    await user.save();
    await course.save();

    res.status(200).json({
      status: "success",
      message: "Course added successfully",
      data: {
        myCourses: user.myCourses,
      },
    });

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// 
const getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("myCourses");

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      results: user.myCourses.length,
      data: {
        myCourses: user.myCourses,
      },
    });

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};


const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

   
    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }

    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }

    if (req.body.phone) {
      user.phone = req.body.phone;
    }

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        user,
      },
    });

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};


//Change Password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Current password and new password are required",
      });
    }

    
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

  
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Current password is incorrect",
      });
    }

  
    user.password = newPassword;

   
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      if (req.file) {
        deleteUploadedFile("users", req.file.filename);
      }

      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        message: "Please upload an image",
      });
    }

   
    if (user.image && user.image !== "default-user.webp") {
      deleteUploadedFile("users", user.image);
    }

    user.image = req.file.filename;

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Profile image updated successfully",
      data: {
        user,
      }
    });

  } catch (error) {

    if (req.file) {
      deleteUploadedFile("users", req.file.filename);
    }

    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
module.exports = {
  addCourseToUser,
  getMyCourses,
  getProfile,
  updateProfile,
  changePassword,
  updateProfileImage,
};