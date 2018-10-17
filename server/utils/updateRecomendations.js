import Promise from 'bluebird'
import axios from 'axios'
import db from '../../db/models'

const updateRecomendations = async () => {
  console.log('update recomendations')
  const newRecomendations = await axios.get('https://hrr30-enzyme-learning.herokuapp.com/recomendations')
  console.log('new recomendations', newRecomendations.data)
  if (newRecomendations.data) {
    Promise.map(
      Object.keys(newRecomendations.data), 
      user => {
        console.log('user in promise', user)
        return Promise.map(
          newRecomendations.data[user],
          (rec) => {
            console.log('in rec', rec)
            return db.User.addRecomendations(rec[0], user)
          }
        )
      }
    )
  }
}

export default updateRecomendations