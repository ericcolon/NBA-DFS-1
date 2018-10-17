import Promise from 'bluebird'

import db from '../../db/models'
import queryPost from '../../db/util/queryPost'

const Post = db.Post

const closePost = async (req, res) => {
  const posts = await queryPost({PostId: req.body.PostId})
  let topAnswer
  for (const post of posts) {
    if (!topAnswer || post.upvoteCount > topAnswer) {
      topAnswer = post.upvoteCount
      post.isTopAnswer = true
    }
  }
  try {
    let posts = await Promise.map(posts, (post) => Post.close(post.id, post.isTopAnswer))
    res.status(200).json(posts)
  } catch(err) {
    return res.status(400).json(err)
  }
}

export default closePost
