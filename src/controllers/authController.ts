import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import { loginValidator, registerValidator } from '../utils/validators';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const register = async (
    request: Request<object, object, IUser>,
    response: Response
) => {
    try {
        const { error } = registerValidator.validate(request.body);
        if (error) {
            return response.status(400).json({
                error: `${error?.details[0].message}`,
            });
        }
        const isExist = await User.findOne({ email: request.body.email });
        if (isExist) {
            return response.status(400).json({
                message: 'This email is already in use',
            });
        }
        const user = await User.create({
            ...request.body,
        });
        user.password = '';
        return response.status(200).json({
            message: 'User Successfully Registered',
            user: user,
        });
    } catch (err) {
        return response.status(500).json({
            message : "Something went wrong",
            error: err,
        });
    }
};

export const login = async (req:Request<object,object,{email:string,password:string}>,res:Response) => {
    const { error } = loginValidator.validate(req.body);
    if(error) {
        return res.status(400).json({
            error: `${error?.details[0].message}`,
        });
    }
    try {
        const user  = await User.findOne({email : req.body.email}).select('+password')
        if(!user) {
            return res.status(404).json({
                message : "Invalid Email or Password"
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user?.password as string);
        if(!isValidPass) {
            return res.status(404).json({
                message : "Invalid Email or Password"
            })
        }
        const token = await jwt.sign(user?._id.toString() as string ,process.env.JWT_SECRET as string)
        user.password = undefined as unknown as string;
        return res.status(200).json({
            user:user,
            token : token
        })

    }
    catch(err) {
        console.log(err)
        res.status(500).json({
            message : "Something went Wrong",
            error : err
        })
    }
}

export const getMe = async (req:Request ,res :Response) => {
    const token = req.header('auth-token');
    const decoded = jwt.verify(token as string,process.env.JWT_SECRET as string)
    const user = await User.findById(decoded)
    if(user) {
        res.status(200).json({
            user: user
        })
    }
    else {
        res.status(404).json({
            message : "User do not exists"
        })
    }
}
