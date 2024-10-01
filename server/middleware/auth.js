import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        let token = req.headers("Authorization");
        if(!token) return res.status(403).json({message: "Access Denied"});

        const bearer = headers.split(' ');
        const jwtToken = bearer[1];

        const verfied = jwt.verify(jwtToken, process.env.JWT_SECRET);

        req.user = verfied;
        next();

    } catch (error) {
        return res.send(500).json({message: "Server Error"});
    }
}

export default verifyToken;
