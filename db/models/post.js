export default (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [3, 150],
          msg: 'Please enter a title between 3 and 150 characters'
        }
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 5000],
          msg: 'Please enter a post between 1 and 5000 characters'
        }
      }
    },
    PostTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    viewCount: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    answerCount: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    isTopAnswer: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    commentCount: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    favoriteCount: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    upvoteCount: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    closedDate: {
      allowNull: true,
      type: DataTypes.DATE
    },
    bounty: {
      defaultValue: 0,
      type: DataTypes.FLOAT,
    }
  });
  
  Post.associate = (models) => {
    Post.belongsTo(models.User);
    Post.belongsTo(models.Post);
    Post.hasMany(models.Post);
    Post.belongsTo(models.PostType);
    Post.hasMany(models.Tag);
    Post.hasMany(models.Vote);
    Post.hasMany(models.View);
  };

  Post.getAllPosts = () => Post.findAll({
    include: [{all: true}]
  })

// TODO make this be able to take in string or number for type
  Post.getPostsByType = (type) => Post.findAll({
    where: {PostTypeId: type}
  })

  Post.getPostsByQuery = (query) => {
    return Post.findAll({
      where: query
    })
  }

  const typeToId = {
    Question: 1,
    Answer: 2,
    Comment: 3,
    1: 1,
    2: 2,
    3: 3
  };

  Post.createNewPost = async ({UserId, title, body, type, PostId, PostTypeId, bounty}) => {
    PostTypeId = PostTypeId || typeToId[type];

    await Post.create({
      UserId,
      title,
      body,
      PostTypeId,
      PostId,
      bounty,
    });

    if (PostId) {
      await Post.incComment(PostId);
    }
  }

  Post.destroyPost = async (id) => {
    let post;
    try {
      post = await Post.getPost(id);
    } catch(err) {
      throw new Error('post does not exist');
    }
    
    await Post.destroy({
      where: {id}
    });
    
    const question = post.PostId;
    if (question) {
      await Post.decComment(id);
    }
  }

  Post.getPostById = (postId) => Post.findById(postId)

  Post.incView = async (questionId) => {
    await Post.increment('viewCount', {
      where: {
        PostId: questionId
      }
    });
    await Post.increment('viewCount', {
      where: {
        id: questionId
      }
    });
  };

  const incField = (field) => (id) => Post.increment(field, {where: {id}});
  const decField = (field) => (id) => Post.decrement(field, {where: {id}});
  
  Post.incVote = incField('upvoteCount');
  Post.decVote = decField('upvoteCount');

  Post.incComment = incField('commentCount');
  Post.decComment = decField('commentCount');

  Post.incFavorite = incField('favoriteCount');
  Post.decFavorite = decField('favoriteCount');

  Post.incViewCount = incField('viewCount');

  Post.close = (id, isTopAnswer = false) => Post.update({
    closedDate: DataTypes.fn('NOW'),
    isTopAnswer
  });

  Post.incBounty = (id, amount) => Post.increment('bounty', {
    by: amount,
    where: {id},
  })
    

  return Post;

}
