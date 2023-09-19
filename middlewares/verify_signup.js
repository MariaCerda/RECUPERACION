import docente from '../components/docente/model'
import docente from '../components/docente/models/docente'
import rol from '../components/rol/model'

export const checkDuplicateUsernameOrUsuario = async (req, res, next) => {
    const docente = await docente.findOne({username: req.body.username})
    if (docente) 
        return res.status(400).json({message: 'The user already exists.'})

    const usuario = await docente.findOne({eusuario: req.body.usuario})
    if (usuario)
        return res.status(400).json({message: 'The email already exists.'})
    
    next()
}

export const checkExistingUser = async (req, res, next) => {
    try {
        const userFound = await docente.findOne({ usuario: req.body.usuario });
        if (userFound)
            return res.status(400).json({ message: "The user already exists" });

        const usuario = await docente.findOne({ usuario: req.body.usuario });
        if (usuario)
            return res.status(400).json({ message: "The user already exists" });

        next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
  
export const checkExistingRole = async (req, res, next) => {
    try {
        const roles = await rol.find()
        let roles_nombres = []
        for (let valor of roles) {
            roles_nombres.push(valor.nombre)
        }

        if (!req.body.roles) 
            return res.status(400).json({ message: "No roles" });
        
        for (let i=0; i<req.body.roles.length; i++) {
            if (!roles_nombres.includes(req.body.roles[i])) {
                return res.status(400).json({message: `Role ${req.body.roles[i]} does not exist.`});
            }
        }
        next();
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}