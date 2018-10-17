import { newPost } from './post'

const TYPE = 'Question'

let question = {
  post: {}
}

question.post.question = newPost(TYPE)

export default question
