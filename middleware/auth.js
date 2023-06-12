const jwt = require('jsonwebtoken');
const pool = require('database/index');
exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({
      error: true,
      message: 'Invalid token',
    });
  }

  await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
    if (err) {
      return res.status(403).json({
        error: true,
        message: err.message,
      });
    }
    if (!Number.isSafeInteger(result.id)) {
      return res.status(401).json({
        error: true,
        message: 'not int',
      });
    }
    req.user = result;
    // console.log(req.user);
    next();
  });
};

exports.checkValidity = (tableName) => {
  return (req, res, next) => {
    const id = req.params.id;
    const uid = req.user.id;

    pool.getConnection((err, connection) => {
      if (err) {
        connection.release();
        console.error('Error connecting to database:', err);
        return res.status(500).json({
          error: true,
          message: err.message,
        });
      }

      const findIdQuery = `SELECT uid FROM ${tableName} WHERE id = ?`;
      connection.query(findIdQuery, [id], (err, result) => {
        if (err) {
          connection.release();
          console.error('Error querying database:', err);
          return res.status(500).json({
            error: true,
            message: err.message,
          });
        }
        if (!result[0] || result[0].uid !== uid) {
          connection.release();
          return res.status(404).json({
            error: true,
            message: tableName+' not found',
          });
        }

        connection.release();
        next(); // Call the next middleware or route handler
      });
    });
  };
};

/*
exports.checkValidity=(req, res, next)=> {
  const id = req.params.id;
  const uid = req.user.id;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }

    const findIdQuery = 'SELECT uid FROM schedule WHERE id = ?';
    connection.query(findIdQuery, [id], (err, result) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({
          error: true,
          message: err.message,
        });
      }
      if (!result[0] || result[0].uid !== uid) {
        connection.release();
        return res.status(404).json({
          error: true,
          message: 'Not Found',
        });
      }

      connection.release();
      next(); // Call the next middleware or route handler
    });
  });
};
*/
