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
  @Column({type:"float", default: 0.4 })
  public bidprice: number;

  @ApiProperty()
  @Column({type:"float", default: 5 })
  public bidamount: number;

  @ApiProperty()
  @Column({type:"float", default: 0.1 })
  public startbidprogres: number;

  @ApiProperty()
  @Column({type:"float", default: 0.2 })
  public endbidprogress: number;

  @ApiProperty()
  @Column({type:"float", default: 0.43 })
  public askprice: number;

  @ApiProperty()
  @Column({type:"float", default: 5 })
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

  @ApiProperty()
  @Column({type:"float", default: 10 })
  public stime: number;

  @ApiProperty()
  @Column({type:"float", default: 20 })
  public etime: number;

  @ApiProperty()
  @Column({type:"float", default: 0.5 })
  public price_rate: number;

  @ApiProperty()
  @Column({type:"float", default: 200 })
  public ytime: number;

  @ApiProperty()
  @Column({default: ""})
  public orders: string;

  @ApiProperty()
  @Column({ default: 0 })
  public botstartflag: boolean;
}

export default Post;
