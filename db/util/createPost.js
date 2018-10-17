import db from '../models'
import Promise from 'bluebird'

const Post = db.Post
const Tag = db.Tag
const TagType = db.TagType

const typeToId = {
  Question: 1,
  Answer: 2,
  Comment: 3,
  1: 1,
  2: 2,
  3: 3
}

const tagToId = {
  'react': 1,
  'redux': 2,
}

const createPostWithTags = async ({UserId, title, body, type, PostId, PostTypeId, bounty}, tags) => {
  return db.sequelize.transaction(
    async () => {
      PostTypeId = PostTypeId || typeToId[type];

      const post = await Post.create({
        UserId,
        title,
        body,
        PostTypeId,
        PostId,
        bounty,
      })

      if (PostId) {
        await Post.incComment(PostId)
      }

      const tagEntries = await Promise.reduce(tags, async (all, tag) => {
        const tagEntry = await Tag.create({
          PostId: post.id,
          UserId,
          TagTypeId: tagToId[tag],
        })
        return [...all, tagEntry]
      }, [])
      return {...post, tags: tagEntries}
    }
  );
}

export { db }

export default createPostWithTags
