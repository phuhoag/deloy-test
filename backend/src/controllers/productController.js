import { PER_PAGE } from "../constants/common.js";
import productModel from "../models/productModel.js";
import { createProductValidate } from "../validations/productValidate.js";

export const createProduct = async (req, res) => {
  const { body } = req;

  const { error, value } = createProductValidate(body);

  if (error) {
    return res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }

  const newProduct = await productModel.create(value);

  return res.status(201).json(newProduct);
};

export const getAllProducts = async (req, res) => {
  const { category_id, name, min_price, max_price, page = 1 } = req.query;

  const bodyQuery = {};

  if (category_id) {
    bodyQuery.category_id = category_id;
  }

  if (name) {
    bodyQuery.name = {
      $regex: `.*${name}.*`,
      $options: "i",
    };
  }

  if (min_price && max_price) {
    bodyQuery.price = {
      $lte: Number(max_price),
      $gte: Number(min_price),
    };
  }

  const getAllProducts = await productModel
    .find(bodyQuery)
    .populate("category_id")
    .skip(page * PER_PAGE - PER_PAGE)
    .limit(PER_PAGE)
    .exec();

  const count = await productModel.countDocuments(bodyQuery);

  return res.status(200).json({
    current_page: +page,
    total_page: Math.ceil(count / PER_PAGE),
    data: getAllProducts,
  });
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  const getProductById = await productModel.findById(id);

  return res.status(200).json(getProductById);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const { body } = req;

  const updateProduct = await productModel.findByIdAndUpdate(id, body, {
    new: true,
  });

  return res.status(200).json(updateProduct);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deleteProduct = await productModel.findByIdAndDelete(id);

  return res.status(204).json(deleteProduct);
};
