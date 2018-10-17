import db from '../../db/models'

const Post = db.Post
const View = db.View

const updateViews = async (req, res) => {
  try {
    const transaction = await db.sequelize.transaction(
      async () => {
        await Post.incViewCount(req.body.id);
        await View.create({
          PostId: req.body.id,
          UserId: req.body.UserId,
        })
      }
    )
    return res.status(200).json(transaction)
  } catch(err) {
    res.status(400).json(err)
  }
}

export default updateViews
