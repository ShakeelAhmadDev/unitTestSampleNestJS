import { TestingModule,Test } from "@nestjs/testing";
import { UserService } from "./user.service"
import {User} from './user.entity'
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";


const Users = [
    new User(1,'msn','msn',true,'test@mail.com')
]

const oneUser = [new User(1,'msn','msn',true,'test')]

describe('User Service',()=>{
    let userService:UserService;
    let repo : Repository<User>;

    beforeEach(async () => {
        const module:TestingModule = await Test.createTestingModule({
            providers:[UserService,
            {
                provide:getRepositoryToken(User),
                useValue:{
                    find:jest.fn().mockResolvedValue(Users),
                    findOne:jest.fn().mockResolvedValue(oneUser),
                    findOneOrFail:jest.fn().mockResolvedValue(oneUser)
                }
            }] 
        }).compile();
        userService = module.get<UserService>(UserService)
        repo = module.get<Repository<User>>(getRepositoryToken(User))
    })
  
    it('userService Should be defined',()=>{
        expect(userService).toBeDefined()
    })

    describe('getAllUser', ()=>{
        it('should return of Users',async ()=>{
            const users = await userService.findAll();
        expect(users).toBe(Users);
        })
    });

    describe('getOneUser',()=>{
        it('findOne',async()=>{
            const findOneUser =  jest.spyOn(repo,'findOne');
            expect(userService.findOne(1)).resolves.toBe(oneUser);
            expect(findOneUser).toBeCalled();     
        })
    });

    describe('getUserByEmail',()=>{
        it('getUserbyEmail',()=>{
            const user =  jest.spyOn(repo,'findOneOrFail');
            expect(userService.findByEmail('test')).resolves.toBe(oneUser);
            expect(user).toBeCalled();
        })
    })
})