import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { getXataClient } from '../xata';

const xata = getXataClient();

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await xata.db.products.getAll();
    res.status(200).json(products);
  } catch (error: any) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const productID = req.params.id;
  try {
    const product = await xata.db.products.read(productID);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error: any) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, description, price, stock } = req.body;
  try {
    const product = await xata.db.products.create({
      name,
      description,
      price,
      stock,
    });
    res
      .status(201)
      .json({ message: 'Product created successfully', product });
  } catch (error: any) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const productID = req.params.id;
  const { name, description, price, stock } = req.body;
  try {
    const updatedProduct = await xata.db.products.update(productID, {
      name,
      description,
      price,
      stock,
    });
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json({
        message: 'Product updated successfully',
        updatedProduct,
      });
    }
  } catch (error: any) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const productID = req.params.id;
  try {
    const deletedProduct = await xata.db.products.delete(productID);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json({ message: 'Product deleted successfully' });
    }
  } catch (error: any) {
    next(error);
  }
};
