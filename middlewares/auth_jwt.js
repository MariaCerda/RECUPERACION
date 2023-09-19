const jwt = require('jsonwebtoken')
import config from '../config'
import docente from '../components/docente/models'
import rol from '../components/rol/model'

// Autorizacion
export const verify_token = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']
        if (!token) {
            return res.status(403).json({message: 'No token provided.'})
        }
        const decoded = jwt.verify(token, config.SECRET)
        req.user_id = decoded.id
        const user = await docente.findById(decoded.id)
        if (!user) {
            return res.status(404).json({message: 'no user found.'})
        }
        next()
    } catch(error) {
        return res.status(401).json({message: 'Unauthorized'})
    }
}

// Autorizacion
export const is_admin = async (req, res, next) => {
    const usuario = await empleado.findById(req.user_id)
    const roles = await rol.find({_id: {$in: usuario.roles}})

    for (let i=0; i<roles.length; i++) {
        if (roles[i].name == 'admin')
            next()
        return
    }
    return res.status(403).json({message: 'Requer Admin role.'})
}