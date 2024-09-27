import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Password hashing failed");
  }
};

export const comparePasswords = async (enteredPassword, storedPassword) => {
  try {
    return await bcrypt.compare(enteredPassword, storedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Password comparison failed");
  }
};

export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("User lookup failed");
  }
};

export const findUserById = async (id) => {
  try {
    const user = await User.findById(id);

    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    return null;
  }
};

export const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    return await newUser.save();
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("User creation failed");
  }
};

export const deleteUser = async (id) => {
  try {
    const result = await User.deleteOne({ id });
    if (result.deletedCount === 0) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("User deletion failed");
  }
};

export const editUser = async (id, updatedData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return { message: "User updated successfully", user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("User update failed");
  }
};
