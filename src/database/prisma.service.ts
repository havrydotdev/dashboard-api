import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		try {
			this.client = new PrismaClient();
			this.logger.log('[PrismaService] Successfully connected to database');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error(
					`[PrismaService] Failed to connect to database, error trace: ${e.message}`,
				);
			}
		}
	}

	async connect(): Promise<void> {
		await this.client.$connect();
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
