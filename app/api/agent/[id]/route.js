import db from "@/lib/dbconnect";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function DELETE(req, { params: { id } }) {
  await db.connect();

  try {
    await User.findByIdAndDelete(id);
    return new Response(JSON.stringify("Deleted successfully"), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function GET(req, { params: { id } }) {
  await db.connect();

  try {
    const agent = await User.findById(id);
    return new Response(JSON.stringify(agent), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function PUT(req, { params: { id } }) {
  await db.connect();

  try {
    const body = await req.json();
    const { name, email, password, type, phoneNr, photoUrl } = body;

    let updatedFields = { name, email, type, phoneNr, photoUrl };

    // If password is provided, hash it before saving
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    // Update the agent with new data
    const updatedAgent = await User.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true } // Return the updated document
    );

    if (!updatedAgent) {
      return new Response(JSON.stringify("Agent not found"), { status: 404 });
    }

    return new Response(JSON.stringify(updatedAgent), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
