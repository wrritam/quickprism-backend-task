import { Request, Response } from "express";
import prisma from "../../db/db.config";

interface CustomRequest extends Request {
  user?: {
    id: number;
    email: string;
    name: string | null;
    password: string;
    is_verified: boolean;
    otp: number | null;
    last_login: string | null;
    created_at: string;
    updated_at: string | null;
  };
}

export const getBillById = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user || !req.user.email) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User information missing" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: req.user.email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bill = await prisma.bill.findUnique({
      where: {
        userEmail: req.user.email,
        id: Number(req.params.id),
      },
    });

    res.json({ message: "Bill fetched successfully", bill });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};
