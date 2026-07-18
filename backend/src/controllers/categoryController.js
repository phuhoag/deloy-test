import categoryModel from "../models/categoryModel.js";
import { createCategoryValidate } from "../validations/categoryValidate.js";
export const createCategory = async (req, res) => {
  const { body } = req;

  const { error, value } = createCategoryValidate(body);

  if (error) {
    return res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }

  const newCategory = await categoryModel.create(value);

  return res.status(201).json(newCategory);
};

export const getAllCategories = async (req, res) => {
  const getAllCategories = await categoryModel.find();

  return res.status(200).json(getAllCategories);
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const getCategoryById = await categoryModel.findById(id);

  return res.status(200).json(getCategoryById);
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;

  const { body } = req;

  const updateCategory = await categoryModel.findByIdAndUpdate(id, body, {
    new: true,
  });

  return res.status(200).json(updateCategory);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const deleteCategory = await categoryModel.findByIdAndDelete(id);

  return res.status(204).json(deleteCategory);
};
