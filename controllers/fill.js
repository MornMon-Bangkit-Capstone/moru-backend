const pool = require('database/index');

exports.fillData = async (req, res) => {
  const {name, birthDate, goal, profilePicture} = req.body;
  const {id}=req.user;

  // Check if name, birthdate, and profile picture are provided
  if (!name || !birthDate || !profilePicture) {
    return res.status(401).json({
      error: true,
      message: 'Please fill the required fields',
    });
  }
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }

    // PUT data to database
    // eslint-disable-next-line max-len
    const updateDataQuery = 'UPDATE users SET name = ?, birthDate= ?, goal= ?, profilePicture= ?  WHERE id = ?';
    connection.query(updateDataQuery,
        [
          name,
          birthDate,
          goal,
          profilePicture,
          id,
        ], (err, results) => {
          if (err) {
            connection.release();
            console.error('Error querying database:', err);
            return res.status(500).json({message: 'Internal server error.'});
          }
          return res.status(201).json({
            error: false,
            message: 'success',
            data: results,
          });
        });
  });
};

