module.exports = function (allowedRoles){
    return function (req, res, next){
        if(!req.session.user || !allowedRoles.includes(req.session.user.role_id)){
            res.status(403).send('Unauthorized')
        } else {
            next()
        }
    }
}