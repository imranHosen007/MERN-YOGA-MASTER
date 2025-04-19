import Classes from "../Models/Classes.model.js";
import Enroll from "../Models/Enrolled.model.js";
import User from "../Models/User.Model.js";

// -------Popular-Enrolled-------

export const popularEnrolled = async (req, res) => {
  try {
    const result = await Classes.find().sort({ totalEnrolled: -1 }).limit(10);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ---------Get-Enrolled-------

export const getEnrolled = async (req, res) => {
  const { email } = req.params;

  const query = { userEmail: email };
  try {
    const result = await Enroll.find(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ------Populrar----Instructor-------

export const popularInstructors = async (req, res) => {
  try {
    const reuslt = await Classes.aggregate([
      {
        $group: {
          _id: "$instructorEmail",
          totalEnrolled: { $sum: "$totalEnrolled" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "email",
          as: "instructor",
        },
      },
      {
        $match: {
          "instructor.role": "instructor",
        },
      },
      {
        $project: {
          _id: 0,
          instructor: {
            $arrayElemAt: ["$instructor", 0],
          },
          totalEnrolled: 1,
        },
      },
      {
        $sort: {
          totalEnrolled: -1,
        },
      },
      {
        $limit: 6,
      },
    ]);
    res.json(reuslt).status(200);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ------Enroll-Calsses------

export const enrolledClsses = async (req, res) => {
  const { email } = req.params;

  const query = { userEmail: email };

  try {
    const result = await Enroll.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "classes",
          localField: "classesId",
          foreignField: "_id",
          as: "classes",
        },
      },
      {
        $unwind: "$classes",
      },
      {
        $lookup: {
          from: "users",
          localField: "classes.instructorEmail",
          foreignField: "email",
          as: "instructor",
        },
      },
      {
        $project: {
          _id: 0,
          classes: 1,
          instructor: {
            $arrayElemAt: ["$instructor", 0],
          },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
