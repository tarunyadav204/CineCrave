import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const PORT = 4040;

app.use(clerkMiddleware());
app.use(express.json());
app.use(cors());

(async () => {
    try {
        await connectDB();

        app.get("/", (req, res) => {
            res.send("Server is running.........");
        });

        app.use("/api/inngest", serve({ client: inngest, functions }));

        app.listen(PORT, () => {
            console.log(`Server is running on Port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start the server:", error);
    }
})();
