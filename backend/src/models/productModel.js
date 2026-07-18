import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    category_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "category",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model("product", productSchema);
