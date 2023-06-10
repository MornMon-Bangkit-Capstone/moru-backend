const pool = require('database/index');

// get all schedule
exports.getAllSchedule = (req, res) => {
  const {id} = req.user;
  console.log(id);
  const getScheduleData= new Promise((resolve, reject)=>{
    pool.getConnection((err, connection) => {
      if (err) {
        connection.release();
        console.error('Error connecting to database:', err);
        reject(err);
      }
      const checkScheduleQuery = 'SELECT * FROM schedule WHERE uid= '+id;
      connection.query(checkScheduleQuery, (err, result) => {
        console.log(checkScheduleQuery);
        if (err) {
          connection.release();
          console.error('Error querying database:', err);
          reject(err);
        }

        if (result.length === 0) {
          reject(new Error('Schedule not found'));
        }
        connection.release();
        resolve(result);
      });
    });
  });
  getScheduleData.then((result)=>{
    return res.status(201).json({
      error: false,
      message: 'Schedule fetched successfully',
      list: result,
    });
  })
      .catch((err)=>{
        if (err.message === 'Schedule not found') {
          return res.status(404).json({
            error: true,
            message: err.message,
          });
        }
        return res.status(500).json({
          error: true,
          message: err.message,
        });
      });
};
// get schedule detail
exports.getScheduleDetail = (req, res) => {
  const {id} = req.params;
  const uid = req.user.id;

  const getScheduleDetailData= new Promise((resolve, reject)=>{
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        reject(err);
      }
      const getScheduleDetailQuery = 'SELECT * FROM schedule WHERE id= ?';
      connection.query(getScheduleDetailQuery, [id], (err, results) => {
        if (err) {
          connection.release();
          console.error('Error querying database:', err);
          reject(err);
        }

        if (results.length === 0) {
          reject(new Error('Schedule not found'));
        }
        if (results[0].uid !== uid) {
          reject(new Error('Forbidden'));
        }
        return res.status(201).json({
          error: false,
          message: 'Schedule fetched successfully',
          schedule: results,
        });
      });
      connection.release();
    });
  });
  getScheduleDetailData.then((result)=>{
    return res.status(201).json({
      error: false,
      message: 'Schedule fetched successfully',
      list: result,
    });
  })
      .catch((err)=>{
        if (err.message === 'Schedule not found') {
          return res.status(404).json({
            error: true,
            message: err.message,
          });
        }
        if (err.message === 'Forbidden') {
          return res.status(403).json({
            error: true,
            message: err.message,
          });
        }
        return res.status(500).json({
          error: true,
          message: err.message,
        });
      });
};
// Edit schedule
exports.editScheduleDetail = (req, res) => {
  const {id} = req.params;

  const {type, name, date, startTime, endTime, description} = req.body;

  const editScheduleData= new Promise((resolve, reject)=>{
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        reject(err);
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
  editScheduleData.then(()=>{
    return res.status(201).json({
      error: false,
      message: 'Schedule changed successfully',
    });
  }).catch((err)=>{
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  });
};
exports.postSchedule = (req, res) => {
  const {type, name, date, startTime, endTime, description} = req.body;
  const uid = req.user.id;

  // Check if name, birthdate, and profile picture are provided
  if (!type || !name || !date || !startTime || !endTime || !description) {
    const emptyFields = [];
    if (!type) emptyFields.push('type');
    if (!name) emptyFields.push('name');
    if (!date) emptyFields.push('date');
    if (!startTime) emptyFields.push('startTime');
    if (!endTime) emptyFields.push('endTime');
    if (!description) emptyFields.push('description');
    const errorMessage =
    'Please fill the following required fields: ' + emptyFields.join(', ');
    return res.status(401).json({
      error: true,
      message: errorMessage,
    });
  }
  // Get a connection from the pool
  const schedulePostData= new Promise((resolve, reject)=>{
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        reject(err);
      }

      // POST data to database
      // eslint-disable-next-line max-len
      const updateDataQuery = 'INSERT INTO schedule (type, name, date, start_time, end_time, description, uid) VALUES (?, ?, ?, ?, ?, ?, ?);';

      connection.query(updateDataQuery,
          [
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
              reject(err);
            }
            resolve();
          });
    });
  });
  schedulePostData.then((result)=>{
    return res.status(201).json({
      error: false,
      message: 'Schedule added successfully',
      list: result,
    });
  }).catch((err)=>{
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  });
};
// Delete schedule
exports.deleteSchedule = (req, res) => {
  const {id} = req.params;
  const bookDeleteData= new Promise((resolve, reject)=>{
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        reject(err);
      }
      // Delete data in database
      // eslint-disable-next-line max-len
      const deleteDataQuery = 'DELETE FROM schedule WHERE id = ?';
      connection.query(deleteDataQuery, [id], (err, results) => {
        if (err) {
          connection.release();
          console.error('Error querying database:', err);
          reject(err);
        }
        resolve();
      });
    });
  });
  bookDeleteData.then(()=>{
    return res.status(201).json({
      error: false,
      message: 'Schedule deleted successfully',
    });
  }).catch((err)=>{
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  });
};


