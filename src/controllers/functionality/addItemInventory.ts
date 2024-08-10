import express, { Request } from "express";
import prisma from "../../db/db.config";
import { Decimal } from "@prisma/client/runtime/library";

// user add items in the inventory

interface CustomRequest extends express.Request {
  user: {
    email: string;
  };
}

export const addItem = async (req: CustomRequest, res: express.Response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.user.email,
    },
  });
  if (user) {
    const { itemName, description, quantity, price } = req.body;
    const newItem = await prisma.inventoryItem.create({
      data: {
        name: itemName,
        description: description,
        quantity: quantity,
        price: new Decimal(price),
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    res.json({ message: "Item added", newItem });
  } else {
    res.json({ message: "User not found" });
  }
};
