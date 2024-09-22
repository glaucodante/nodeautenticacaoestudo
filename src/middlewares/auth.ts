import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()  // para acessar .ENV

// RESPONSÁVEL PELO PROCESSO DE AUTENTICAÇÃO - JWT
// Usar a biblioteca jsonwebtoken para gerar o token
export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        // fazer verificação de auth com TOKEN
        let success = false
        // console.log(req.headers.authorization)

        if (req.headers.authorization) {
            // Bearer = portador
            // Bearer = tipo de token que é utilizado como um método de autenticação
            const [authType, token] = req.headers.authorization.split(' ')
            if (authType === 'Bearer') {
                try {
                    // console.log("TOKEN", token)
                    // DECODIFICANDO O JWT (biblioteca)                    
                    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY as string)
                    success = true

                    // console.log("DECODED", decoded)

                } catch (err) {
                    // console.log("Erro:", "Deu erro no JWT")
                }
            }
        }


        if (success) {
            next()
        } else {
            res.status(403)
            res.json({ error: 'Não autorizado.' })
        }
    }
}
//PAREI NO VIDEO
// FAZENDO AUTENTICAÇÃO BASIC AUTH

