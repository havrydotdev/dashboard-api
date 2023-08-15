import express, { Express } from "express";
import { usersRouter } from "./users/users.js";
import { Server } from "node:http";
import { LoggerService } from "./logger/logger.service.js";

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;

    constructor(logger: LoggerService) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
    }

    useRoutes() {
        this.app.use("/users", usersRouter);
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server started on http://localhost:${this.port}`);
    }
}
