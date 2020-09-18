//this is where the routes that need the user to be authorised are defined.

import express from 'express';
import authCtrl from '../controllers/auth.controller'

const router = express.router()

router.route('/auth/signin').post(authCtrl.signin);

router.route('/auth/signout').get(authCtrl.signout);

export default router;