import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { IUserService } from './users.service.interface';
import { TYPES } from '../types';
import { UserService } from './users.service';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';
import { hash } from 'bcryptjs';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);

		createdUser = await usersService.createUser({
			email: 'test@test.com',
			name: 'Ivan',
			password: '1',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	});

	it('validateUser - success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const isValid = await usersService.validateUser({
			email: 'test@test.com',
			password: '1',
		});

		expect(isValid).toBeTruthy();
	});

	it('validateUser - incorrect password entered', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const isNotValid = await usersService.validateUser({
			email: 'test@test.com',
			password: 'incorrect_password',
		});

		expect(isNotValid).toBeFalsy();
	});

	it('validateUser - user does not exist', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);

		const isNotValid = await usersService.validateUser({
			email: 'test@test.com',
			password: '1',
		});

		expect(isNotValid).toBeFalsy();
	});
});
