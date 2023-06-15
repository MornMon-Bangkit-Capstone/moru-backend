const pool = require('database/index');

exports.userbyID =(req, res) => {
  const {id} = req.user;
  const getData= new Promise((resolve, reject)=>{
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }

      // eslint-disable-next-line max-len
      const checkUsersQuery = 'SELECT id, username, email, quota, birthDate, goal, profilePicture, favBook, favAuthor, favExercise, fillData FROM users WHERE id = ?';
      connection.query(checkUsersQuery, [id], (err, result) => {
        if (err) {
          connection.release();
          console.error('Error querying database:', err);
          reject(err);
        }

        if (result.length === 0) {
          connection.release();
          reject(new Error('Not Found'));
        }
        connection.release();
        resolve(result[0]);
      });
    });
  });
  getData.then((result)=>{
    return res.status(201).json({
      error: false,
      message: 'Data fetched successfully',
      data: result,
    });
  })
      .catch((err)=>{
        if (err.message === 'Not found') {
          return res.status(404).json({
            error: true,
            message: err.message,
          });
        }
        return res.status(500).json({
          error: true,
          message: err.message,
        });
      })
  ;
};
