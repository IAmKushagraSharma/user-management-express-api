import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "6b757368";

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
