import queryPostController, { db } from '../controller/queryPost'

afterAll(async (done) => {
  await db.sequelize.close();
  done();
});

const fakeQueryParams = {
  sortBy: '+viewCount',
  id: 1,
  PostTypeId: 1
};

const req = {
  body: '',
  query: fakeQueryParams,
}

class Res {
  status(status) {
    this.statuscode = status;
    console.log('status sent:', status);
    return this;
  }

  send(message) {
    this.sentMessage = message;
    // console.log('new message', message);
    return this;
  }

  json(message) {
    return this.send(message);
  }
}

test('should return a 200 with a good query', async () => {
  const res = new Res();
  await queryPostController(req, res);

  return expect(res.statuscode).toBe(200);

});