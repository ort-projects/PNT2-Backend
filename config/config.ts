const PORT = Number(process.env.PORT) || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_NAME = process.env.DATABASE_NAME;


export { PORT, NODE_ENV, DATABASE_PASSWORD, DATABASE_USERNAME, DATABASE_NAME };