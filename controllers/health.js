const pool = require('database/index');
exports.healthCheck = (req, res) => {
  const getData= new Promise((resolve, reject)=>{
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }
      const checkUsersQuery = 'SELECT id FROM users LIMIT 1';
      connection.query(checkUsersQuery, (err, result) => {
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
    });
  })
      .catch((err)=>{
        if (err.message === 'Not found') {
          return res.status(404).json({
            error: true,
          });
        }
        return res.status(500).json({
          error: true,
        });
      })
  ;
};
