import express from 'express';
import pkg from 'body-parser';
const { urlencoded, json } = pkg;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // check the username and password and return response
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  // query the database to check if the username exists
  // and the password matches the stored password
  //basic query line put correct db query here!
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
     if (err) {
        // handle error
        console.error(err);
        res.status(500).send('Internal server error');
      } else if (results.length == 0) {
        // no user found with the given username and password
        res.status(401).send('Invalid username or password');
      } else {
        // username and password are correct, send a success response
        res.status(200).json({ message: 'Login successful!' });
      }
    });
  });
});

app.post('/signup', (req, res) => {
  // retrieve the user's input from the request body
  const { username, email, password } = req.body;
  // do any necessary validation and database operations here
  // send a response to the client
  // perform basic validation of user input
  if (!username || !email || !password) {
    res.status(400).json({ message: 'Please fill in all fields.' });
    return;
  }
  
  // check if user already exists in the database (basic query line need to correct)
  db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length > 0) {
      res.status(400).json({ message: 'User already exists' });
       return;
    }
    // insert user into the database (basic query line need to correct)
    //db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (error, results) => {
    if (error) {
      console.log(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
  
      res.status(200).json({ message: 'Sign-up successful!' });

    });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
