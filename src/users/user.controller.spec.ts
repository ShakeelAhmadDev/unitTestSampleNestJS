import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller"
import { User } from "./user.entity";
import { UserService } from "./user.service";

describe('user Controller',()=>{
    let userController:UserController;

    const user1 = new User(1,'msn','msn',true,'test@msn');
    

    beforeEach(async () => {
        const module:TestingModule = await Test.createTestingModule(
            {
              controllers:[UserController],
              providers:[
                  {
                      provide:UserService,
                      useValue:{
                          findAll:jest.fn().mockReturnValue(
                              [user1]
                          )
                      }
                  }
              ]   
            }
        ).compile();
        userController = module.get<UserController>(UserController);
    });

    it('User Controller Should be defined',()=>{
        expect(userController).toBeDefined()
    })

    describe('getAllUser',()=>{
        it('getUser',()=>{
            const users = userController.findAll();
            expect(users[0].firstName).toBe('msn');
            expect(users[0].isActive).toBe(true)
        })
    });

     
})