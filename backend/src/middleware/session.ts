import * as session from 'express-session'

export default session({
  secret: 'askldglIkasdroiqvgevnervpqerwvnmoervopnre8940423nwv nioqwerfjqowe (((f2345rqw skdf234r 222()JKLASD9Ajdsflkasjd askldfj23qawdf5645][;plkvbc5e4fsdfgsadkl3254qrjkewgqhgorpasdkfsd',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: false,
  }
})
