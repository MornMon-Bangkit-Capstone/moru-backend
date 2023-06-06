const pool = require('database/index');
const {v4: uuidv4} = require('uuid');

// get all schedule
exports.getAllSchedule = async (req, res) => {
  const {id} = req.user;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }
    const checkExercisesQuery = 'SELECT * FROM schedule WHERE uid= ?';
    connection.query(checkExercisesQuery, [id], (err, results) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }

      if (results.length === 0) {
        return res.status(404).json({
          error: true,
          message: 'No schedule found',
        });
      }
      return res.status(201).json({
        error: false,
        message: 'Schedule fetched successfully',
        list: results,
      });
    });
  });
};
// get schedule detail
exports.getScheduleDetail = async (req, res) => {
  const {id} = req.params;
  const uid = req.user.id;


  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }
    const getScheduleDetailQuery = 'SELECT * FROM schedule WHERE id= ?';
    connection.query(getScheduleDetailQuery, [id], (err, results) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }

      if (results.length === 0) {
        return res.status(404).json({
          error: true,
          message: 'Schedule not found',
        });
      }
      if (results[0].uid !== uid) {
        return res.status(403).json({
          error: true,
          message: 'Forbidden',
        });
      }
      return res.status(201).json({
        error: false,
        message: 'Schedule fetched successfully',
        schedule: results,
      });
    });
  });
};
// Edit schedule
exports.editScheduleDetail = async (req, res) => {
  const {id} = req.params;
  const {type, name, date, startTime, endTime, description} = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }
    let putScheduleDetailQuery = 'UPDATE schedule SET';
    const values = [];
    if (type) {
      putScheduleDetailQuery += ' type = ?,';
      values.push(type);
    }
    if (name) {
      putScheduleDetailQuery += ' name = ?,';
      values.push(name);
    }
    if (date) {
      putScheduleDetailQuery += ' date = ?,';
      values.push(date);
    }
    if (startTime) {
      putScheduleDetailQuery += ' start_time = ?,';
      values.push(startTime);
    }
    if (endTime) {
      putScheduleDetailQuery += ' end_time = ?,';
      values.push(endTime);
    }
    if (description) {
      putScheduleDetailQuery += ' description = ?,';
      values.push(description);
    }
    putScheduleDetailQuery = putScheduleDetailQuery.slice(0, -1);

    putScheduleDetailQuery += ' WHERE id = ?';
    values.push(id);
    connection.query(putScheduleDetailQuery, values, (err, results) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          error: true,
          message: 'Schedule not found',
        });
      }
      return res.status(201).json({
        error: false,
        message: 'Schedule updated successfully',
      });
    });
  });
};
exports.postSchedule = async (req, res) => {
  const {type, name, date, startTime, endTime, description} = req.body;
  const uid = req.user.id;

  // Check if name, birthdate, and profile picture are provided
  if (!type || !name || !date || !startTime || !endTime || !description) {
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

    // POST data to database
    // eslint-disable-next-line max-len
    const updateDataQuery = 'INSERT INTO schedule (id, type, name, date, start_time, end_time, description, uid) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
    const id = 'schedule-' + uuidv4();
    connection.query(updateDataQuery,
        [
          id,
          type,
          name,
          date,
          startTime,
          endTime,
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
            message: 'success',
            data: results,
          });
        });
  });
};
// Delete schedule
exports.deleteSchedule = async (req, res) => {
  const {id} = req.params;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).json({message: 'Internal server error.'});
    }

    // Delete data in database
    // eslint-disable-next-line max-len
    const deleteDataQuery = 'DELETE FROM schedule WHERE id = ?';
    connection.query(deleteDataQuery, [id], (err, results) => {
      if (err) {
        connection.release();
        console.error('Error querying database:', err);
        return res.status(500).json({message: 'Internal server error.'});
      }
      return res.status(201).json({
        error: false,
        message: 'Schedule deleted successfully',
      });
    });
  });
};
