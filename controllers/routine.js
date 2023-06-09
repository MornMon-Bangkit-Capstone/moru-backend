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
  const key = req.query.key || '';
  // Number of items per page
  const pageSize = limit;
  // Calculate the offset based on the page number
  const offset = (page - 1) * pageSize;
  const uid = req.user.id;

  // eslint-disable-next-line max-len, quotes
  const checkExercisesQuery="(SELECT id, Sports, Description, Visual, Duration_Min, Location, Number_of_people, Equipment, Muscle, Category,'0' AS isPublic FROM privateExercises WHERE Sports LIKE '%"+key+"%' AND uid = ?)UNION(SELECT *,'1' AS isPublic FROM exercises WHERE Sports LIKE '%"+key+"%')LIMIT "+offset+","+pageSize;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }

    // eslint-disable-next-line max-len
    connection.query(checkExercisesQuery, [uid], (err, result) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }
      if (result.length === 0) {
        return res.status(404).json({
          error: true,
          message: 'Exercise not found',
        });
      }
      return res.status(201).json({
        error: false,
        message: 'Exercises fetched successfully',
        list: result,
      });
    });
  });
};

exports.exerciseDetail = async (req, res) => {
  const {id, isPublic} = req.params;
  const location=(isPublic==0)?'privateExercises':'exercises';
  const checkExercisesQuery = 'SELECT * FROM '+location+' WHERE id= ?';
  console.log(isPublic);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }

    connection.query(checkExercisesQuery, [id], (err, results) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }

      if (results.length === 0) {
        return res.status(404).json({
          error: true,
          message: 'Exercise not found',
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
    const insertExerciseQuery = 'INSERT INTO privateExercises (Sports, Description, Visual, Duration_Min, Location, Number_of_people, Equipment, Muscle, Category, uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(insertExerciseQuery, [
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
  const key = req.query.key || '';
  // Number of items per page
  const pageSize = limit;
  // Calculate the offset based on the page number
  const offset = (page - 1) * pageSize;
  const uid = req.user.id;

  // Get book
  // eslint-disable-next-line max-len, quotes
  const checkBooksQuery="(SELECT ISBN, BookTitle, BookAuthor, YearOfPublication, Publisher, ImageURLL, Author, Summary, AvgRating, CountRating, Genres,'0' AS isPublic FROM privateBooks WHERE BookTitle LIKE '%"+key+"%' OR Author LIKE '%"+key+"%' AND uid = ?)UNION(SELECT *,'1' AS isPublic FROM books WHERE BookTitle LIKE '%"+key+"%' OR Author LIKE '%"+key+"%')LIMIT "+offset+","+pageSize;


  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }

    // eslint-disable-next-line max-len
    connection.query(checkBooksQuery, [uid], (err, result) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }
      if (result.length === 0) {
        return res.status(404).json({
          error: true,
          message: 'Book not found',
        });
      }
      return res.status(201).json({
        error: false,
        message: 'Books fetched successfully',
        list: result,
      });
    });
  });
};

// GET book detail
exports.bookDetail = async (req, res) => {
  const {id, isPublic} = req.params;
  const location=(isPublic==0)?'privateBooks':'books';
  const checkBooksQuery = 'SELECT * FROM '+location+' WHERE ISBN= ?';
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }
    connection.query(checkBooksQuery, [id], (err, results) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }

      if (results.length === 0) {
        return res.status(404).json({
          error: true,
          message: 'Books not found',
        });
      }
      return res.status(201).json({
        error: false,
        message: 'Books fetched successfully',
        list: results,
      });
    });
  });
  // eslint-disable-next-line max-len
};
// POST new book. For premium only
exports.bookPost = async (req, res) => {
  const uid = req.user.id;
  const {ISBN,
    BookTitle,
    BookAuthor,
    YearOfPublication,
    Publisher,
    ImageURLL,
    Summary,
    AvgRating,
    CountRating,
    Genres} = req.body;
  const Author='';


  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }
    // eslint-disable-next-line max-len
    const insertBookQuery = 'INSERT INTO privateBooks (ISBN, BookTitle, BookAuthor, YearOfPublication, Publisher, ImageURLL, Author, Summary, AvgRating, CountRating, Genres, uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(insertBookQuery, [
      ISBN,
      BookTitle,
      BookAuthor,
      YearOfPublication,
      Publisher,
      ImageURLL,
      Author,
      Summary,
      AvgRating,
      CountRating,
      Genres,
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
/* const getPrivateBook = new Promise((resolve, reject) => {
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


      // for book detail:
  // const apiUrl = `${baseUrl}/${id}?key=${process.env.API_KEY}`;
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
      */
