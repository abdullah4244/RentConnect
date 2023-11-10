import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    dpUrl: string;
    password: string;
    role: 'admin' | 'landlord' | 'tenant';
}

const userSchema = new mongoose.Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dpUrl: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    role: {
        type: String,
        enum: ['admin', 'landlord', 'tenant'],
        required: [true, 'Role is required'],
    },
});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password,8);
    next();
});

const User = mongoose.model('User', userSchema);

export default User;

//has with bycrypt
