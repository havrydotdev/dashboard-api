import { Logger } from "tslog";
import "reflect-metadata";

export interface ILogger {
    logger: Logger<unknown[]>;

    log: (...args: unknown[]) => void;

    error: (...args: unknown[]) => void;

    warn: (...args: unknown[]) => void;
}
