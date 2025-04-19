import User from "../Models/User.Model.js";

// -------Create-User------

export const createUser = async (req, res) => {
  const user = req.body;

  try {
    const exitsingEmail = await User.findOne({ email: user.email });

    if (exitsingEmail) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const newUser = await User.create(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --------Get-All-User-------
export const getAllUser = async (req, res) => {
  try {
    const findUser = await User.find({});
    res.status(200).json(findUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// -------get-User-Id-------

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const qurry = { _id: id };

  try {
    const result = await User.findOne(qurry);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// -----Get-User-Email-------

export const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  const qurry = { email: email };
  try {
    const result = await User.findOne(qurry);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ------User-Delete------

export const userDelete = async (req, res) => {
  const { id } = req.params;
  const quary = { _id: id };
  try {
    const result = await User.findByIdAndDelete(quary);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// -----Update-User-------

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const qurry = { _id: id };
  try {
    const result = await User.findOneAndUpdate(
      qurry,
      {
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        address: updatedUser.address,
        phone: updatedUser.phone,
        about: updatedUser.about,
        photoUrl: updatedUser.photoUrl,
        skills: updatedUser.skills ? updatedUser.skills : null,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ------get-Instructors-------

export const getInstructors = async (req, res) => {
  try {
    const query = { role: "instructor" };
    const result = await User.find(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// -----Update-User-Role------

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { option } = req.body;

  const qurry = { _id: id };
  try {
    const result = await User.findOneAndUpdate(
      qurry,
      { role: option },
      { new: true, runValidators: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
