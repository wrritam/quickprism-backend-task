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

export const addItem = async (req: CustomRequest, res: Response) => {
  const { name, description, priceperkg, quantitybykg } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: req.user?.email,
    },
  });

  if (user) {
    if (user.is_verified) {
      const item = await prisma.inventoryItem.create({
        data: {
          name,
          description,
          priceperkg,
          quantitybykg,
          user: {
            connect: {
              email: user.email,
            },
          },
        },
      });

      res.json({ message: "Item added successfully", item });
    } else {
      res.status(403).json({ message: "Please verify your email address" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
