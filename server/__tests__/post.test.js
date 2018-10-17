import { 
  db, 
  newPost, 
  allPosts,
  byQuery,
  postsByType,
  postById,
} from '../controller/post'

afterAll(async (done) => {
  await db.sequelize.close();
  return done();
});

const fakeQuestion = {
  UserId: 1,
  title: 'Title',
  body: 'This is the body',
  PostTypeId: 1,
  type: 'Question',
  PostId: null,
  bounty: 0.1
};

const fakeAnswer = {
  UserId: 2,
  title: 'Title',
  body: 'this is the body of an answer',
  PostTypeId: 2,
  PostId: 1,
};

class Res {
  status(status) {
    this.statuscode = status;
    return this;
  }

  send(message) {
    this.sentMessage = message;
    return this;
  }

  json(message) {
    return this.send(message);
  }
}

describe('newPost function from controller/post.js', () => {
  const newQuestion = newPost('Question');
  const newAnswer = newPost('Answer');

  test('should create a newQuestion', async () => {
    const req = {body: fakeQuestion};
    const res = new Res();

    await newQuestion(req, res);

    return expect(res.statuscode).toBe(201);
  });

  test('should create a newAnswer', async (done) => {
    const req = {body: fakeAnswer};
    const res = new Res();

    await newAnswer(req, res);
    expect(res.statuscode).toBe(201);
    return done();
  })
});

describe('get requests should return 200s', () => {
  test('allPosts should return a 200', async (done) => {
    const req = {};
    const res = new Res();

    await allPosts(req, res);
    expect(res.statuscode).toBe(200);
  
    return done();
  })

  test('byQuery should return a 200', async (done) => {
    const req = {query: {
      PostTypeId: 1
    }};
    const res = new Res();

    await byQuery(req, res);

    expect(res.statuscode).toBe(200);

    return done();
  })

  test('postsByType should return a 200', async (done) => {
    const req = {query: {
      PostTypeId: 1
    }};
    const res = new Res();

    await postsByType(1)(req, res);

    expect(res.statuscode).toBe(200);

    return done();
  });

  test('postById should return a 200', async (done) => {
    const req = {params: {
      id: 1
    }};
    const res = new Res();

    await postById(1)(req, res);
    expect(res.statuscode).toBe(200);

    return done();
  });
})