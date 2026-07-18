
import jwt from "jsonwebtoken";
import accountModel from "../models/accountModel.js";
import ErrorResponse from "../helpers/errorResponse.js";
const authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new errorResponse(401, "Access token is required");
  }

  if (!authorization.startsWith("Bearer")) {
    throw new ErrorResponse(401, "token not valid");
  }

  const token = authorization.split(" ")[1];

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const account = await accountModel.findById(decode._id);

  if (!account) {
    throw new ErrorResponse(401, "Unauthorizated");
  }

  req.account = account;

  next();
};

export default authMiddleware;
