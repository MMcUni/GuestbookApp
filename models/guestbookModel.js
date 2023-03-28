const nedb = require("nedb");

class GuestBook {
    // Initialize the guest book with an optional file path for the database
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log("DB connected to " + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }

    // Insert sample data into the database
    init() {
        this.db.insert({
            subject: "I liked the exhibition",
            contents: "nice",
            published: "2020-02-16",
            author: "Peter",
        });

        // Debugging message
        console.log("db entry Peter inserted");

        this.db.insert({
            subject: "Didn't like it",
            contents: "A really terrible style!",
            published: "2020-02-18",
            author: "Ann",
        });

        // Debugging message
        console.log("db entry Ann inserted");
    }

    // Function to return all entries from the database
    getAllEntries() {
        // Return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            // Use the find() function of the database to get the data,
            // error first callback function, err for error, entries for data
            this.db.find({}, function (err, entries) {
                // If error occurs, reject the Promise
                if (err) {
                    reject(err);
                    // If no error, resolve the promise and return the data
                } else {
                    resolve(entries);
                    // Debugging message to see what the returned data looks like
                    console.log("function all() returns: ", entries);
                }
            });
        });
    }

    // Function to return Peter's entries from the database
    getPetersEntries() {
        // Return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            // Find author:'Peter' entries in the database,
            // with error first callback function, err for error, entries for data
            this.db.find({ author: "Peter" }, function (err, entries) {
                // If error occurs, reject the Promise
                if (err) {
                    reject(err);
                    // If no error, resolve the promise and return the data
                } else {
                    resolve(entries);
                    // Debugging message to see what the returned data looks like
                    console.log("getPetersEntries() returns: ", entries);
                }
            });
        });
    }

    // Add entry
    addEntry(author, subject, contents) {
        var entry = {
            author: author,
            subject: subject,
            contents: contents,
            published: new Date().toISOString().split("T")[0],
        };
        console.log("entry created", entry);
        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log("Error inserting document", subject);
            } else {
                console.log("document inserted into the database", doc);
            }
        });
    }

    // Get entries by author
    getEntriesByUser(authorName) {
        return new Promise((resolve, reject) => {
            this.db.find({ author: authorName }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log("getEntriesByUser returns: ", entries);
                }
            });
        });
    }
}

// Make the module visible outside
module.exports = GuestBook;
