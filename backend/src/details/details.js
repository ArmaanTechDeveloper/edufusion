const express = require('express');
const { User } = require('../db/user.model')

const detailsRouter = express.Router();

detailsRouter.post('/', async (req, res) => {
    try {
        const { name, college, city, state, github, linkedin } = req.body;

        // Find and update the user or create a new one
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user.id }, // Find the user by ID
            {
                $set: {
                    name: name,
                    college: college,
                    city: city,
                    state: state,
                    github: github,
                    linkedin: linkedin
                }
            },
            { new: true, upsert: true } // Return the updated document and create if it doesn't exist
        );

        // Respond with success status
        res.status(200).json({ message: "User details updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = detailsRouter