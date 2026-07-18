
import accountModel from "../models/accountModel.js";
import bcrypt from "bcryptjs";
import { createAccountValidate } from "../validations/accountValidate.js";
import jwt from "jsonwebtoken";
import ErrorResponse from "../helpers/errorResponse.js";

export const register = async (req, res) => {
  const { body } = req;

  const { error, value } = createAccountValidate(body);

  if (error) {
    return res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  }

  const newAccount = await accountModel.create(value);

  return res.status(201).json(newAccount);
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const account = await accountModel.findOne({ username });

  if (!account) {
    throw new ErrorResponse(401, "tài khoản hoặc mật khẫu không đúng");
  }

  if (!bcrypt.compareSync(password, account.password)) {
    throw new ErrorResponse(401, "tài khoản hoặc mật khẫu không đúng");
  }

  const payload = {
    id: account._id,
    username: account.username,
    email: account.email,
    phone: account.phone,
    role: account.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });

  res.status(200).json({
    ...payload,
    jwt: token,
  });
};
