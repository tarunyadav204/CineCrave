import { Inngest } from "inngest";
import User from "../models/User.js";
import 'dotenv/config';


// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking", eventKey: process.env.INNGEST_EVENT_KEY });

// Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        console.log("event", event);
        try {
            const { id, first_name, last_name, email_addresses, image_url } = event.data;
            const userData = {
                _id: id,
                email: email_addresses[0].email_address,
                name: first_name + ' ' + last_name,
                image: image_url
            };
            await User.create(userData);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }
);

// Inngest Function to delete user from database
const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-with-clerk' },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {
        console.log("event", event);
        try {
            const { id } = event.data;
            await User.findByIdAndDelete(id);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }
);

// Inngest Function to update user data in database
const syncUserUpdation = inngest.createFunction(
    { id: 'update-user-from-clerk' },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        try {
            const { id, first_name, last_name, email_addresses, image_url } = event.data;
            const userData = {
                _id: id,
                email: email_addresses[0].email_address,
                name: first_name + ' ' + last_name,
                image: image_url,
            };
            await User.findByIdAndUpdate(id, userData, { new: true });
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }
);

// Export Inngest functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
