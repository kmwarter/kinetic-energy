import { Test, TestingModule } from '@nestjs/testing';
import { SessionsResolver } from './sessions.resolver';
import { SessionsService } from './sessions.service';
import { Session } from './entities/session.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';

const mockSessionRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};

describe('SessionsResolver', () => {
  let resolver: SessionsResolver;
  let service: SessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsResolver,
        SessionsService,
        {
          provide: getRepositoryToken(Session),
          useValue: mockSessionRepository,
        },
      ],
    }).compile();

    resolver = module.get<SessionsResolver>(SessionsResolver);
    service = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSession', () => {
    it('should return a session', async () => {
      const createSessionInput: CreateSessionInput = {
        id: null,
      };
      const mockCreatedSession: Session = {
        id: '1234',
        assets: [],
        created_at: new Date('2024-04-15T13:11:53.674Z'),
        updated_at: new Date('2024-04-15T13:56:57.388Z'),
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockCreatedSession);
      const result = await resolver.createSession(createSessionInput);
      expect(result).toEqual(mockCreatedSession);
    });
  });

  describe('findOne', () => {
    it('should return a session', async () => {
      const mockSession: Session = {
        id: 'hardcodedid',
        assets: [],
        created_at: new Date('2024-04-15T13:11:53.674Z'),
        updated_at: new Date('2024-04-15T13:56:57.388Z'),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockSession);
      const result = await resolver.findOne('anyid');
      expect(result).toEqual(mockSession);
    });
  });

  describe('updateSession', () => {
    it('should return a session', async () => {
      const updateSessionInput: UpdateSessionInput = {
        id: '123',
        assets: [],
      };
      const mockUpdatedSession: Session = {
        id: 'hardcodedid',
        assets: [],
        created_at: new Date('2024-04-15T13:11:53.674Z'),
        updated_at: new Date('2024-04-15T13:56:57.388Z'),
      };

      jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedSession);
      const result = await resolver.updateSession(updateSessionInput);
      expect(result).toEqual(mockUpdatedSession);
    });
  });
});
