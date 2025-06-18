import { Inngest } from "inngest";
import User from "../models/User.js";

// Create the Inngest client
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Function: Create user in DB when created in Clerk
const syncUserCreation = inngest.createFunction(
    { id: "sync-user-from-clerk" },
    { event: "clerk/user.created" },
    async ({ event, step }) => {
        return step.run("create-user-in-db", async () => {
            try {
                const { id, first_name, last_name, email_addresses, image_url } = event.data;

                const userData = {
                    _id: id,
                    email: email_addresses[0].email_address,
                    name: `${first_name} ${last_name}`,
                    image: image_url
                };

                await User.create(userData);
            } catch (error) {
                console.error("Error creating user:", error);
                throw error;
            }
        });
    }
);

// Function: Delete user from DB when deleted in Clerk
const syncUserDeletion = inngest.createFunction(
    { id: "delete-user-with-clerk" },
    { event: "clerk/user.deleted" },
    async ({ event, step }) => {
        return step.run("delete-user-in-db", async () => {
            try {
                const { id } = event.data;
                await User.findByIdAndDelete(id);
            } catch (error) {
                console.error("Error deleting user:", error);
                throw error;
            }
        });
    }
);

// Function: Update user in DB when updated in Clerk
const syncUserUpdation = inngest.createFunction(
    { id: "update-user-from-clerk" },
    { event: "clerk/user.updated" },
    async ({ event, step }) => {
        return step.run("update-user-in-db", async () => {
            try {
                const { id, first_name, last_name, email_addresses, image_url } = event.data;

                const userData = {
                    email: email_addresses[0].email_address,
                    name: `${first_name} ${last_name}`,
                    image: image_url
                };

                await User.findByIdAndUpdate(id, userData, { new: true });
            } catch (error) {
                console.error("Error updating user:", error);
                throw error;
            }
        });
    }
);

// Export all functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
