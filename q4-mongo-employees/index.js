const express = require("express");
const mongoose = require("mongoose");

const Employee = require("./models/Employee");

const app = express();

const PORT = 5000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/employeeDB")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// GET all employees
app.get("/employees", async (req, res) => {
    try {
        const employees = await Employee.find();

        res.status(200).json({
            success: true,
            message: "Employees fetched successfully",
            count: employees.length,
            data: employees
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database error",
            error: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});