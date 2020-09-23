import User from './../model/user.model'
import extend from 'lodash/extend';
import errorHandler from './error.controller'

const create = (req, res) => {
    const user = new User(req.body);
    try {
        (async() => {await user.save()})();
        return res.status(200).json({
            message: 'User successfully signed up!!'
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const list = (req, res) => {
    try {
        (async() => {
            let users =  await User.find().select('name email updated created')
            res.json(users)
        })();
        
    } catch (err) {
        error: errorHandler.getErrorMessage(err)
    }
}

// Searches the user By Id.
const userByID = (req, res, next, id) => {
    try {
        let user = (async() => {await User.findById(id)})();
        if (!user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        read.profile = user
        next()
    } catch (err) {
        return res.status(400).json({
            error: 'cannot retrieve user'
        })
    }
}
//returns the user profile after removing the sensitive information from the user listing.
const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined
    return res.json(req.profile)
 }

// Loads a user and then updates the account details for that particular user. The updates are done using the loadsh module
// the updated field is set to the date and time of the update to keeo track of when the update happened
// 
const update = (req, res) => { 
    try{
        let user= req.profile;
        user = extend(user,req.body);
        user.updated = Date.now();
        (async() => {await user.save()})();
        user.hashed_password = undefined
        user.salt=undefined
        res.json(user)
    } catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const remove = (req, res) => {
    try{

        let user = user.profile
        let deletedUser =  (async() => {await user.remove()})();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined
        res.json(deletedUser)
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
 }

export default { create, list, userByID, read, update, remove };