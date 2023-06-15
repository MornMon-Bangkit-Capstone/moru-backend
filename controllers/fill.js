const pool = require('database/index');
const {Storage} = require('@google-cloud/storage');
const processFile = require('middleware/upload');
const {format} = require('util');
const storage = new Storage({keyFilename: './google-cloud-key.json'});
const bucket = storage.bucket('moru-user-image');


exports.editFillDetail = (req, res) => {
  const {id} = req.user;

  const {
    name,
    birthDate,
    goal,
    favBook,
    favAuthor,
    favExercise,
    fillData,
  } = req.body;

  // const {image} = req.files;
  let putDetailQuery = 'UPDATE users SET ';
  const values = [];
  if (name) {
    putDetailQuery += ' username = ?,';
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

  if (favBook) {
    putDetailQuery += ' favBook = ?,';
    values.push(favBook);
  }
  if (favAuthor) {
    putDetailQuery += ' favAuthor = ?,';
    values.push(favAuthor);
  }
  if (favExercise) {
    putDetailQuery += ' favExercise = ?,';
    values.push(favExercise);
  }
  if (fillData) {
    putDetailQuery += ' fillData = ?,';
    values.push(fillData);
  }
  if (values.length===0) {
    return res.status(400).json({
      error: true,
      message: 'Empty field',
    });
  }

  putDetailQuery = putDetailQuery.slice(0, -1);

  putDetailQuery += ' WHERE id = ?';
  values.push(id);


  const editData= new Promise((resolve, reject)=>{
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        reject(err);
      }

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
  /*
  handleImage.then((result)=>{
    const profilePicture=(result)?`https://storage.googleapis.com/${bucketName}/${destinationFileName}`:null;
    if (profilePicture) {
      putDetailQuery += ' profilePicture = ?,';
      values.push(profilePicture);
    }
    return editData();
  })*/
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


exports.uploadImage = async (req, res) => {
  const uid = req.user.id;
  try {
    await processFile(req, res);

    if (!req.file) {
      return res.status(400).send({message: 'Please upload a file!'});
    }

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => {
      res.status(500).send({message: err.message});
    });

    blobStream.on('finish', async (data) => {
      const originalName=req.file.originalname;
      const fileNameInBucket=originalName.replace(/ /g, '%20');
      const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${fileNameInBucket}`,
      );
      const query = 'UPDATE users SET profilePicture = ? WHERE id = ?';
      await pool.getConnection((err, connection) => {
        if (err) {
          console.error('Error connecting to database:', err);
          res.status(500).send({
            message: err.message,
          });
        }

        connection.query(query, [publicUrl, uid], (err, results) => {
          if (err) {
            connection.release();
            console.error('Error querying database:', err);
            res.status(500).send({
              message: err.message,
            });
          }
          connection.release();
        });
      });
      res.status(201).json({
        error: false,
        message: 'image uploaded successfully',
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    console.log(err);

    if (err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: 'File size cannot be larger than 2MB!',
      });
    }
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};
