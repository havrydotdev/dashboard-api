import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';

export interface IExceptionFilter {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
