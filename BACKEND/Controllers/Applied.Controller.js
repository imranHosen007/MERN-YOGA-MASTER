import Applied from "../Models/Applied.model.js";

// -----Get-Applied-Instructors----

export const getAppliedInstructors = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  const quray = { email: email };
  try {
    const result = await Applied.findOne(quray);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ------Applied-Instructors-------

export const appliedForInstructors = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const reuslt = await Applied.create(data);
    res.status(201).json(reuslt);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
