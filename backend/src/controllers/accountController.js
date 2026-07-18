import accountModel from "../models/accountModel.js";
import { createAccountValidate } from "../validations/accountValidate.js";

export const createAccount = async (req, res) => {
  const { body } = req;

  const { error, value } = createAccountValidate(body);

  if (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }

  const newAccount = await accountModel.create(value);
  return res.status(201).json(newAccount);
};

export const getAccounts = async (req, res) => {
  const getAccounts = await accountModel.find();

  return res.status(200).json(getAccounts);
};

export const getAccountById = async (req, res) => {
  const { id } = req.params;

  const getAccountById = await accountModel.findById(id);

  return res.status(200).json(getAccountById);
};

export const updateAccount = async (req, res) => {
  const { id } = req.params;

  const { body } = req;

  const updateAccount = await accountModel.findByIdAndUpdate(id, body, {
    new: true,
  });

  return res.status(200).json(updateAccount);
};

export const deleteAccount = async (req, res) => {
  const { id } = req;

  const deleteAccount = await accountModel.findByIdAndDelete(id);

  return res.status(204).json(deleteAccount);
};
