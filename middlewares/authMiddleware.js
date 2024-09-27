import { verifyToken } from "../utils/jwtUtils.js";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token", error: error });
  }
};
