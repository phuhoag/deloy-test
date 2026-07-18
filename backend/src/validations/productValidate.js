import Joi from "joi";

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.base": "tên sản phẩm phải là kiểu chuỗi",
    "string.empty": "tên sản phẩm không được để trống",
    "string.min": "tên sản phẩm phải bắt đầu từ {#limit} kí tự",
    "string.max": "tên sản phẩm phải nhỏ hơn {#limit} kí tự",
    "any.required": "tên sản phẩm là trường bắt buộc",
  }),

  price: Joi.number().required(),
  image: Joi.string().required(),
  category_id: Joi.string().required(),
});

const createProductValidate = (body) => createProductSchema.validate(body);

export { createProductValidate };
