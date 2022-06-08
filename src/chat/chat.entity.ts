import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import User from "../users/user.entity";
import Category from "../categories/category.entity";

@Entity()
class Chat {
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @Column()
  public content: string;

  @ApiProperty()
  @Column()
  public time: string;

  @ApiProperty()
  @Column()
  public sender: number;

  @ApiProperty()
  @Column()
  public reciever: number;
  // @ManyToOne(() => User, (sender: User) => sender.sendChats)
  // public sender: User;

  // @ManyToOne(() => User, (reciever: User) => reciever.recieveChats)
  // public reciever: User;
}

export default Chat;
