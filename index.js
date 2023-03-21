// Import required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./routes/guestbookRoutes");
const mustacheExpress = require("mustache-express");

// Create an Express app
const app = express();

// redirect CSS bootstrap
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

// Set up mustache-express as the view engine
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

// Middleware for serving static files
const public = path.join(__dirname, "public");
app.use(express.static(public));

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));

// Use guestbookRoutes for routing
app.use("/", router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}. Ctrl^c to quit.`);
});

app.get("/", (req, res) => {
    res.render("entries", {
        title: "Guest Book",
        messages: [
            {
                subject: "Good day out",
                contents: "We had a really good time visiting the museum.",
            },
            {
                subject: "Good place to be on a rainy day.",
                contents: "Nice paintings too.",
            },
            {
                subject: "Yummy",
                contents: "Good food :-).",
            },
        ],
    });
});
