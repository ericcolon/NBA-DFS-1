import { newPost } from './post'

const TYPE = 'Answer'

let answer = {
  post: {}
}

answer.post.answer = newPost(TYPE)

export default answer
