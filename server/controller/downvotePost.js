import db from '../../db/models'

const Post = db.Post
const Vote = db.Vote

const downvote = async (req, res) => {
  try {
    const transaction = await db.sequelize.transaction(
      async () => {
        await Post.decVote(req.body.id)
        await Vote.create({
          PostId: req.body.id,
          UserId: req.body.UserId,
          VoteTypeId: 1,
        })
      }
    );
    return res.status(200).json(transaction)
  } catch(err) {
    res.status(400).json(err)
  }
}

export default downvote
