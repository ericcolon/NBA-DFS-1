import db from '../models'

const Op = db.Sequelize.Op
/*
 * not case sensitive though
 *
 * Examples of how to use filter params:
 *
 *  http://catalyst/posts/?UserId=1&PostTypeId=5
 *
 * http://catalyst/posts/?isTopAnswer=true
 *
 */
const camelCase = {
  'id': 'id',
  'postid': 'PostId',
  'userid': 'UserId',
  'username': 'username',
  'title': 'title',
  'posttypeid': 'PostTypeId',
  'istopanswer': 'isTopAnswer',
  'tagname': 'tagName',
  'viewcount': 'viewCount',
  'answercount': 'answerCount',
  'favoritecount': 'favoriteCount',
  'upvotecount': 'upvoteCount',
  'createdat': 'createdAt',
  'closeddate': 'closedDate',
  'limitby': 'limitBy',
  'sortby': 'sortBy',
  'bounty': 'bounty',
  // sort params
  '+viewcount': '+viewCount',
  '+answercount': '+answerCount',
  '+favoritecount': '+favoriteCount',
  '+upvotecount': '+upvoteCount',
  '+createdat': '+createdAt',
  '+closeddate': '+closedDate',
  '-viewcount': '-viewCount',
  '-answercount': '-answerCount',
  '-favoritecount': '-favoriteCount',
  '-upvotecount': '-upvoteCount',
  '-createdat': '-createdAt',
  '-closeddate': '-closedDate',
}

const filterParams = [
  'id',
  'PostId',
  'UserId',
  'title',
  'PostTypeId',
  'isTopAnswer',
  'tagName',
]

/*
 * Examples of how to use sort params:
 *
 * sort by viewCount ascending
 * http://catalyst/posts/?sortBy=+viewCount
 *
 * sort by createdAt descending
 * http://catalyst/posts/?sortBy=-createdAt
 *
 */
const sortParams = [
  'viewCount',
  'answerCount',
  'favoriteCount',
  'upvoteCount',
  'createdAt',
  'closedDate',
  'bounty',
]

const includeParams = [
  'username',
]

/*
 * Examples of how to use other params:
 *
 * get the top 50 upvoted posts
 *
 * http://catalyst/posts/?sortBy=-upVoteCount&limitBy=50
 *
 *
 * limitBy defaults to 50.  It can be turned off with
 *
 * limitBy=all
 *
 */

//const otherParams = [
//  'limitBy',
// ];

const parseFilterParams = (queryParams) => ({
  where: filterParams.reduce((a, e) => {
    if (e in queryParams) {
      if (e === 'PostId') {
        return {
          ...a,
          [Op.or]: [
            {
              id: queryParams[e]
            },
            {
              PostId: queryParams[e]
            }
          ]
        }
      }

      return {
        ...a,
        [e]: queryParams[e],
      }
    }
    return a;
  }, {})
})

const parseSortParams = (queryParams) => {
  let field = queryParams['sortBy']
  if (field) {
    let fieldArr = field.split('')
    let direction = fieldArr.splice(0,1)[0]

    field = fieldArr.join('')
    if (!['+', '-'].includes(direction)) {
      throw new Error('no direction specified for sortBy')
    } else if (!sortParams.includes(field)) {
      throw new Error('sortBy parameter is invalid')
    }

    return {
      order:  [
        [field, direction === '+' ? 'ASC' : 'DESC']
      ],
    }
  }
  return {}
}

const parseLimitParams = (queryParams) => {
  if ('limitBy' in queryParams) {
    if (queryParams['limitBy'] === 'all') {
      return {}
    }
    return {
      limit: queryParams['limitBy']
    }
  }
  return {limit: 50}
}

const parseIncludeParams = (queryParams) => {
  let out = [
    {
      model: db.User,
      as: 'User',
      attributes: ['id', 'username'],
    },
    {
      model: db.PostType,
      as: 'PostType',
      attributes: ['id', 'name'],
    },
    db.Tag,
    db.Vote,
    db.View,
  ]

  if (includeParams[0] in queryParams) {
    const username = queryParams['username']
    return {include: [{
      model: db.User,
      attributes: ['id', 'username'],
      through: {
        attributes: [''],
      },
      where: {
        username,
      }
    }]}
  }
  return {include: out}
}

const createQuery = (queryParams) => {

  const where = parseFilterParams(queryParams)
  const sort = parseSortParams(queryParams)
  const limit = parseLimitParams(queryParams)
  const include = parseIncludeParams(queryParams)

  return {...where, ...sort, ...limit, ...include}
};

const camelParams = (queryParams) => {
  let out = {}

  Object.keys(queryParams).map(key => {
    let value = queryParams[key]
    if (key in camelCase) {
      key = camelCase[key]
    }
    if (value in camelCase) {
      value = camelCase[value]
    }
    out[key] = value
  })

  return out
}

const objToLowerCase = (obj) => {
  let out = {}
  for (let k in obj) {
    let key = k
    let value = obj[k]
    if (typeof key === 'string') {
      key = k.toLowerCase()
    }
    if (typeof value === 'string') {
      value = value.toLowerCase()
    }
    out[key] = value
  }
  return out
}
const queryPost = (queryParams) => {
  queryParams = camelParams(objToLowerCase(queryParams))
  const query = createQuery(queryParams)
  return db.Post.findAll(query)
}

export { db }
export default queryPost
