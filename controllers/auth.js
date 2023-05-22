/* eslint-disable no-lonely-if */
const bcrypt = require('bcryptjs');
const db = require('../database/db-config');

exports.main = (req) => {
  console.log(req.body);
  console.log('Hi');
};
exports.register = (req, res) => {
  console.log(req.body);
  const {name, email, password} = req.body;
  db.query(
      'SELECT email from users WHERE email = ?',
      [email],
      async (err, results) => {
        if (err) {
          console.log(err);
        } else {
          if (results.length > 0) {
            res.status(401).json({
              error: true,
              message: 'User Created',
            });
          }
          /* //for password confirmation
            else if (password != passwordConfirm) {
                return res.sendFile(__dirname + "request.html", {
                    message: 'Password dont match'
                });
            } */
        }
        // TODO: change the '8' to something stronger
        const hashedPassword = await bcrypt.hash(password, 8);
        db.query('INSERT INTO users SET ?', {
          name, email, password: hashedPassword, premium: 0,

        }, (insertError) => {
          if (insertError) {
            console.log(insertError);
            return res.status(400).json({
              error: true,
              message: insertError,
            });
          }
          return res.status(201).json({
            error: false,
            message: 'User Created',
          });
        });
      });
  // res.send("Form submitted");
};
