const axios = require('axios');
const querystring = require('querystring');
// Define the API endpoint and parameters
const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
const pool = require('database/index');


// const jwt = require('jsonwebtoken');
exports.exercise = async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }
    const checkExercisesQuery = 'SELECT * FROM exercises';
    connection.query(checkExercisesQuery, (err, results) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }

      if (results.length === 0) {
        return res.status(409).json({
          error: true,
          message: 'No exercises found',
        });
      }
      return res.status(201).json({
        error: false,
        message: 'Exercises fetched successfully',
        list: results,
      });
    });
  });
};
exports.book = async (req, res) => {
  const params = {
    q: 'subject:fiction', // Example search query (you can modify it as needed)
    maxResults: 40, // Retrieve top 50 books
    orderBy: 'relevance', // Order by relevance score
  };
  // eslint-disable-next-line max-len
  const apiUrl = `${baseUrl}?${querystring.stringify(params)}&key=${process.env.API_KEY}`;


  // Make a GET request to the Google Books API
  axios
      .get(apiUrl)
      .then((response) => {
        const books = response.data.items;
        const formattedData = books.map((book) => {
          const {id, volumeInfo} = book;
          const {title, imageLinks, categories, description} = volumeInfo;
          return {
            id,
            title,
            'img_url': imageLinks?.thumbnail || '',
            'type': categories?.join(', ') || '',
            description,
          };
        });

        // Process the book data as needed
        return res.status(201).json({
          error: false,
          message: 'Books fetched successfully',
          list: formattedData,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error: true,
          message: error.message,
        });
      });
};

exports.bookDetail = async (req, res) => {
  const {id} = req.params;
  const apiUrl = `${baseUrl}/${id}?key=${process.env.API_KEY}`;
  // eslint-disable-next-line max-len
  axios
      .get(apiUrl)
      .then((response) => {
        const book = response.data;
        const {id, volumeInfo} = book;
        const {title, imageLinks, categories, description} = volumeInfo;
        const formattedData = {
          id,
          title,
          'img-url': imageLinks?.thumbnail || '',
          'type': categories?.join(', ') || '',
          description,
        };

        // Process the book data as needed
        return res.status(201).json({
          error: false,
          message: 'Book fetched successfully',
          list: formattedData,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error: true,
          message: error.message,
        });
      });
};

exports.exerciseDetail = async (req, res) => {
  const {id} = req.params;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }
    const checkExercisesQuery = 'SELECT * FROM exercises WHERE id= ?';
    connection.query(checkExercisesQuery, [id], (err, results) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }

      if (results.length === 0) {
        return res.status(409).json({
          error: true,
          message: 'No exercises found',
        });
      }
      return res.status(201).json({
        error: false,
        message: 'Exercises fetched successfully',
        list: results,
      });
    });
  });
};
