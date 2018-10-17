import createPost, { db } from '../util/createPost'

const Post = db.Post;

afterAll(async (done) => {
  await db.sequelize.close()
  return done()
});

const UserId = 1;
const title = 'title';
const body = 'body';
const bounty = .01;

const post = {
  UserId,
  title,
  body,
  bounty,
  PostTypeId: 1,
};

test('createPost should create a new post with tags', async () => {
  console.log('createNewPost')
  debugger;
  const newPost = await createPost({...post}, ['react', 'redux']);
  
  return expect(Array.isArray(newPost.tags)).toBeTruthy();    
});