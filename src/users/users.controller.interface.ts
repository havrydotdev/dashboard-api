import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';

export interface IUserController extends BaseController {
	login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	info: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
