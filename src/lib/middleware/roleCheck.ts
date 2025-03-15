// lib/middleware/roleCheck.ts

import { NextApiRequest, NextApiResponse } from "next";

declare module "next" {
  interface NextApiRequest {
    user?: DecodedToken;
  }
}
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Ensure you use a strong secret in production

interface DecodedToken {
  userId: string;
  role: string;
}

export function roleCheck(requiredRole: string) {
  return async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    try {
      // Extract the token from the Authorization header
      const authHeader = req.headers["authorization"];
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Authorization token is required" });
      }

      const token = authHeader.split(" ")[1];

      // Verify and decode the token
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

      // Check if the user's role matches the required role
      if (decoded.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Forbidden: You do not have the required role" });
      }

      // Attach user info to the request object
      req.user = decoded;

      // Continue to the next middleware or route handler
      return next();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error verifying token", error: (error as Error).message });
    }
  };
}
