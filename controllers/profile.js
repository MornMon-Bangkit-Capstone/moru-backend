const pool = require('database/index');

exports.userbyID = async (req, res) => {
  const { id } = req.params;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({ message: 'Internal server error.' });
    }

    const checkUsersQuery = 'SELECT name, email, birthDate, goal, profilePicture FROM users WHERE id = ?';
    connection.query(checkUsersQuery, [id], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ message: 'Internal server error.' });
      }

      if (results.length === 0) {
        return res.status(404).json({
          error: true,
          message: 'No user found',
        });
      }

      return res.status(200).json({
        error: false,
        message: 'User found successfully',
        user: results[0],
      });
    });
  });
};
