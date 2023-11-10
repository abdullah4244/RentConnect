import Joi from 'joi';
import { IUser } from '../models/userModel';

export const registerValidator = Joi.object<IUser>({
  firstName:Joi.string().required(),
  lastName:Joi.string().required(),
  dpUrl:Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  password:Joi.string().required(),
  role:Joi.string().required().valid('admin','landlord','tenant')
})

export const loginValidator = Joi.object<{email:string;password:string}>({
    email : Joi.string().required(),
    password  : Joi.string().required()
})