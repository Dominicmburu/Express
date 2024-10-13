import { body, param } from 'express-validator';

export const createProductValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional().isString(),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a number greater than 0'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
];

export const updateProductValidation = [
  param('id').isString().withMessage('Product ID must be a string'),
  body('name').optional().isString(),
  body('description').optional().isString(),
  body('price').optional().isFloat({ gt: 0 }),
  body('stock').optional().isInt({ min: 0 }),
];

export const getProductValidation = [
  param('id').isString().withMessage('Product ID must be a string'),
];

export const deleteProductValidation = [
  param('id').isString().withMessage('Product ID must be a string'),
];
