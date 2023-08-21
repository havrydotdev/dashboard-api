import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { IMiddleware } from './middleware.interface';
import { HTTPError } from '../errors/http-error.class';

export class AuthGuard implements IMiddleware {
	execute(
		{ user }: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
		res: Response<any, Record<string, any>>,
		next: NextFunction,
	): void {
		if (user) {
			next();
		} else {
			next(new HTTPError(401, 'unauthorized', 'guard'));
		}
	}
}
