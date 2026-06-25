import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

export const registerUser = async (req, res) => {
  console.log("Register API Hit");
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

   res.status(201).json({
  message: "User registered successfully",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("User found:", user);
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "Login successful",

      token: generateToken(user._id),
    
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const resetToken = crypto
      .randomBytes(20)
      .toString("hex");

    user.resetPasswordToken = resetToken;

    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message: `
        <h2>Password Reset Request</h2>
        <p>Click the link below:</p>
        <a href="${resetUrl}">
          Reset Password
        </a>
      `,
    });

    res.status(200).json({
      message: "Reset email sent",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};