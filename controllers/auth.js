const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const pool = require('database/index');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
  const {email, password, passwordConfirm} = req.body;
  // Check if username and password are provided
  if (!email || !password || !passwordConfirm) {
    return res.status(401).json({
      error: true,
      message: 'Please fill the required fields',
    });
  }
  if (!password ===passwordConfirm) {
    return res.status(401).json({
      error: true,
      message: 'The password and password confirmation do not match',
    });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(
      password,
      salt);

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }

    // Check if email already exists
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkEmailQuery, [email], (err, results) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }

      if (results.length > 0) {
        return res.status(409).json({
          error: true,
          message: 'Email already exists, login instead',
        });
      }

      // Insert new user record
      const uid= uuidv4();
      // eslint-disable-next-line max-len
      const insertUserQuery = 'INSERT INTO users (id, email, password) VALUES (?, ?, ?)';
      connection.query(insertUserQuery,
          [uid, email, hashedPassword], (err, results) => {
            connection.release();
            if (err) {
              console.error('Error inserting user:', err);
              return res.status(500).json({message: 'Internal server error.'});
            }

            return res.status(201).json({
              error: false,
              message: 'User Created',
            });
          });
    });
  });
};
exports.login= (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: 'Please Provide an email and password',
    });
  }

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }

    // Find the user by email and password
    // eslint-disable-next-line max-len
    const findUserQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(findUserQuery, [email], async (err, results) => {
      connection.release();
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }

      if (!results ||
        !await bcrypt.compare(password, results[0].password)) {
        return res.status(409).json({
          error: true,
          message: 'Invalid email or password.',
        });
      }

      const id = results[0].id;
      const token = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
      });
      return res.status(201).json({
        error: false,
        message: 'success',
        loginResult: {
          userId: results[0].id,
          name: results[0].username,
          token: token,
        },
      });
    });
  });
};
