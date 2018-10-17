import prepareAnalytics from '../../db/util/analytics'
import queryPost from '../../db/util/queryPost'

const scorePost = (user, post) => {
  const usersPost = post.UserId === user.id
  const popularity = post.viewCount + post.answerCount + post.upvoteCount > 30
  const views = post.Views.filter(view => view.UserId === user.id).length > 0
  const votes = post.Votes.filter(vote => vote.UserId === user.id).length > 0
  return Number((usersPost * 50 + popularity * 5  + votes * 30 + views * 15))
}

const analytics = async (req, res) => {
  const userData = await prepareAnalytics()
  const postData = await queryPost({limitBy: 'all', sortBy: '-createdAt'})

  let out = {uid: [], qid: [], rating: []}

  for (const user of userData) {
    let userid = user.id

    for (const post of postData) {
      const qid = post.PostId || post.id
      let score = scorePost(user, post)
      score = score > 100 ? 100 : score
      if (post.PostTypeId === 1 && score > 0) {
        out.uid.push(userid)
        out.qid.push(qid)
        out.rating.push(score)
      }
    }
  }
  res.status(200).json(out)
}

export default analytics
