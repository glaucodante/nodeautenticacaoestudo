import { Request, Response } from 'express';
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv' // para acessar o .env
import { User } from '../models/User';

dotenv.config() // Acessando o .ENV

export const ping = (req: Request, res: Response) => {
    res.json({ pong: true });
}

export const register = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let { email, password } = req.body;

        let hasUser = await User.findOne({ where: { email } });
        if (!hasUser) {
            let newUser = await User.create({ email, password });

            const token = JWT.sign( // GERANDO O TOKEN - PEGANDO OS DADOS
                { id: newUser.id, email: newUser.email },  // 1° param. OBJ. P/ ARMAZENAR
                process.env.JWT_SECRET_KEY as string, // 2° param. CHAVE PRIVADA (COLOCADA NO .ENV = JWT_SECRET_KEY)
                { expiresIn: '2h' } // 3° param. p/ COLOCAR OUTRAS OPÇÕES - EXPIRAÇÃO, por exemplo
            )
            res.status(201);
            res.json({ id: newUser.id, token }); // Devolvendo a RESPOSTA COM O TOKEN
        } else {
            res.json({ error: 'E-mail já existe.' });
        }
    }

    res.json({ error: 'E-mail e/ou senha não enviados.' });
}

export const login = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        let user = await User.findOne({
            where: { email, password }
        });
        // criando o TOKEN (JWT não necessita de assincronissidade)
        if (user) {
            const token = JWT.sign( // GERANDO O TOKEN - PEGANDO OS DADOS
                { id: user.id, email: user.email },  // 1° param. OBJ. P/ ARMAZENAR
                process.env.JWT_SECRET_KEY as string, // 2° param. CHAVE PRIVADA (COLOCADA NO .ENV = JWT_SECRET_KEY)
                { expiresIn: '2h' } // 3° param. p/ COLOCAR OUTRAS OPÇÕES - EXPIRAÇÃO, por exemplo
            )
            res.json({ status: true, token }); // Devolvendo a RESPOSTA COM O TOKEN
            return;
        }
    }

    res.json({ status: false });
}
// LISTANDO USUÁRIOS
export const list = async (req: Request, res: Response) => {
    let users = await User.findAll();
    let list: string[] = [];

    for (let i in users) {
        list.push(users[i].email);
    }
    res.json({ list });
}
