import User from "../models/Auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, age, phoneNumber, country, gender } =
      req.body;

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be 6 characters or more",
      });
    }

    const emailLowerCase = email.toLowerCase();

    const existedUser = await User.findOne({ email: emailLowerCase });
    if (existedUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: emailLowerCase,
      password: hashedPassword,
      age,
      phoneNumber,
      country,
      gender,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        phoneNumber: user.phoneNumber,
        country: user.country,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const login = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    return res.status(400).json({
      success: false,
      message: "Email or phone number and password are required",
    });
  }

  const isEmail = emailOrPhone.includes("@");
  const query = isEmail
    ? { email: emailOrPhone.toLowerCase() }
    : { phoneNumber: emailOrPhone };

  const existedUser = await User.findOne(query);
  if (!existedUser) {
    return res.status(404).json({
      success: false,
      message: "User does not exist!",
    });
  }

  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const { _id: id, name: name } = existedUser;
  const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });


  res.status(200).json({
    success: true,
    result: {
      id,
      name,
      email: existedUser.email,
      phoneNumber: existedUser.phoneNumber,
      token,
    },
  });
};
