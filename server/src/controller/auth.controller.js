const { registerNewUser } = require("../model/user.model");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const login = (req, res) => {
  if (
    req.body.email === "ayushtyagi@gmail.com" &&
    req.body.password === "123456"
  ) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
};

const signup = async (req, res) => {
  try {
    const { fullname, company, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await registerNewUser({
      fullname,
      company,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    res.status(201).json({
      success: true,
      message: "Signup Successful",
      token,
      user: {
        userId: user.id,
        fullname: user.fullname,
        company: user.company,
        email: user.email,
        isActive: user.is_active,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }
    console.error("Error during signup:", error.code, error.message);
    res
      .status(500)
      .json({ success: false, message: "An error occurred during signup" });
  }
};

module.exports = {
  login,
  signup,
};
