import express from "express";
import ejs from "ejs";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://riddles-api.vercel.app/random"

app.use(express.static("public")) //to make static files work

//get the main page
app.get("/", (req, res) => {
    res.render("index.ejs")
});

//post the riddles page using axios
app.post("/random", async (req, res) => {
    try {
        const result = await axios.get(API_URL);
        res.render("riddles.ejs", {
            riddles: result.data.riddle
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

//while the page reloads it will get another riddle in the riddle-API
app.get("/random", async (req, res) => {
    try {
        const result = await axios.get(API_URL);
        res.render("riddles.ejs", {
            riddles: result.data.riddle
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

//with the use of the back button it will redirect back to the main page
app.get("/random", (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})