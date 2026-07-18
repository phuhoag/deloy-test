import mongoose from "mongoose";
import typeRole from "../constants/typeRole.js";
import bcrypt from "bcryptjs";
const accountSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [...Object.values(typeRole)],
      default: typeRole.USER,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

accountSchema.set("toJSON", {
  transform: (doc, ret, option) => {
    delete ret.password;
    return ret;
  },
});

accountSchema.pre("save", function (next) {
  const account = this;
  if (!account.isModified("password")) {
    return next();
  }

  account.password = bcrypt.hashSync(account.password, 10);

  next();
});
export default mongoose.model("account", accountSchema);
