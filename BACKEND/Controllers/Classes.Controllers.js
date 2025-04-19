import Classes from "../Models/Classes.model";

// ------Create-Class------
export const createClasses = async (req, res) => {
  const newClasses = req.body;

  newClasses.availableSeats = parseInt(newClasses.availableSeats);

  try {
    const result = await Classes.create(newClasses);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------get-All-Aporoved-CLass--------

export const getAllApprovedClasses = async (req, res) => {
  const query = { status: "approved" };
  try {
    const findClasses = await Classes.find(query);
    res.status(200).json(findClasses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// --------GET ALL CLASSES ADDED BY INSTRUCTOR---------

export const getClassesInstructor = async (req, res) => {
  const email = req.params.email;

  const query = { instructorEmail: email };
  try {
    const result = await Classes.find(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// -------Mangae-All-Calsss-----

export const manageAllClasses = async (req, res) => {
  try {
    const result = await Classes.find({});

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ------Update-Stats-----

export const updateStatus = async (req, res) => {
  const { id } = req.params;

  const { status, reason } = req.body;

  const query = { _id: id };
  try {
    const result = await Classes.findByIdAndUpdate(
      query,
      {
        status: status,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ------Get-Single-Class-------

export const singleClasses = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Classes.findOne({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ------Update-All-Information--------

export const updateAllInformation = async (req, res) => {
  const { id } = req.params;
  const updateClasses = req.body;

  const query = { _id: id };
  try {
    const result = await Classes.findByIdAndUpdate(
      query,
      {
        name: updateClasses.name,
        description: updateClasses.description,
        price: updateClasses.price,
        availableSeats: parseInt(updateClasses.availableSeats),
        videoLink: updateClasses.videoLink,
        status: "pending",
        image: updateClasses.image,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
