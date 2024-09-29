import db from "@/lib/dbconnect";
import { Terenuri } from "@/models/Terenuri";

export async function GET(req, { params: { id } }) {
    await db.connect();

    try {
        const properties = await Terenuri.find({ agentId: id });
        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
