import express from "express";
import { register } from "../controllers/authentication/register";
import { login } from "../controllers/authentication/login";
import { verifyRegistration } from "../controllers/authentication/verify-registration";
import { forgotPassword } from "../controllers/authentication/forgot-password";
import { resetPassword } from "../controllers/authentication/reset-password";
import { verifyUpdation } from "../controllers/authentication/verify-updatation";

import { authentication } from "../middleware/authenticator";

import { addItem } from "../controllers/functionality/addItemInventory";
import { getAllItems } from "../controllers/functionality/getAllItems";
import { createBill } from "../controllers/functionality/billing";
import { getAlltheBills } from "../controllers/functionality/getAllTheBills";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-registration", verifyRegistration);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/verify-updation", verifyUpdation);

router.post("/add-item", authentication, addItem);
router.get("/get-all-items", authentication, getAllItems);
router.post("/create-bill", authentication, createBill);
router.get("/get-all-bills", authentication, getAlltheBills);

export default router;
