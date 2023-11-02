import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';

export const register = async (
    request: Request<object, object, IUser>,
    response: Response
) => {
    try {
        const isExist = await User.findOne({ email: request.body.email });
        if (isExist) {
            response.status(400).json({
                message: 'This email is already in use',
            });
        }
        const user = await User.create({
            ...request.body,
        });
        user.password = '';
        response.status(200).json({
            message: 'User Successfully Registered',
            user: user,
        });
    } catch (err) {
        response.status(400).json({
            error: err,
        });
    }
};
