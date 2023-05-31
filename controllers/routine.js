const axios = require('axios');
const querystring = require('querystring');
// Define the API endpoint and parameters
const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
const pool = require('database/index');
const params = {
  q: 'subject:fiction', // Example search query (you can modify it as needed)
  maxResults: 40, // Retrieve top 50 books
  orderBy: 'relevance', // Order by relevance score
};
// const jwt = require('jsonwebtoken');
exports.exercise=async (req, res) => {
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
  // eslint-disable-next-line max-len
  const apiUrl = `${baseUrl}?${querystring.stringify(params)}&key=AIzaSyBEc2ldZxrk9CLz1eD3QP9hOMSNUIj3NCE`;

  // Get a connection from the pool
  // Make a GET request to the Google Books API
  axios
      // eslint-disable-next-line max-len
      .get(apiUrl)
      .then((response) => {
        const books = response.data.items;
        const formattedData = books.map((book) => {
          const {id, volumeInfo} = book;
          const {title, imageLinks, categories, description} = volumeInfo;
          return {
            id,
            title,
            'img-url': imageLinks?.thumbnail || '',
            'type': categories?.join(', ') || '',
            description,
          };
        });

        // Process the book data as needed
        return res.status(201).json({
          error: false,
          message: 'Exercises fetched successfully',
          list: formattedData,
        });
      })
      .catch((error) => {
        console.error('Error fetching books:', error.message);
      });
};

