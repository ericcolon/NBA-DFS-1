import session from 'express-session'

export default session({
  secret: 'good luck figuring out this secret ',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: false,
  }
})