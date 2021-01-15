import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService{

    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}
   
    async findAll():Promise<User[]>{
        return this.userRepository.find();
    }

    async findOne(id:number):Promise<User>{
        return this.userRepository.findOne(id);
    }

    async findByEmail(email:string):Promise<User>{
        return this.userRepository.findOneOrFail({where:{email:email}})
    }
}