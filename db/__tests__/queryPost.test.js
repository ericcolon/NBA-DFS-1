import queryPost, { db } from '../util/queryPost'

afterAll(async (done) => {
  await db.sequelize.close()
  return done()
});

describe('queryPost should allow the client to query data in a dynamic way', () => {
  test('should return all posts if query is empty', async (done) => {
    
    const query = await queryPost({});

    expect(query.length > 20).toBeTruthy();
    return done()
  });

  test('should be able to filter by id', async (done) => {
    const query = await queryPost({
      id: 1,     
      limitBy: 'all', 
    });
    expect(query.length).toBe(1);

    for (const post of query) {
      expect(post.id).toBe(1);
    }

    return done();
  });

  test('should return both question and it\'s corresponding answers', async (done) => {
    const query = await queryPost({
      PostId: 1,
      limitBy: 'all'
    });

    expect (query.length > 0).toBeTruthy();

    let existsQuestion = false;
    for (const post of query) {
      if (post.id !== 1) {
        expect(post.PostId).toBe(1);
      } else {
        existsQuestion = true;
      }
    } 

    expect(existsQuestion).toBeTruthy();

    return done();
  });

  test('should be able to filter by UserId', async (done) => {
    const query = await queryPost({
      UserId: 1,  
      limitBy: 'all',    
    });

    expect(query.length > 0).toBeTruthy();

    for (const post of query) {
      expect (post.UserId).toBe(1);
    }

    return done();
  });

  test('should be able to filter by title', async (done) => {
    const query = await queryPost({
      title: 'i am title 1',
      limitBy: 'all',  
    });

    expect(query.length > 1).toBeTruthy();
   
    return done();
  });

  test('should be able to filter by PostTypeId', async (done) => {
    const query = await queryPost({
      PostTypeId: 1,
      limitBy: 'all',  
    });
    
    expect(query.length > 0).toBeTruthy();
    
    for (const post of query) {
      expect(post.PostTypeId).toBe(1);
    }

    const query2 = await queryPost({
      PostTypeId: 2,
      limitBy: 'all',
    });

    expect(query2.length > 0).toBeTruthy();

    for (const post of query2) {
      expect(post.PostTypeId).toBe(2);
    }

    return done();
  });

  test('should be able to filter by isTopAnswer', async (done) => {
    const query = await queryPost({
      isTopAnswer: false,
      limitBy: 'all',     
    });
   
    expect(query.length > 0).toBeTruthy();

    for (const post of query) {
      expect(post.isTopAnswer).toBeFalsy();
    }

    return done();
  });

/*  TODO
  test('should be able to filter by tagName', async (done) => {
    const query = await queryPost({
      tagName: 'Programming'      
    });
   
    done();
  });
*/

test('should be able to sort by viewCount forwards and backwards', async (done) => {
    const query = await queryPost({
      sortBy: '+viewCount',
      limitBy: 'all'
    });
    
    expect(query.length > 0).toBeTruthy();

    let lastViewCount = query[0].viewCount;

    for (const post of query) {
      expect(post.viewCount <= lastViewCount).toBeTruthy();
      lastViewCount = post.viewCount;
    }

    const query2 = await queryPost({
      sortBy: '-viewCount',
      limitBy: 'all',
    });

    expect(query2.length > 0).toBeTruthy();

    lastViewCount = query[0].viewCount;

    for (const post of query2) {
      expect(post.viewCount >= lastViewCount).toBeTruthy();
      lastViewCount = post.viewCount
    }
    return done();
  });

  test('should be able to sort by answerCount', async (done) => {
    const query = await queryPost({
      sortBy: '+answerCount',
      limitBy: 'all'
    });
    
    expect(query.length > 0).toBeTruthy();

    let lastViewCount = query[0].answerCount;

    for (const post of query) {
      expect(post.answerCount <= lastViewCount).toBeTruthy();
      lastViewCount = post.answerCount;
    }

    const query2 = await queryPost({
      sortBy: '-answerCount',
      limitBy: 'all'
    });

    expect(query2.length > 0).toBeTruthy();

    lastViewCount = query[0].answerCount;

    for (const post of query2) {
      expect(post.answerCount >= lastViewCount).toBeTruthy();
      lastViewCount = post.answerCount
    }
    return done();
  });

  test('should be able to sort by favoriteCount', async (done) => {
    const query = await queryPost({
      sortBy: '+favoriteCount',
      limitBy: 'all',
    });
    
    expect(query.length > 0).toBeTruthy();

    let lastViewCount = query[0].favoriteCount;

    for (const post of query) {
      expect(post.favoriteCount <= lastViewCount).toBeTruthy();
      lastViewCount = post.favoriteCount;
    }

    const query2 = await queryPost({
      sortBy: '-favoriteCount',
      limitBy: 'all',
    });

    expect(query2.length > 0).toBeTruthy();

    lastViewCount = query[0].favoriteCount;

    for (const post of query2) {
      expect(post.favoriteCount >= lastViewCount).toBeTruthy();
      lastViewCount = post.favoriteCount
    }
    return done();
  });

  test('should be able to sort by upvoteCount', async (done) => {
    const query = await queryPost({
      sortBy: '+upvoteCount',
      limitBy: 'all',
    });
    
    expect(query.length > 0).toBeTruthy();

    let lastViewCount = query[0].upvoteCount;

    for (const post of query) {
      expect(post.upvoteCount <= lastViewCount).toBeTruthy();
      lastViewCount = post.upvoteCount;
    }

    const query2 = await queryPost({
      sortBy: '-upvoteCount',
      limitBy: 'all',
    });

    expect(query2.length > 0).toBeTruthy();

    lastViewCount = query[0].upvoteCount;

    for (const post of query2) {
      expect(post.upvoteCount >= lastViewCount).toBeTruthy();
      lastViewCount = post.upvoteCount
    }
    return done();
  });

  test('should be able to sort by createdAt', async (done) => {
    const query = await queryPost({
      sortBy: '+createdAt',
      limitBy: 'all'
    });
    
    expect(query.length > 0).toBeTruthy();

    let lastViewCount = query[0].createdAt;

    for (const post of query) {
      expect(post.createdAt >= lastViewCount).toBeTruthy();
      lastViewCount = post.createdAt;
    }

    const query2 = await queryPost({
      sortBy: '-createdAt',
      limitBy: 'all'
    });
    expect(query2.length > 0).toBeTruthy();
    
    lastViewCount = query2[0].createdAt;

    for (const post of query2) {
      expect(post.createdAt <= lastViewCount).toBeTruthy();
      lastViewCount = post.createdAt
    }
    return done();
  });


  test('should be able to sort by closedDate', async (done) => {
    const query = await queryPost({
      sortBy: '+closedDate',
      limitBy: 'all',
    });
    
    expect(query.length > 0).toBeTruthy();

    let lastViewCount = query[0].closedDate;

    for (const post of query) {
      expect(post.closedDate <= lastViewCount).toBeTruthy();
      lastViewCount = post.closedDate;
    }

    const query2 = await queryPost({
      sortBy: '-closedDate',
      limitBy: 'all',
    });

    expect(query2.length > 0).toBeTruthy();

    lastViewCount = query[0].closedDate;

    for (const post of query2) {
      expect(post.closedDate >= lastViewCount).toBeTruthy();
      lastViewCount = post.closedDate
    }
    return done();
  });

  test('should be able to sort by bounty', async (done) => {
    const query = await queryPost({
      sortBy: '-bounty',
      limitBy: 'all',
      PostTypeId: 1,
    });
    expect(query.length > 0).toBeTruthy();

    let lastBounty = query[0].bounty;
    for (const post of query) {
      expect(post.bounty <= lastBounty).toBeTruthy();
      lastBounty = post.bounty;
    }
    return done();
  })

  test('should be be able to limit the number of posts returned', async (done) => {
    const query = await queryPost({
      limitBy: 3
    });
    
    expect(query.length).toBe(3);

    return done();
  });

  test('should limit by 50 by default', async (done) => {
    const query = await queryPost({
    });

    expect(query.length).toBe(50);

    return done();
  })

  test('passing all into it should remove limit', async (done) => {
    const query = await queryPost({
      limitBy: 'all'
    });

    expect(query.length > 100).toBeTruthy();

    return done()
  })

  test('should be able to do a complicated multi parameter query', async (done) => {
    const query = await queryPost({
      sortBy: '+viewCount',
      limitBy: 5,
      PostTypeId: 1,
    });
    
    expect(query.length).toBe(5);

    let lastViewCount = query[0].viewCount;

    for (const post of query) {
      expect(post.viewCount <= lastViewCount).toBeTruthy();
      expect(post.PostTypeId).toBe(1);
      lastViewCount = post.viewCount;
    }

    return done();
  });
});