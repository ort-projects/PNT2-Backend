const PORT = Number(process.env.PORT) || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const DATABASE_URL = process.env.DATABASE_URL || "file:./dev.db";


export { PORT, NODE_ENV, DATABASE_URL };
