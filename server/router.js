import { Router } from 'express'

import user from './controller/user'
import question from './controller/question'
import answer from './controller/answer'
import queryPostController from './controller/queryPost'
import closePost from './controller/closePost'
import upvotePost from './controller/upvotePost'
import downvotePost from './controller/downvotePost'
import updateViews from './controller/updateViews'
import addPublicAddress from './controller/addPublicAddress'
import analytics from './controller/analytics'
import getRecomendations from './controller/getRecomendations'


const router = Router();

router.get('/', (req, res) => res.json('Brandon Can\'t hang'));

router.get('/user', user.get.checkSignin);
router.post('/user/signup', user.post.signup);
router.post('/user/signin', user.post.signin);
router.post('/user/signout', user.post.logout);
router.get('/user/all', user.get.all);
router.patch('/user/address', addPublicAddress);

// documentation in db/util/queryPost
router.get('/post', queryPostController);
router.patch('/post/close', closePost);
router.patch('/post/upvotes', upvotePost);
router.patch('/post/downvotes', downvotePost);
router.patch('/post/views', updateViews);

router.post('/question', question.post.question);
router.post('/answer', answer.post.answer);

router.get('/analytics', analytics);
router.get('/user/recomendations/:uid', getRecomendations)

export default router

