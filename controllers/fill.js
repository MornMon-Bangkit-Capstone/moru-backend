const pool = require('database/index');
const {Storage} = require('@google-cloud/storage');
const multer = require('multer');
const storage = new Storage();
exports.editFillDetail = (req, res) => {
  const {id} = req.user;
  const bucketName = 'your-bucket-name';
  const destinationFileName = 'moru'+id+'.jpg';
  const {
    name,
    birthDate,
    goal,
    profilePicture,
    favBook,
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
  if (fillData) {
    putDetailQuery += ' fillData = ?,';
    values.push(fillData);
  }

  putDetailQuery = putDetailQuery.slice(0, -1);

  putDetailQuery += ' WHERE id = ?';
  values.push(id);
  /*
  const handleImage=new Promise((resolve, reject)=>{
    if (!image) resolve();
    // If does not have image mime type prevent from uploading
    if (/^image/.test(image.mimetype)) {
      reject(new Error('Image Type not Supported'));
    }
    // eslint-disable-next-line max-len
    const [uploadedFile]= storage.bucket(bucketName).upload(image.tempFilePath, {
      destination: destinationFileName,
      overwrite: true,
    });
    resolve(uploadedFile);
  });
  */
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
