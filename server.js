require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())
const posts = [
  {
    username: 'Kyle',
    title: 'Post 1'
  },
  {
    username: 'Jim',
    title: 'Post 2'
  }
]

app.post('/login', (req, res) => {
  // Authenticate User

  const username = req.body.username
  const user = { name: username }

  const accessToken=jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({accessToken: accessToken})

})

app.get('/posts',authenticateToken,  (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
  })
  
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  } 
app.listen(3000)