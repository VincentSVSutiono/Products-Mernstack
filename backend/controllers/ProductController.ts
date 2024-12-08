import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const response = await prisma.product.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const response = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name: name,
        price: price,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body;
  try {
    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: name,
        price: price,
      },
    });
    res.status(200).json("Product updated successfully");
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body;
  try {
    const product = await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json("Product deleted successfully");
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
