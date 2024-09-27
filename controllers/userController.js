import {
  createUser,
  findUserByEmail,
  deleteUser,
  findUserById,
  comparePasswords,
  editUser,
} from "../services/userService.js";
import { generateToken } from "../utils/jwtUtils.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await findUserByEmail(email);

    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !(await comparePasswords(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user;
    const user = await findUserById(userId);

    res.json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await deleteUser(userId);

    res.json({ message: "User profile deleted successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user profile", error: error.message });
  }
};

export const editUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    const { username, email, password } = req.body;

    const currentUser = await findUserById(userId);

    if (email !== currentUser.email) {
      const userExists = await findUserByEmail(email);
      if (userExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    let hashedPassword = currentUser.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const editedUser = await editUser(userId, {
      username,
      email,
      password: hashedPassword,
    });

    res.json(editedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error editing user profile", error: error.message });
  }
};
