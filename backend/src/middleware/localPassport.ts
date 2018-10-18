import * as passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

const verifyLogin = async (username: string, password: string) => ({username})

const loginHandler = (username: string, password: string, done: Function) => {
  return verifyLogin(username, password)
    .then(user => done(null, user))
    .catch(err => done(null, false, err))
}

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

passport.use(new LocalStrategy(loginHandler))

export { passport }