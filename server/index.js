require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const authenticateToken = require('./middleware/auth');
const { faker } = require('@faker-js/faker');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

//User Table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    firstname TEXT,
    lastname TEXT
  )`, 
  (err) => {
    if(err) {
      console.error('Failed to create users table', err);
    } else {
      console.log('Users table ready');
      seedTestUser();
    }
  });
});

//Seed Test User
const seedTestUser = async () => {
  const testEmail = 'sarabirdy@mail.com';
  const testPassword = 'flyaway5';

  db.get('SELECT * FROM users WHERE email = ?', [testEmail], async(err, row) => {
    if (err) {
      console.error('Error querying users', err);
    } else if (!row) {
      const hashedPassword = await bcrypt.hash(testPassword, 10);
      db.run(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [testEmail, hashedPassword],
        (err) => {
          if(err) {
            console.error('Failed to insert test user', err);
          } else {
            console.log('Test user inserted');
            
          }
        }
      );
    }
  });
};

//Login endpoint
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if(err) {
      console.error('Database error', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if(!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '7d' });

    res.json({ message: 'Login successful', token });
  });
});

//Register endpoint
app.post('/api/users/register', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if(err) {
      console.error('Database error', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (row) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
      if(err) {
        console.error('Failed to insert user', err);
        return res.status(500).json({ message: 'Server error' });
      } else {
        res.json({message: 'Registration successful'});
      }
    });
  });
});

//User Details endpoint
app.get('/api/users/me', authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.get('SELECT id, email FROM users WHERE id = ?', [userId], (err, user) => {
    if(err) {
      console.error('Failed to fetch user details', err);
      res.status(500).json({ message: 'Server error' });
    } else {
      res.json(user);
    }
  });
});

//Create Book Tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT NOT NULL,
    coverimage TEXT NOT NULL,
    available INTEGER NOT NULL DEFAULT 1
  )`,
  (err) => {
    if(err) {
      console.error('Failed to create books table', err);
    } else {
      console.log('Books table ready');
      seedBooks();
    }
  });
});

//seed books data
const seedBooks = () => {
  db.get('SELECT COUNT(*) as count FROM books', (err, row) => {
    if(err) {
      console.error('Error counting books', err);
    } else if (row.count === 0) {
      const stmt = db.prepare('INSERT INTO books (title, author, description, coverimage, available) VALUES (?, ?, ?, ?, ?)');
      for (let i = 0; i < 20; i++) {
        stmt.run(
          faker.lorem.words(3),
          faker.person.fullName(), 
          faker.lorem.paragraph(),
          `https://picsum.photos/200/300`, //placeholder image
          faker.datatype.boolean() ? 1: 0 //available (1 = true, 0 = false)
        );
      }
      stmt.finalize(() => {
        console.log('Books seeded');
      });
    }
  });
};

//Fetch all books endpoint
app.get('/api/books', (req, res) => {
  db.all('SELECT * FROM books', (err, rows) => {
    if (err) {
      console.error('Failed to fetch books', err);
      res.status(500).json({ message: 'Server error' });
    } else {
      res.json({ books: rows });
    }
  });
});

// Fetch book by ID endpoint
app.get('/api/books/:id', (req, res) => {
  const bookId = req.params.id;

  db.get('SELECT * FROM books WHERE id = ?', [bookId], (err, row) => {
    if(err) {
      console.error('Failed to fetch book', err);
      res.status(500).json({ message: 'Server Error' });
    } else if (!row) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.json({ book: row });
    }
  });
});

//Checkout book endpoint
app.patch('/api/books/:id/checkout', authenticateToken, (req, res) => {
  const bookId = req.params.id;
  const userId = req.user.id;

  db.get('SELECT available FROM books WHERE id = ?', [bookId], (err, book) => {
    if(err) {
      console.error('Failed to fetch book', err);
      res.status(500).json({ message: 'Server error' });
    } else if (!book) {
      res.status(404).json({ message: 'Book not found' });
    } else if(book.available === 0) {
      res.status(400).json({ message: 'Book is already checked out' });
    } else {
      db.run('UPDATE books SET available = 0, checkedOutByUserId = ? WHERE id = ?', [userId, bookId], (err) => {
        if(err) {
          console.error('Error updating book', err);
          res.status(500).json({ message: 'Server error' });
        } else {
          res.json({ message: 'Book checked out successfully' });
        }
      });
    }
  });
});

//Checked out books endpoint
app.get('/api/users/:id/checked-out-books', authenticateToken, (req, res) => {
  const userId = req.params.id;

  if(req.user.id !== parseInt(userId)) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  db.all('SELECT * FROM books WHERE checkedOutByUserId = ?', [userId], (err, rows) => {
    if(err) {
      console.error('Failed to fetch checked out books', err);
      res.status(500).json({ message: 'Server error' });
    } else {
      res.json({ books: rows });
    }
  });
});

//Return book endpoint
app.patch('/api/books/:id/return', authenticateToken, (req, res) => {
  const bookId = req.params.id;

db.get('SELECT available FROM books WHERE id = ?', [bookId], (err, book) => {
  if(err) {
    console.error('Failed to fetch book', err);
    res.status(500).json({ message: 'Server error' });
  } else if (!book) { 
    res.status(404).json({ message: 'Book not found' });
  } else if (book.available === 1) {
    res.status(400).json({ message: 'Book is already returned' });
  } else {
    db.run('UPDATE books SET available = 1 WHERE id = ?', [bookId], (err) => {
      if (err) {
        console.error('Error updating book', err);
      } else {
        res.json({ message: 'Book returned successfully' });
      }
    });
  }});
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});