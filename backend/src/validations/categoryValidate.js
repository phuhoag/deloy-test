import Joi from "joi";

const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.base": "tên danh mục phải là kiểu chuỗi",
    "string.empty": "tên danh mục không được để trống",
    "string.min": "tên danh mục phải băt đầu từ {#limit} kí tự",
    "string.max": "tên danh mục phải nhỏ hơn {#limit} kí tự",
    "any.required": "tên danh mục là trường bắt buộc",
  }),

  image: Joi.string().required(),
});

const createCategoryValidate = (body) => createCategorySchema.validate(body);

export { createCategoryValidate };
