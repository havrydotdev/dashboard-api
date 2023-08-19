import express, { Express } from 'express';
import { Server } from 'node:http';
import { ILogger } from './logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface.js';
import 'reflect-metadata';
import { IUserController } from './users/users.controller.interface.js';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.interface.js';
import { PrismaService } from './database/prisma.service';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: IUserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`[App] Server started on http://localhost:${this.port}`);
	}
}
