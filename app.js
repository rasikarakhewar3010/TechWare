const express = require('express');
const path = require("path");
const db = require('./db'); // Import the db connection
const session = require('express-session');
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Middleware for views
app.use(express.urlencoded({ extended: true })); // Parse form data

// Static file serving
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/assets/css")));
app.use(express.static(path.join(__dirname, "public/assets/img")));
app.use(express.static(path.join(__dirname, "public/assets/js")));

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Session expires in 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: false // Use 'false' for HTTP
    }
};

app.use(session(sessionOptions));

// Locals
app.use((req, res, next) => {
    res.locals.currentUser = req.session.currentUser || null;
    next();
});



// Routes

// Render the index page (registration/login)
app.get("/index", (req, res) => {
    try {
        res.render("index.ejs");
    } catch (err) {
        console.error("Error rendering index.ejs:", err);
        res.status(500).send("An error occurred");
    }
});



// Render the contact page (serve static HTML file)
app.get("/contact", (req, res) => {
  try {
      // Serve the _con.html.html file from the public folder
      res.sendFile(path.join(__dirname, 'public', '_con.html.html'));
  } catch (err) {
      console.error("Error rendering contact page:", err);
      res.status(500).send("An error occurred");
  }
});

// Handle contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message, userId } = req.body; // Assuming 'userId' is passed from session

  if (!name || !email || !message) {
      return res.status(400).send('All fields are required.');
  }

  // Insert the contact data into the database
  const query = 'INSERT INTO contact (user_id, name, email, message) VALUES (?, ?, ?, ?)';
  db.query(query, [userId, name, email, message], (err, result) => {
      if (err) {
          console.error('Error inserting contact message:', err);
          return res.status(500).send('Failed to submit the contact form.');
      }

      // Redirect or show success message
      res.send('Thank you for your message!');
  });
});



// Register a new user
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    // Insert user into the database
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).send('Registration failed.');
        }

        // Retrieve the newly registered user's information to store in the session
        const getUserQuery = 'SELECT * FROM users WHERE id = ?'; // Assuming 'id' is the primary key
        db.query(getUserQuery, [result.insertId], (err, results) => {
            if (err) {
                console.error('Error retrieving user after registration:', err);
                return res.status(500).send('Registration succeeded, but login failed.');
            }

            // Store the new user in the session
            req.session.currentUser = results[0];

            // Redirect to a protected page or home page
            res.redirect('/index');
        });
    });
});


// Login user
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('All fields are required.');
    }

    // Check if user exists in the database
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).send('Login failed.');
        }

        if (results.length > 0) {
            // Assign the user to the session
            req.session.currentUser = results[0];
            // Redirect to the home page after successful login
            res.redirect('/index');
        } else {
            res.status(401).send('Invalid username or password.');
        }
    });
});


app.get('/logout',(req,res)=>{
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Logout failed.');
        }
        res.redirect('/index');
    });
})

// Start the server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});