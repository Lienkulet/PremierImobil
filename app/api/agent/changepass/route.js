import bcrypt from 'bcryptjs';
import db from "@/lib/dbconnect";
import { User } from '@/models/User';

export async function PUT(req) {
    await db.connect(); // Connect to the database

    try {
        const { email, oldPassword, newPassword, isAdmin } = await req.json();

        // Find user by email (check in User or User collection)
        const user = await User.findOne({ email }) || await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        // Check if the requester is the admin or the user themselves
        if (!isAdmin) {
            // Validate old password for non-admin users
            const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordCorrect) {
                return new Response(JSON.stringify({ message: "Incorrect old password" }), { status: 400 });
            }
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the password
        user.password = hashedPassword;
        await user.save();

        return new Response(JSON.stringify({ message: "Password updated successfully" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
