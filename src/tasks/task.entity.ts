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
class Task {
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @Column()
  public title: string;

  @ApiProperty()
  @Column()
  public content: string;

  @ApiProperty()
  @Column()
  public ownerId: number;

  @ApiProperty()
  @Column()
  public clientId: number;

  @ApiProperty()
  @Column()
  public status: number;

  @ApiProperty()
  @Column()
  public uploadFiles?: number;

  @ApiProperty()
  @Column()
  public attachFiles?: number;

  @ApiProperty()
  @Column()
  public taskType: string;

  @Column({ default: new Date() })
  dueDate: Date;

  // @ManyToOne(() => User, (client: User) => client.tasks)
  // public client?: User;
}

export default Task;
