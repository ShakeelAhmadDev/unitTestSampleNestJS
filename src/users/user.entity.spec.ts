import {User} from './user.entity';


describe('UserObject',()=>{
    it('User Object',()=>{
        const user = new User(1,'msn','msn',true,'testing@msn.com');
        expect(user).toBeDefined();
        expect(user.id).toBe(1);
        expect(user.isActive).toBe(true);
    })
})