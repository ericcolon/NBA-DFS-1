import db from '../../db/models'

const addPublicAddress = (req, res) => {
  const { id, address } = req.body
  return db.User.addPublicAddress(id, address)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(401).json(err))
}

export default addPublicAddress
