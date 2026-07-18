import ErrorResponse from "../helpers/errorResponse.js";
const authorization = (role = []) => {
  if (role === "string") {
    role = [role];
  }

  return (req, res, next) => {
    const account = req.account;

    if (!role.includes(account.role)) {
      throw new ErrorResponse(403, "forbiden");
    }

    next();
  };
};

export default authorization;
