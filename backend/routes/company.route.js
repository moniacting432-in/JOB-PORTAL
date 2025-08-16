import express from "express";
import {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany,
} from "../controllers/company.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// ============================
// Company Routes
// ============================

// Register a new company (logged-in user only)
router.post("/register", isAuthenticated, registerCompany);

// Get all companies created by the logged-in user
router.get("/get", isAuthenticated, getCompany);

// Get a company by ID
router.get("/get/:id", isAuthenticated, getCompanyById);

// Update company (with optional logo upload)
router.put("/update/:id", isAuthenticated, singleUpload, updateCompany);

export default router;
