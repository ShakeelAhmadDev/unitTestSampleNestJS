import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
id: number;
  @Column()
firstName: string;
  @Column()
lastName: string;
  @Column()
email: string;
  @Column()
password: string;
  @Column({ default: true })
isActive: boolean;
  @Column({ default: () => 'NOW()' })
createdAt: Date;
  @Column({ default: () => 'NOW()' })
updatedAt: Date;

constructor(id:number , firstName:string , lastName:string,isActive:boolean,email:string){
    this.firstName = firstName;
    this.id = id;
    this.email = email;
    this.lastName = lastName;
    this.isActive = isActive;
}

}