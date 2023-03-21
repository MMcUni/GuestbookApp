const express = require('express');
const router = express.Router();
const controller = require('../controllers/guestbookControllers.js');

// Route for the landing page
router.get("/", controller.landing_page);

// Route for the list of guest book entries
router.get('/guestbook', controller.entries_list);

// Route for the new entry page
router.get('/new', controller.new_entry);

// Route for the about page
router.get('/about', function(req, res) {
    res.redirect('/about.html');
});

// Route for Peter's entries
router.get('/peter', controller.peters_entries);

// Handle 404 - Not found errors
router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
});

// Handle 500 - Internal Server Error
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});

// Export the router
module.exports = router;
