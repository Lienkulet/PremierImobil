import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req) {
    // Get the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        return new Response(JSON.stringify({ message: "Access denied. No token provided." }), { status: 401 });
    }

    // Extract the token from the Authorization header (Authorization: Bearer <token>)
    const token = authHeader.split(' ')[1]; // This should retrieve the token part

    if (!token) {
        return new Response(JSON.stringify({ message: "Access denied. Token is missing." }), { status: 401 });
    }

    try {
        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token, JWT_SECRET);

        return new Response(JSON.stringify({ message: "Access granted", userId: decoded.userId }), { status: 200 });
    } catch (error) {
        console.error("Token verification failed:", error);
        return new Response(JSON.stringify({ message: "Invalid or expired token" }), { status: 403 });
    }
}
