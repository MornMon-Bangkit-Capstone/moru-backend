const pool = require('database/index');

exports.fillData = async (req, res) => {
  const {name, birthDate, goal, profilePicture} = req.body;
  const {id} = req.user;

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
          });
        });
  });
};

exports.editFillDetail = (req, res) => {
  const {id} = req.user;

  const {
    name,
    birthDate,
    goal,
    profilePicture,
    favBook,
    favExercise} = req.body;

  const editData= new Promise((resolve, reject)=>{
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        reject(err);
      }
      let putDetailQuery = 'UPDATE users SET';
      const values = [];
      if (name) {
        putDetailQuery += ' name = ?,';
        values.push(name);
      }
      if (birthDate) {
        putDetailQuery += ' birthDate = ?,';
        values.push(birthDate);
      }
      if (goal) {
        putDetailQuery += ' goal = ?,';
        values.push(goal);
      }
      if (profilePicture) {
        putDetailQuery += ' profilePicture = ?,';
        values.push(profilePicture);
      }
      if (favBook) {
        putDetailQuery += ' favBook = ?,';
        values.push(favBook);
      }
      if (favExercise) {
        putDetailQuery += ' favExercise = ?,';
        values.push(favExercise);
      }

      putDetailQuery = putDetailQuery.slice(0, -1);

      putDetailQuery += ' WHERE id = ?';
      values.push(id);
      connection.query(putDetailQuery, values, (err, results) => {
        console.log(this.sql);
        if (err) {
          connection.release();
          console.error('Error querying database:', err);
          reject(err);
        }
        //  connection.release();
        resolve();
      });
    });
  });
  editData.then(()=>{
    return res.status(201).json({
      error: false,
      message: 'Data changed successfully',
    });
  }).catch((err)=>{
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  });
};
