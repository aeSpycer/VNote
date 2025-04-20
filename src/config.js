export const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173/";
export const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://aeSpycer:4wVkOLUeB6iJAt2L@aespycer.arh2hrw.mongodb.net/VNote?retryWrites=true&w=majority&appName=aeSpycer";

export const PORT = process.env.PORT || 5000;

const TOKEN_SECRET = "super secret key";

export { TOKEN_SECRET };
