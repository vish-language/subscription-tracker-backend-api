import aj from "../../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);
        if(decision.isDenied) {
            if(decision.reason.isRateLimit) {
                res.status(429).json({ message: "Too many requests. Please try again later." });
            }
            if(decision.reason.isBot) {
                res.status(403).json({ message: "Access denied. Bot traffic is not allowed." });
            }
        }
        next();
    } catch (error) {
        console.log(`Arcjet error: ${error}`);
    }
}
export default arcjetMiddleware;