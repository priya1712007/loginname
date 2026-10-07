const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// Test route
app.get("/", (req, res) => {
    res.send("Backend is working!");
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });


// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);


// SIGNUP
app.post("/signup", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                message: "Email and password are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        res.json({
            message: "Signup successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// LOGIN
app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                message: "User not found"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (passwordMatch) {

            res.json({
                message: "Login successful"
            });

        } else {

            res.json({
                message: "Wrong password"
            });
        }

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});