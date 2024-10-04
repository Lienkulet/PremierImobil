import db from "@/lib/dbconnect";
import { SpatiiComerciale } from "@/models/SpatiiComerciale";

export async function GET(req, {params: {id}}){
    await db.connect();

    try {
        const add = await SpatiiComerciale.findById(id).populate('agentId');

        return new Response(JSON.stringify(add), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
    }
}

export async function PUT(req, { params: { id } }) {
    await db.connect();

    try {
        // Parse the incoming request body
        const body = await req.json();

        // Find the document by id and update it with the new data
        const updatedAdd = await SpatiiComerciale.findByIdAndUpdate(id, body, {
            new: true, // Return the updated document instead of the old one
            runValidators: true, // Ensure the update follows schema validations
        }).populate('agentId');

        if (!updatedAdd) {
            return new Response(JSON.stringify({ message: 'Property not found' }), { status: 404 });
        }

        // Return the updated document
        return new Response(JSON.stringify(updatedAdd), { status: 200 });
    } catch (error) {
        // Handle any errors that occur
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function DELETE(req, {params: {id}}){
    await db.connect();

    try {
        await SpatiiComerciale.findByIdAndDelete(id);

        return new Response(JSON.stringify("Deleted successfuly"), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
    }
}