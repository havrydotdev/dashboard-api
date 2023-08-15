import { Logger } from "tslog";

export class LoggerService {
    private logger: Logger<unknown[]>;

    constructor() {
        this.logger = new Logger<unknown[]>();
    }

    log(...args: unknown[]) {
        this.logger.info(...args);
    }

    error(...args: unknown[]) {
        this.logger.error(...args);
    }

    warn(...args: unknown[]) {
        this.logger.warn(...args);
    }
}
