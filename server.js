require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

console.log("API Key:", process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/ask-ai", async (req, res) => {

    try {

        const question = req.body.question;

        const response = await ai.models.generateContent({

            model: "gemini-3.1-flash-lite",

            contents: question

        });

        res.json({
            answer: response.text
        });

    }

    catch (error) {
        console.error(error);
        console.error(error.status);
        console.error(error.message);
        console.error(error.error);

        res.status(500).json(error);
    }

});

const fs = require("fs");

app.get("/api/careers", (req, res) => {
    try {
        const filePath = path.join(__dirname, "data", "careers.json");
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf8");
            res.json(JSON.parse(data));
        } else {
            res.status(404).json({ error: "careers.json database not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {

    console.log("🚀 Server Running on http://localhost:3000");

});