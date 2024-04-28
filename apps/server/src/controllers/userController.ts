import Users from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({ email, password: hashedPassword });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) return res.json({ msg: "Incorrect email", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Password", status: false });
    }
    delete user.password;
    const token = jwt.sign({ email: user.email }, "secretkey", {
      expiresIn: "50h",
    });
    res.status(200).json({
      statusCode: 200,
      data: {
        token: token,
        email: user.email,
        userId: user._id,
      },
      message: "Logged In",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
