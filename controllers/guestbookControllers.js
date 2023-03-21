const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');

const GuestBook = require('../models/guestbookModel');
const guestBook = new GuestBook();
guestBook.init();

exports.entries_list = function(req, res) {
    res.send('<h1>Not yet implemented: show a list of guest book entries.</h1>');
    guestBook.getAllEntries();
}

exports.landing_page = function(req, res) {
    res.render("entries", {
      'title': 'Guest Book'
    });
};

exports.new_entry = function(req, res) {
    res.send('<h1>Not yet implemented: show a new entry page.</h1>');
}

exports.peters_entries = function(req, res) {
    res.send('<h1>Processing Peter\'s Entries, see terminal</h1>');
    guestBook.getPetersEntries();
}
