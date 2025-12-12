import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY", (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Token Invalid" });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default auth;
