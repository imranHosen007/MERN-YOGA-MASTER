import Classes from "../Models/Classes.model.js";
import Delete from "../Models/Delete.model.js";

// -----Create-Delete-Calsses------

export const createDeleteClasses = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const query = { _id: id };
  try {
    const deleteClass = await Classes.deleteOne(query);
    const result = await Delete.create(data);

    res.status(201).json({ deleteClass, result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// --------get-Delete-Class------

export const getDeleteClasses = async (req, res) => {
  try {
    const result = await Delete.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
