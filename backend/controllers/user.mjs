import bcrypt from "bcrypt";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import User from "../models/user.mjs";
import registerValidation from "../utils/validation/register.mjs";
import loginValidation from "../utils/validation/login.mjs";
import { JWT_SECRET_KEY } from "../config/index.mjs";

// Register user
export const registerUser = async (req, res) => {
  try {
    const { errors, isValid } = registerValidation(req.body);

    if (isValid > 0) {
      return res.status(400).json(errors);
    }

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      errors.email = "User already exists!";
      return res.status(400).json(errors);
    }

    const { firstName, lastName, email, password } = req.body;
    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    const userData = { firstName, lastName, email, avatar, password };

    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(password, salt);

    const newUser = await User.create(userData);

    res.status(200).send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { errors, isValid } = loginValidation(req.body);

    if (isValid > 0) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      errors.email = "User not found!";
      return res.status(404).json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.password = "Password is incorrect!";
      return res.status(400).json(errors);
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
      JWT_EXPIRES_IN,
    });
    res.json({ success: true, token: "Bearer " + token });
  } catch (err) {
    res.status(400).send(err);
  }
};
