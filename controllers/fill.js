const pool = require('database/index');

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
