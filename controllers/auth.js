const bcrypt = require('bcryptjs');
const db = require('../database/db-config');
const jwt = require('jsonwebtoken');
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
};
// TODO finish the login
exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: 'Please Provide an email and password',
      });
    }
    db.query('SELECT * FROM users WHERE email = ?',
        [email],
        async (err, results) => {
          console.log(results);
          if (!results ||
            !await bcrypt.compare(password, results[0].password)) {
            res.status(401).json({
              error: true,
              message: 'Email or Password is incorrect',
            });
          } else {
            const id = results[0].id;
            const token = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: process.env.TOKEN_EXPIRES_IN,
            });

            console.log('the token is ' + token);
            /*
            const cookieOptions = {
              expires: new Date(
                  Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
              ),
              httpOnly: true,
            };
            res.cookie('userSave', token, cookieOptions);*/
            res.status(201).json({
              error: false,
              message: 'success',
              loginResult: {
                userId: results[0].id,
                name: results[0].password,
                token: token,
              },
            });
          }
        });
  } catch (err) {
    console.log(err);
  }
};
