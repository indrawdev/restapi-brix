const Client = require('../models/client')
const User = require('../models/user')
const Policy = require('../models/policy')

exports.listClient = (req, res, next) => {

    Client.findAll()
        .then(results => {
            res.status(200).json({ success: true, data: results })
            next()
        })
        .catch(err => {
            res.status(400).json({ success: true, message: err })
            next()
        })
}

exports.getClient = (req, res, next) => { 
    const clientId = req.params.id
    
    Client.findByPk(clientId, { include: [User, Policy]})
        .then(client => {
            if (client) {
                res.status(200).json({ success: true, data: client })
                next()
            } else {
                res.status(404).json({ success: false, message: 'Not found' })
                next()
            }
        })
        .catch(err => {
            res.status(400).json({ success: false, message: err })
            next()
        })
}
