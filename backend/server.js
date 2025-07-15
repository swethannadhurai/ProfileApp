const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// CORS setup for Netlify frontend
app.use(cors({
  origin: 'https://superb-jelly-688fc5.netlify.app',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser()); 


app.use("/api/users", userRoutes);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB Error:", err));

app.get("/", (req, res) => {
  res.send("API is running...!!!");
});

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Server running on port ${port}`));
