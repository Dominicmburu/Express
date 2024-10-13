// src/routes/products.ts
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productsController';
import {
  createProductValidation,
  updateProductValidation,
  getProductValidation,
  deleteProductValidation,
} from '../validations/productValidations';

const router = Router();

router.get('/', getAllProducts);

router.get('/:id', getProductValidation, getProductById);

router.post('/', createProductValidation, createProduct);

router.put('/:id', updateProductValidation, updateProduct);

router.delete('/:id', deleteProductValidation, deleteProduct);

export default router;
