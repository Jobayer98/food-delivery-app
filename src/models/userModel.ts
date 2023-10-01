import {Schema, model} from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface User {
    name: string,
    email: string,
    password: string,
    address?: string,
    phone?: string,
    role: string,
    tokens: string[],
    generateToken(): string,
    comparePassword(password: string): boolean
}

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value: string) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
        
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters"],
        trim: true,
        validate(password: string) {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                throw new Error("Password must contain at least one upper and lower letter, one number and one special character");
            }

            return passwordRegex.test(password);
        }
    },
    address: {
        type: String,
        trim: true,
        default: null
    },
    phone: {
        type: String,
        trim: true,
        default: null
    },
    role: {
        type: String,
        default: "customer",
        enum: ["customer", "admin", "owner", "driver"]
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

},
{
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async function () {
    if(!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    const token =  jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
}

const User = model<User>("User", userSchema);

export default User;