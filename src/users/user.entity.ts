import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import Address from "./address.entity";
import Post from "../posts/post.entity";
import Task from "../tasks/task.entity";
import Chat from "../chat/chat.entity";
import { Profile } from "../profile/profile.entity";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  //@Exclude()
  public password: string;
  
  @Column()
  public cellPhone?: string;
    
  @Column()
  public officePhone?: string;
    
  @Column()
  public image?: string;
  
  @Column()
  public address?: string;
  
  @Column()
  public birthday?: string;

  // @OneToOne(() => Address, {
  //   eager: true,
  //   cascade: true,
  // })
  // @JoinColumn()
  // public address: Address;

  // @OneToMany(() => Post, (post: Post) => post.author)
  // public posts?: Post[];

  // @OneToMany(() => Task, (task: Task) => task.client)
  // public tasks?: Task[];
  // @OneToMany(() => Chat, (chat: Chat) => chat.sender)
  // public sendChats?: Chat[];

  // @OneToMany(() => Chat, (chat: Chat) => chat.reciever)
  // public recieveChats?: Chat[];
  // @OneToOne((type) => Profile)
  // @JoinColumn()
  // profile: Profile;
}

export default User;
