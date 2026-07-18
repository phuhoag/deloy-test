import JOI from "joi";

const createAccountSchema = JOI.object({
  username: JOI.string()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.base": "tên đăng nhập phải là kiểu chuỗi",
      "string.empty": "tên đăng nhập không được để trống ",
      "string.min": "tên đăng nhập phải bắt đầu từ {#limit} kí tự",
      "string.max": "tên đăng nhập phải nhỏ hơn {#limit} kí tự",
      "any.required": "tên đăng nhập là trường bắt buộc",
    }),
  password: JOI.string().min(3).max(20).required().messages({
    "string.base": "mật khẩu phải là chuỗi",
    "string.empty": "mật khẩu không được để trống",
    "string.min": "mật khẩu phải có ít nhất {#limit} ký tự",
    "string.max": "mật khẩu không được vượt quá {#limit} ký tự",
    "any.required": "mật khẩu là trường bắt buộc",
  }),
  email: JOI.string().email().required().messages({
    "string.base": "email phải là chuỗi",
    "string.empty": "email không được để trống",
    "string.email": "email không đúng định dạng",
    "any.required": "email là trường bắt buộc",
  }),
  phone: JOI.string().min(10).max(12).required(),
});

const createAccountValidate = (body) => createAccountSchema.validate(body);

export { createAccountValidate };
