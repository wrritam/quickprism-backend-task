import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

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

interface BillItemInput {
  inventoryItemId: number;
  quantity: number;
}

interface CreateBillInput {
  items: BillItemInput[];
}

export const createBill = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { items }: CreateBillInput = req.body;

    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "No items provided for the bill" });
    }

    // Start a Prisma transaction

    const result = await prisma.$transaction(async (prisma) => {
      let totalAmount = new Prisma.Decimal(0);

      // Creating the bill

      const bill = await prisma.bill.create({
        data: {
          totalAmount: totalAmount,
          user: { connect: { email: req.user?.email } },
        },
      });

      // Calculations

      for (const item of items) {
        const inventoryItem = await prisma.inventoryItem.findUnique({
          where: { id: item.inventoryItemId },
        });

        if (!inventoryItem) {
          throw new Error(
            `Inventory item with id ${item.inventoryItemId} not found`
          );
        }

        if (inventoryItem.quantitybykg < item.quantity) {
          throw new Error(
            `Insufficient quantity for item ${inventoryItem.name}`
          );
        }

        const itemPrice = new Prisma.Decimal(
          inventoryItem.priceperkg * item.quantity
        );
        totalAmount = totalAmount.add(itemPrice);

        // Create BillItem

        await prisma.billItem.create({
          data: {
            quantity: item.quantity,
            price: itemPrice,
            bill: { connect: { id: bill.id } },
            inventoryItem: { connect: { id: item.inventoryItemId } },
          },
        });

        // Update inventory

        await prisma.inventoryItem.update({
          where: { id: item.inventoryItemId },
          data: { quantitybykg: inventoryItem.quantitybykg - item.quantity },
        });
      }

      // Update the bill with the final total amount

      const updatedBill = await prisma.bill.update({
        where: { id: bill.id },
        data: { totalAmount: totalAmount },
        include: {
          items: {
            include: {
              inventoryItem: true,
            },
          },
        },
      });

      return updatedBill;
    });

    res
      .status(201)
      .json({ message: "Bill created successfully", bill: result });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};
