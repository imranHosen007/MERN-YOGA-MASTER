import Classes from "../Models/Classes.model.js";
import Enroll from "../Models/Enrolled.model.js";
import User from "../Models/User.Model.js";

// -----get-Admin-Stats-----

export const getAdminStats = async (req, res) => {
  try {
    const approvedClasses = await Classes.find({
      status: "approved",
    }).countDocuments();
    const pendingClasses = await Classes.find({
      status: "pending",
    }).countDocuments();
    const toalClasses = await Classes.find().countDocuments();
    const instructors = await User.find({
      role: "instructor",
    }).countDocuments();
    const totalEnrolled = await Enroll.find().countDocuments();
    const result = {
      approvedClasses,
      pendingClasses,
      toalClasses,
      instructors,
      totalEnrolled,
    };
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------get-instructors-----
export const getinstructors = async (req, res) => {
  try {
    const result = await User.find({ role: "instructor" });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
