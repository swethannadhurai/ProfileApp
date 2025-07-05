const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(cors({
    origin:'https://superb-jelly-688fc5.netlify.app',
    credentials:true,
}));
app.use(express.json());

app.use("/api/users", userRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB Error:", err));


app.get("/", (req, res) =>{
    res.send("Api is running...!!!");
})

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`server running on port ${port}`));