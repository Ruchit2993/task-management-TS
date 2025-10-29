import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// Generate a JWT token
const generateToken = (user) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
    }, secret, { expiresIn: "24h" });
};
// Hash password using bcrypt
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};
// Compare plain password with hashed password
const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};
export { generateToken, hashPassword, comparePassword };
