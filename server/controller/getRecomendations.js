import axios from 'axios'
import queryPost, { db } from '../../db/util/queryPost'
import Promise from 'bluebird'

const getRecomendations = async (req, res) => {
  const uid = req.params.uid

  const user = await db.User.findById(uid)
  console.log(user.recomendations)
  if (user.recomendations) {
    Promise.map(user.recomendations, (rec) => db.Post.findById(rec[0]))
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json(err.message))
  } else {
    queryPost({limitBy: 10})
      .then((post) => res.status(200).json(post))
      .catch((err) => res.status(404).json(err.message))
  }
}

export default getRecomendations
