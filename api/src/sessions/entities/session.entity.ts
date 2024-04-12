import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Session {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  productIds: string[];

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
