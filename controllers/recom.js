const axios = require('axios');
const querystring = require('querystring');
// Define the API endpoint and parameters
const baseUrl = 'https://moru-ml-api-inq7f5uz7q-et.a.run.app/api/v1';
const pool = require('database/index');

exports.exerciseRecom = (req, res) => {
  const uid = req.user.id;
  const exercisePool=[];
  Promise.all([
    // `SELECT ${select} FROM ${tableName} WHERE ${col} = ? ${extra}`
    getDb('favExercise', 'users', 'id', uid, ''),
    getDb('*', 'schedule', 'uid', uid, `AND type = 'EXERCISE' ORDER BY id DESC LIMIT 1`),
  ])
      .then(([
        getUserDataResult,
        checkExerciseHistoryResult,
      ]) => {
        // Get a list of recommended titles
        if (getUserDataResult.length!=0) {
          exercisePool.push(() =>
            getSports(getUserDataResult[0].favExercise),
          );
        }
        if (checkExerciseHistoryResult.length!=0) {
          exercisePool.push(() =>
            getSports(checkExerciseHistoryResult[0].name),
          );
        }

        const randomIndex = getRandomIndex(exercisePool);
        const selectedExercise = exercisePool[randomIndex];
        return selectedExercise();
      })
      .then((result)=>{
        // Get exercise from title
        // tableName, columnName, listOfTitle
        return getListFromDb('exercises', 'Sports', result);
      })
      .then((result)=>{
        return res.status(201).json({
          error: false,
          message: 'Exercise fetched successfully',
          list: result,
        });
      })
      .catch((err)=>{
        return res.status(500).json({
          error: true,
          message: err.message,
        });
      }).finally(()=>{

        // selectedFunction();
      });
};
exports.bookRecom = (req, res) => {
  const limit=10;
  const uid = req.user.id;
  const bookPool=[];
  Promise.all([
    // `SELECT ${select} FROM ${tableName} WHERE ${col} = ?`
    getDb('favBook', 'users', 'id', uid, ''),
    // eslint-disable-next-line max-len
    getDb('*', 'schedule', 'uid', uid, `AND type= 'BOOK' ORDER BY id DESC LIMIT 1`),
    getDb('*', 'bookRating', 'UserID', uid, ''),
  ])
      .then(([
        getUserDataResult,
        checkBookHistoryResult,
        checkRatingByUser,
      ]) => {
        // Get a list of recommended titles
        if (getUserDataResult.length!=0) {
          bookPool.push(() =>
            getContentBased(getUserDataResult[0].favBook, limit),
          );
        }
        if (checkBookHistoryResult.length!=0) {
          bookPool.push(() =>
            getContentBased(checkBookHistoryResult[0].name, limit),
          );
        }
        if (checkRatingByUser.length!=0) {
          bookPool.push(() =>
            getCollaborativeBased(uid),
          );
        }
        const randomIndex = getRandomIndex(bookPool);
        const selectedBook = bookPool[randomIndex];
        return selectedBook();
      })
      .then((result)=>{
        // Get book from title
        // tableName, columnName, listOfTitle
        return getListFromDb('books', 'BookTitle', result);
      })
      .then((result)=>{
        return res.status(201).json({
          error: false,
          message: 'Book fetched successfully',
          list: result,
        });
      })
      .catch((err)=>{
        return res.status(500).json({
          error: true,
          message: err.message,
        });
      }).finally(()=>{

        // selectedFunction();
      });
};
const getSports = (title) => {
  const key=title || ' ';
  console.log('Sport  Based: '+key);
  return new Promise((resolve, reject)=>{
    axios
        .post(baseUrl+'/sport/recommendation_content/'+key)
        .then((response) => {
          const titles = response.data.data;
          console.log(titles);
          resolve(titles);
        }).catch((err)=>{
          reject(err);
        });
  });
};

const getContentBased = (title, limit) => {
  const key=title || 'best';
  console.log('Content  Based: '+key);
  return new Promise((resolve, reject)=>{
    axios
        .post(baseUrl+'/books/recommendation_content/'+key+'/'+limit)
        .then((response) => {
          const books = response.data.data;
          const titles = books.map((item) => item.Judul);

          resolve(titles);
        }).catch((err)=>{
          reject(err);
        });
  });
};
const getCollaborativeBased = (uid) => {
  console.log('Collaborative  Based: '+uid);
  return new Promise((resolve, reject)=>{
    axios
        .post(baseUrl+'/books/recommendation_collaborative/'+uid)
        .then((response) => {
          const titles = response.data.data;

          resolve(titles);
        }).catch((err)=>{
          reject(err);
        });
  });
};
// Check if uid exist in certain table and get the data correspond
const getDb=(select, tableName, col, query, extra ) => {
  return new Promise((resolve, reject)=>{
    pool.getConnection((err, connection) => {
      if (err) {
        connection.release();
        console.error('Error connecting to database:', err);
        reject(err);
      }

      // eslint-disable-next-line max-len
      const findIdQuery = `SELECT ${select} FROM ${tableName} WHERE ${col} = ? ${extra}`;
      connection.query(findIdQuery, [query], (err, result) => {
        if (err) {
          connection.release();
          console.error('Error querying database:', err);
          reject(err);
        }
        connection.release();
        resolve(result); // return result if uid found
      });
    });
  });
};
const getListFromDb=(tableName, columnName, listOfTitle)=>{
  return new Promise((resolve, reject)=>{
    pool.getConnection((err, connection) => {
      if (err) {
        connection.release();
        console.error('Error connecting to database:', err);
        reject(err);
      }

      const findBookQuery = `
      SELECT *, \'0\' AS isPublic FROM ${tableName} WHERE ${columnName} IN (?)`;
      connection.query(findBookQuery, [listOfTitle], (err, result) => {
        console.log(findBookQuery);
        if (err) {
          connection.release();
          console.error('Error querying database:', err);
          reject(err);
        }
        connection.release();
        resolve(result); // return result if uid found
      });
    });
  });
};

// Get highest book rating count
const getFromRatingCount=(limit) => {
  return new Promise((resolve, reject)=>{
    pool.getConnection((err, connection) => {
      if (err) {
        connection.release();
        console.error('Error connecting to database:', err);
        reject(err);
      }

      const findBookQuery = `
      SELECT *,\'0\' AS isPublic FROM books
      ORDER BY CountRating DESC
      LIMIT ?;
      `;
      connection.query(findBookQuery, [limit], (err, result) => {
        if (err) {
          connection.release();
          console.error('Error querying database:', err);
          reject(err);
        }
        connection.release();
        resolve(result); // return result if uid found
      });
    });
  });
};
const getRandomIndex = (pool) => {
  const poolLength = pool.length;
  const randomIndex = Math.floor(Math.random() * poolLength);
  return randomIndex;
};
