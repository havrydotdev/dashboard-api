import express, { Express } from "express";
import { Server } from "node:http";
import { ILogger } from "./logger/logger.interface.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types.js";
import { IExceptionFilter } from "./errors/exception.filter.interface.js";
import "reflect-metadata";
import { IUserController } from "./users/users.controller.interface.js";

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: IUserController,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter
    ) {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        this.app.use("/users", this.userController.router);
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server started on http://localhost:${this.port}`);
    }
}
