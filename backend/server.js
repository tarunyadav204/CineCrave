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

        app.use("/api/inngest", serve({ client: inngest, functions }));


        app.get("/", (req, res) => {
            res.send("Server is running.........");
        });

        app.get("/body", (req, res) => {
            res.send("Body.....");
        })


        app.get("/test-user", async (req, res) => {
            await inngest.send({
                name: "clerk/user.created",
                data: {
                    id: "test001",
                    first_name: "Tarun",
                    last_name: "Yadav",
                    email_addresses: [{ email_address: "tarun@example.com" }],
                    image_url: "https://example.com/pic.jpg"
                }
            });
            res.send("User test event sent!");
        });


        app.listen(PORT, () => {
            console.log(`Server is running on Port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start the server:", error);
    }
})();
