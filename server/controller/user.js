import db from '../../db/models'
import passport from '../middleware/localPassport'
import log from '../utils/logger'
import jwt from 'jsonwebtoken'

const User = db.User

let controller = {
  post: {},
  get: {},
}

controller.get.checkSignin = (req, res) => {
  console.log('req.user', req.user)
  if (req.user) {
    res.status(200).json('user signed in')
  } else {
    res.status(404).json(req.user)
  }
}

controller.post.signup = (req, res) => {
  return User.createUser(req.body)
    .then(() => {
      req.login(req.body, (err) => {
        if (err) {
          log.info('there was an error in automatic signin', err)
          return res.status(401).send('User created but problem logging in')
        }
        return res.redirect('/')
      })
    })
    .catch((err) => {
      res.status(401).send(err.errors[0].message)
    })
}

controller.post.logout = (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
}

controller.post.signin = (req, res) => {

  passport.authenticate('local', (err, user, info) => {

    if (err || !user) {
      log.info('there was an error authenticating user', err, 'info', info)
      return res.status(422).send(!user
        ? 'username does not exist'
        : 'password is incorrect'
      )
    }

    user = user.dataValues
    user.password = undefined
    user.salt = undefined

    req.login(user, (err) => {
      if (err) {
        log.info('there was an error logging in user', err)
        return res.status(400).send('unable to log in user')
      } else {
        const token = jwt.sign({
          user
        }, 'somesecretkey')
        return res.json({token})
      }
    })
  })(req, res)
}

controller.get.all = (req, res) => {
  User.getAllUsers()
  .then((allUsers) => res.status(200).json(allUsers))
  .catch((err) => res.status(400).json(err))
}

export default controller
