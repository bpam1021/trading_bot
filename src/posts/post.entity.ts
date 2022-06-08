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

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @Column()
  public fromcurrency: string;

  @ApiProperty()
  @Column()
  public tocurrency: string;

  @ApiProperty()
  @Column({type:"float", default: 10 })
  public bidprice: number;

  @ApiProperty()
  @Column({type:"float", default: 10 })
  public bidamount: number;

  @ApiProperty()
  @Column({type:"float", default: 0.1 })
  public startbidprogres: number;

  @ApiProperty()
  @Column({type:"float", default: 0.2 })
  public endbidprogress: number;

  @ApiProperty()
  @Column({type:"float", default: 10.3 })
  public askprice: number;

  @ApiProperty()
  @Column({type:"float", default: 15 })
  public askamount: number;

  @ApiProperty()
  @Column({type:"float", default: 0.1 })
  public startaskprogres: number;

  @ApiProperty()
  @Column({type:"float", default: 0.2 })
  public endaskprogress: number;

  @ApiProperty()
  @Column({ default: 0 })
  public startflag: boolean;

}

export default Post;
