import db from "@/lib/dbconnect";
import { Case } from "@/models/Case";

export async function GET(req, {params: {id}}){
    await db.connect();

    try {
        const newCase = await Case.findById(id);

        return new Response(JSON.stringify(newCase), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
    }
}

export async function PUT(req, {params: {id}}){
    await db.connect();

    try {
        const body = await req.json();

        const newCase = await Case.findByIdAndUpdate(id);

        return new Response(JSON.stringify(newCase), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
    }
}

export async function DELETE(req, {params: {id}}){
    await db.connect();

    try {
        await Case.findByIdAndDelete(id);

        return new Response(JSON.stringify("Deleted successfuly"), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500});
    }
}