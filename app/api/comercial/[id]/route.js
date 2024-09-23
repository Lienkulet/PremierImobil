import db from "@/lib/dbconnect";
import { SpatiiComerciale } from "@/models/SpatiiComerciale";

export async function GET(req, {params: {id}}){
    await db.connect();

    try {
        const add = await SpatiiComerciale.findById(id);

        return new Response(JSON.stringify(add), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
    }
}

export async function PUT(req, {params: {id}}){
    await db.connect();

    try {
        const body = await req.json();

        const add = await SpatiiComerciale.findByIdAndUpdate(id);

        return new Response(JSON.stringify(add), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
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