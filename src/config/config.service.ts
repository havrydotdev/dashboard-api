import { inject, injectable } from 'inversify';
import { IConfigService } from './config.service.interface';
import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] Failed to read .env file');
		} else {
			this.logger.log('[ConfigService] Successfully loaded .env config file');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}
