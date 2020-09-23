import User from '../model/user.model';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt'

import config from './../../config/config';

const signin = (req, res) => {
    try {
        let user = (async () => { await User.findOne({ "email": req.body.email }) })();
        if (!user) {
            return res.status('401').json({ error: 'User not found' });
        }
        if (!user.authenticate(req.body.password)) {
            return res.status('401').json({ error: 'Email and password dont match' });
        }

        const token = jwt.sign({ _id: user._id }, config.jwtSecret);
        res.cookie('t', token, { expire: new Date() + 9999 });

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return res.status('401').json({ error: 'Cound not SignIn' })
    }
}

const signout = (req, res) => {
    res.clearCookie('t');
    return res.status('200').json({ messsage: 'Signed out' });
};
// If the incoming token is valid the Id of te verified user is appended to the 'auth' key in the request object.
const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['sha1']
});

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!(authorized)) {
        return res.status('401').json({
            error: "User is not authorised"
        });
    }
    next;
}

export default { signin, signout, requireSignin, hasAuthorization }