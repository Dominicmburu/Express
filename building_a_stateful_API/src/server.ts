import express, { Request, Response } from 'express';
import { getXataClient } from './xata';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const xata = getXataClient();
app.use(express.json());

// Get all products
app.get("/api/v1/products", async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await xata.db.products.getAll(); // Fetch all records from "products" table
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error });
    }
});

// Get a product by ID
app.get("/api/v1/products/:id", async (req: Request, res: Response): Promise<void> => {
    const productID = req.params.id;
    try {
        const product = await xata.db.products.read(productID); // Fetch product by ID
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json(product);
        }
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error });
    }
});

// Create a new product
app.post("/api/v1/products", async (req: Request, res: Response): Promise<void> => {
    const { name, description, price, stock } = req.body; // Ensure these match your table columns
    try {
        await xata.db.products.create({
            name,
            description,
            price,
            stock
        }); // Insert new product
        res.status(201).json({ message: "Product created successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error });
    }
});

// Update a product by ID
app.put("/api/v1/products/:id", async (req: Request, res: Response): Promise<void> => {
    const productID = req.params.id;
    const { name, description, price, stock } = req.body; // Ensure these match your table columns
    try {
        const updatedProduct = await xata.db.products.update(productID, {
            name,
            description,
            price,
            stock
        }); // Update product

        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json({ message: "Product updated successfully" });
        }
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error });
    }
});

// Delete a product by ID
app.delete("/api/v1/products/:id", async (req: Request, res: Response): Promise<void> => {
    const productID = req.params.id;
    try {
        const deletedProduct = await xata.db.products.delete(productID); // Delete product

        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json({ message: "Product deleted successfully" });
        }
    } catch (error: any) {
        res.status(500).json({ message: "An error occurred", error });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
