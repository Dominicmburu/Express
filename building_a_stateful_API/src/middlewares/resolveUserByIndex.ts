import { Request, Response, NextFunction } from "express";

// Define a custom request interface to extend the Request object
export interface CustomRequest extends Request {
  userFoundIndex?: number;  // Index of the found user in the array
  parsedId?: number;        // Parsed user ID
}

// Define the UserData type based on the user data structure
export interface UserData {
  userID: number;
  userName: string;
  displayName: string;
}

// Middleware function to resolve user by index
export const resolveUserByIndex = (userData: Array<UserData>) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    // Parse the ID and check if it's a valid number
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Find the user by the parsed ID
    const userIndex = userData.findIndex((user) => user.userID === parsedId);
    if (userIndex === -1) {
      req.userFoundIndex = undefined;
    } else {
      req.userFoundIndex = userIndex;
      req.parsedId = parsedId;
    }

    next();
  };
};
