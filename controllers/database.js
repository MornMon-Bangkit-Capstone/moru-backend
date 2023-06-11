const pool = require('database/index');
// GET all book from google book API
exports.getTitle = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }
    const checkBooksQuery='SELECT ISBN, BookTitle FROM books';
    connection.query(checkBooksQuery, (err, results) => {
      if (err) {
        connection.release();
        return res.status(400).json({
          error: true,
          message: err.message,
        });
      }
      connection.release();
      return res.status(201).json({
        error: false,
        message: results,
      });
    });
  });
};
exports.getRating = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }
    const checkBooksQuery='SELECT * FROM bookRating';
    connection.query(checkBooksQuery, (err, results) => {
      if (err) {
        connection.release();
        return res.status(400).json({
          error: true,
          message: err.message,
        });
      }
      connection.release();
      return res.status(201).json({
        error: false,
        message: results,
      });
    });
  });
};
exports.customQuery = (req, res) => {
  const {query}=req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      return res.status(500).json({message: 'Internal server error.'});
    }
    connection.query(query, (err, results) => {
      if (err) {
        connection.release();
        return res.status(400).json({
          error: true,
          message: err.message,
        });
      }
      connection.release();
      return res.status(201).json({
        error: false,
        message: results,
      });
    });
  });
};
