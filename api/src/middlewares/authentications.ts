import { Request, Response, NextFunction } from 'express';
const { verifyToken } = require('../controllers/JWT');
const {User} = require('../db_connection');

// Definir una interfaz que extienda la interfaz Request y agregue la propiedad user
interface CustomRequest extends Request {
    user?: any; // Ajusta el tipo de 'user' según lo que esperes
}

const checkToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.accessToken
        console.log({aviso : 'aqui estan las cookies' ,accessToken})
        const verifysing = verifyToken(accessToken);

        if (!verifysing) {
            res.status(409);
            res.send({ error: 'Token invalid', verifyToken : verifysing });
        } else {
            console.log(verifysing)
            const userDetail = await User.findByPk(verifysing.id_user);
            req.user = userDetail;
            next();
        }
    } catch (error : any) {
        console.log('___Error auth___');
        res.status(409);
        res.send({ aviso :'Algo sucedió en el middleware auth', error: error.message  });
    }
};

module.exports = checkToken;
