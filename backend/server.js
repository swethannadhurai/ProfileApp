const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then((conn) => console.log("MongoDB connected to:", conn.connection.name))
    .catch((err) => console.error("MongoDB Error:", err));




const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`server running on port ${port}`));