const axios = require('axios');
const querystring = require('querystring');
// Define the API endpoint and parameters
const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
const pool = require('database/index');
const {v4: uuidv4} = require('uuid');


// const jwt = require('jsonwebtoken');
exports.exercise = async (req, res) => {
  const uid = req.user.id;


  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }
    const checkExercisesQuery='SELECT * FROM exercises';
    // eslint-disable-next-line max-len
    const checkPrivateExercisesQuery='SELECT * FROM privateExercises WHERE uid= ?';
    connection.query(checkExercisesQuery, (err, resultPublic) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }
      // console.log(results);
      // eslint-disable-next-line max-len
      connection.query(checkPrivateExercisesQuery, [uid], (err, resultPrivate) => {
        if (err) {
          connection.release();
          console.error('Error querying database:', err);
          return res.status(500).json({message: 'Internal server error.'});
        }
        const resultList=[...resultPrivate, ...resultPublic];
        console.log(resultList);
        if (resultList.length === 0) {
          return res.status(404).json({
            error: true,
            message: 'No exercises found',
          });
        }
        return res.status(201).json({
          error: false,
          message: 'Exercises fetched successfully',
          list: resultList,
        });
      });
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

// POST new exercise. For premium only
exports.exercisePost = async (req, res) => {
  const uid = req.user.id;
  const {title, imgUrl, type, description} = req.body;
  const id = 'exercise-' + uuidv4();
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }
    // eslint-disable-next-line max-len
    const insertBookQuery = 'INSERT INTO privateExercises (id, title, img_url,  type, description, uid) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(insertBookQuery, [
      id,
      title,
      imgUrl,
      type,
      description,
      uid,
    ], (err, results) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }
      return res.status(201).json({
        error: false,
        message: 'Exercise added successfully',
      });
    });
  });
};

// GET all book from google book API
exports.book = async (req, res) => {
  const uid = req.user.id;
  const params = {
    q: 'subject:fiction', // Example search query (you can modify it as needed)
    maxResults: 40, // Retrieve top 50 books
    orderBy: 'relevance', // Order by relevance score
  };
  // Get book from private databae and return in with promise
  const checkBooksQuery='SELECT * FROM privateBooks WHERE uid= ?';

  const fetchPrivateBook = new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }
      connection.query(checkBooksQuery, [uid], (err, results) => {
        if (err) {
          console.error('Error executing query for Table 1:', err);
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  });
  // Get book from Google Book API
  // eslint-disable-next-line max-len
  const apiUrl = `${baseUrl}?${querystring.stringify(params)}&key=${process.env.API_KEY}`;

  // Make a GET request to the Google Books API
  const fetchGoogleAPIBooks= new Promise((resolve, reject)=>{
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
          resolve(formattedData);
        })
        .catch((error) => {
          reject(error);
        });
  });
  Promise.all([fetchPrivateBook, fetchGoogleAPIBooks])
      .then(([privateBooks, publicBooks]) => {
      // Combine private and public books
        const combinedData = [...privateBooks, ...publicBooks];

        return res.status(201).json({
          error: false,
          message: 'Books fetched successfully',
          list: combinedData,
        });// Send the combined data in the response
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        return res.status(500).json({
          error: true,
          message: error.message,
        });
      });
};
/*
        // Process the book data as needed


*/

// GET book detail
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
// POST new book. For premium only
exports.bookPost = async (req, res) => {
  const uid = req.user.id;
  const {title, imgUrl, pdfUrl, type, description} = req.body;
  const id = 'book-' + uuidv4();

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }
    // eslint-disable-next-line max-len
    const insertBookQuery = 'INSERT INTO privateBooks (id, title, img_url, pdf_url, type, description, uid) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(insertBookQuery, [
      id,
      title,
      imgUrl,
      pdfUrl,
      type,
      description,
      uid,
    ], (err, results) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }
      return res.status(201).json({
        error: false,
        message: 'Book added successfully',
      });
    });
  });
};


