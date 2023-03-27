// Import required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// Import the GuestBook model
const GuestBook = require("../models/guestbookModel");

// Create a new instance of the GuestBook model
const guestBook = new GuestBook();
guestBook.init();

// Get the list of guest book entries
exports.entries_list = function (req, res) {
    guestBook
        .getAllEntries()
        .then((list) => {
            res.render("entries", {
                title: "Guest Book",
                entries: list,
            });
            console.log("promise resolved");
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

// Show the landing page
exports.landing_page = function (req, res) {
    guestBook
        .getAllEntries()
        .then((list) => {
            res.render("entries", {
                title: "Guest Book",
                entries: list,
            });
            console.log("promise resolved");
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

// Show the new entry page
exports.new_entry = function (req, res) {
    // Placeholder for not implemented feature
    res.send("<h1>Not yet implemented: show a new entry page.</h1>");
};

// Get Peter's guest book entries
exports.peters_entries = function (req, res) {
    // Send a response to inform the user about processing Peter's entries
    res.send("<h1>Processing Peter's Entries, see terminal</h1>");
    guestBook.getPetersEntries();
};
