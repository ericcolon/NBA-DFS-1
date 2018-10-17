// in it's own file since it's our most important endpoint
import queryPost, { db } from '../../db/util/queryPost'

const controller = async (req, res) =>
  queryPost(req.query)
  .then((posts) => res.status(200).json(posts))
  .catch((err) => res.status(404).json(err))

export default controller

export { db }
