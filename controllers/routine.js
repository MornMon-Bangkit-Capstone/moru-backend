const axios = require('axios');
const querystring = require('querystring');
// Define the API endpoint and parameters
const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
const pool = require('database/index');
const {v4: uuidv4} = require('uuid');


// const jwt = require('jsonwebtoken');
exports.exercise = async (req, res) => {
  // Get the page number from the request query parameters
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  // Number of items per page
  const pageSize = limit;
  // Calculate the offset based on the page number
  const offset = (page - 1) * pageSize;
  const uid = req.user.id;


  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }
    const checkExercisesQuery='SELECT * FROM exercises LIMIT ?, ?';
    // eslint-disable-next-line max-len
    const checkPrivateExercisesQuery='SELECT * FROM privateExercises WHERE uid= ?';
    // eslint-disable-next-line max-len
    connection.query(checkExercisesQuery, [offset, pageSize], (err, resultPublic) => {
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
  // eslint-disable-next-line max-len
  const {title, description, visual, duration, location, numberOfPeople, equipment, muscle, category} = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }
    // eslint-disable-next-line max-len
    const insertBookQuery = 'INSERT INTO privateExercises (Sports, Description, Visual, Duration_Mi, Location, Number_of_people, Equipment, Muscle, Category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(insertBookQuery, [
      title,
      description,
      visual,
      duration,
      location,
      numberOfPeople,
      equipment,
      muscle,
      category,
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
  // Get the page number from the request query parameters
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  // Number of items per page
  const pageSize = limit;
  // Calculate the offset based on the page number
  const offset = (page - 1) * pageSize;
  const uid = req.user.id;

  // Get book from private databae and return in with promise
  const checkPrivateBooksQuery='SELECT * FROM privateBooks WHERE uid= ?';
  // Get all book from cloud sql
  const checkBooksQuery='SELECT * FROM books LIMIT ?, ?';

  const getPrivateBook = new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }
      connection.query(checkPrivateBooksQuery, [uid], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  });
  const getBooks = new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }
      connection.query(checkBooksQuery, [offset, pageSize], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  });


  Promise.all([getPrivateBook, getBooks])
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

// Params to search
const params = {
  q: 'subject:fiction', // Example search query (you can modify it as needed)
  maxResults: 40, // Retrieve top 50 books
  orderBy: 'relevance', // Order by relevance score
};
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
