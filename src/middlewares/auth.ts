import { error } from 'console'
import { Request, Response, NextFunction } from 'express'
//responsável pelo processo de autenticação
export const Auth = {
    private: (req: Request, res: Response, next: NextFunction) => {
        // fazer verificação de auth
        let success = false
        if (success) {
            next()
        } else {
            res.status(403)
            res.json({ error: 'Não autorizado.' })
        }
    }
}