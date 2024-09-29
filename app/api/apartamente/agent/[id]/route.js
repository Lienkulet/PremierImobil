import db from "@/lib/dbconnect";
import { Add } from "@/models/Imobile";

export async function GET(req, { params: { id } }) {
    await db.connect();

    try {
        const properties = await Add.find({ agentId: id });
        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
