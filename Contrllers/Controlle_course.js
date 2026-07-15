const Course=require("../models/Couser_model");
const Category = require("../models/Category_model");
const deleteUploadedFile = require("../utils/delete-uploaded-file");


function queriesIntoMongoDBOperators(query) {
  const mongoQuery = {};

  for (const key in query) {
    const value = query[key];

    const match = key.match(/^(.+)\[(gte|gt|lte|lt)\]$/);

    if (match) {
      const field = match[1];
      const operator = `$${match[2]}`;

      if (!mongoQuery[field]) {
        mongoQuery[field] = {};
      }

      mongoQuery[field][operator] = Number(value);
    } else {

  if (key === "category") {
    mongoQuery[key] = value;
  } else {
    mongoQuery[key] = {
      $regex: value,
      $options: "i",
    };
  }

}
  }

  return mongoQuery;
}



const getAllCourses = async (req, res) => {
  try {

  
    const queryObj = { ...req.query };


    const excludedFields = ["sort", "page", "limit"];
    excludedFields.forEach((field) => delete queryObj[field]);


    const mongoQuery = queriesIntoMongoDBOperators(queryObj);


    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const courses = await Course.find(mongoQuery)
      .populate("category")
      .sort(req.query.sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "success",
      count: courses.length,
      data: {
        courses,
      },
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Failed to fetch course:${error.message}`,
    });
  }
};

const getCourseById=async(req,res)=>{
    try{
      const course = await Course.findById(req.params.id).populate("category");

      if(!course){
        return res.status(404).json({
            status:"fail",
            message:"Course not found",
        });

      }
      res.status(200).json({
        status:"success",
        data:{
            course,
        },
      });

    }catch(error){
        res.status(500).json({
            status:"error",
           message:`Failed to fetch course: ${error.message}`
        });
    }
};

//createCourse
const createCourse = async (req, res) => {
  try {

if (!req.body.category) {
  return res.status(400).json({
    status: "fail",
    message: "Category is required",
  });
}

const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    const level = req.body.level?.toLowerCase();

    const newCourse = await Course.create({
      ...req.body,
      level,
      image: req.file?.filename,
    });

    res.status(201).json({
      status: "success",
      message: "Course added successfully",
      data: {
        course: newCourse,
      },
    });

  } catch (error) {

    if (req.file) {
      deleteUploadedFile("courses", req.file.filename);
    }

    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};


//updateCourse
const updateCourse = async (req, res) => {
  try {
const course = await Course.findById(req.params.id).populate("category");
    if (!course) {
      return res.status(404).json({
        status: "fail",
        message: "Course not found",
      });
    }

   if (req.body.category) {

  const category = await Category.findById(req.body.category);

  if (!category) {
    return res.status(404).json({
      status: "fail",
      message: "Category not found",
    });
  }

}
    if (req.body.level) {
      req.body.level = req.body.level.toLowerCase();
    }

   
    if (req.file) {
      req.body.image = req.file.filename;

    
      if (course.image) {
        deleteUploadedFile("courses", course.image);
      }
    }

    Object.assign(course, req.body);

    const updatedCourse = await course.save();

    res.status(200).json({
      status: "success",
      message: "Course updated successfully",
      data: {
        course: updatedCourse,
      },
    });
  } catch (error) {

    if (req.file) {
      deleteUploadedFile("courses", req.file.filename);
    }

    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

//Delete course
const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({
        status: "fail",
        message: "Course not found",
      });
    }

     if (deletedCourse.image) {
      deleteUploadedFile("courses", deletedCourse.image);
    }

    res.status(200).json({
      status: "success",
      message: "Course deleted successfully",
      data: {
        course: deletedCourse,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};


module.exports = {
  getAllCourses ,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};