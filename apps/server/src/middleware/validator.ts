import { body, ValidationChain } from "express-validator";
import Users from "../models/user";

export const signupValidator: ValidationChain[] = [
  body("email")
    .isEmail()
    .withMessage("Enter a valid email.")
    .custom(async (value) => {
      const existingUser = await Users.findOne({ where: { email: value } });
      if (existingUser) {
        return Promise.reject("Email address already exists.");
      }
    })
    .normalizeEmail(),
  body("password").trim().isLength({ min: 5 }),
];
