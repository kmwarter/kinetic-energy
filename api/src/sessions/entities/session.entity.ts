import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Nft } from '../../assets/entities/nft.entity';

@Entity()
@ObjectType()
export class Session {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => [Nft], { nullable: true })
  @Column({ type: 'json', nullable: true })
  assets: JSON[] = [];

  // @Field(() => [Nft], { nullable: true })
  // @OneToMany(() => Nft, (nft) => nft.session)
  // assets: Nft[];

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
