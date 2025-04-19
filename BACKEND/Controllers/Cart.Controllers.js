import Cart from "../Models/Cart.model.js";
import mongoose from "mongoose";
import Classes from "../Models/Classes.model.js";

// import Classes from "../Models/Classes.model.js";

const ObjectId = mongoose.Types.ObjectId;

// --------Add-To-Cart-------
export const addToCart = async (req, res) => {
  const newCartItem = req.body;

  try {
    const result = await Cart.create(newCartItem);
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// -----Get-All-Cart------

export const getAllCart = async (req, res) => {
  try {
    const result = await Cart.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// -----Get-Cart-Email------

export const getCartEmail = async (req, res) => {
  const { email } = req.params;

  const quary = { userMail: email };
  const projection = { classId: 1 };
  try {
    const carts = await Cart.find(quary);
    const classIds = carts.map((cart) => new ObjectId(cart.classId));
    const quary2 = { _id: { $in: classIds } };
    const reuslt = await Classes.find(quary2);

    res.status(200).json(reuslt);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// -----Get-Cart-Id------
export const getCartId = async (req, res) => {
  const { id } = req.params;
  const { email } = req.query;

  const query = { classId: id, userMail: email };
  try {
    const result = await Cart.findOne(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ---------Delete-Cart-------

export const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  const { email } = req.query;

  const query = { classId: id, userMail: email };

  try {
    const result = await Cart.deleteOne(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
