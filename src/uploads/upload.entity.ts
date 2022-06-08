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
class Upload {
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @Column()
  public originalname: string;

  @ApiProperty()
  @Column()
  public filename: string;

  @ApiProperty()
  @Column()
  public ownerId?: number;

  @ApiProperty()
  @Column()
  public clientId?: number;

  @ApiProperty()
  @Column()
  public status?: number;
}

export default Upload;
