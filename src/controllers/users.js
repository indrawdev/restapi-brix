const User = require('../models/user')
const Client = require('../models/client')
const Policy = require('../models/policy')
const Insurance = require('../models/insurance')

// show all users
exports.listUsers = (req, res, next) => {

    let offset  = parseInt(req.query.offset)
    let limit   = parseInt(req.query.limit)

    User.findAndCountAll({
        include: Client,
        where: { is_active: 1 }, 
        order: [
            ['created_at', 'DESC']
        ],
        offset: offset, limit: limit
    })
    .then(results => {
        res.status(200).json({ success: true, data: results })
        next()
    })
    .catch(err => {
        res.status(400).json({ success: false, data: err })
        next()
    });
}

// show single user
exports.getUser = (req, res, next) => {
    const userId = req.params.id 

    User.findByPk(userId, { 
        include: [{
            model: Client,
            include: [{
                model: Policy,
                include: Insurance
            }]
        }] 
    })
    .then(result => {
        if (result) {
            res.status(200).json({ success: true, data: result })
            next()
        } else {
            res.status(404).json({ success: false, message: 'Not found' })
            next()
        }
    })
    .catch(err => {
        res.status(400).json({ success: false, message: err })
        next()
    });
}