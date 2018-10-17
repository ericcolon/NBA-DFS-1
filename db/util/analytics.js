import db from '../models'

const { Post, Tag, User, View, Vote } = db

const prepareAnalytics = () => {
  return User.findAll({
    include: [
      {
        model: Post,
        include: [
          {
            model: Tag
          }
        ]
      },
      {
        model: View,
      },
      {
        model: Vote,
      }
    ]
  })
}

export default prepareAnalytics
