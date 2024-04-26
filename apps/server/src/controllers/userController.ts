import Users from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const emailCheck = await Users.findOne({ where: { email } });
    if (emailCheck) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({ email, password: hashedPassword });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.json({ msg: "Incorrect email", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
