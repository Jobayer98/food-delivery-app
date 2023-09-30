import express, {Express, Request, Response, NextFunction} from 'express';
import cors from 'cors';

import authRouter from "./routes/authRoute"
import CustomError from './utility/CustomError';

const app:Express = express();

//middleware
app.use(cors())
app.use(express.json());

app.use("/api/v1/auth", authRouter);

// error handler
app.use((err:CustomError, req:Request, res:Response, next:NextFunction): void =>{
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message
    })
})

export default app;