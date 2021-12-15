import { Product } from 'aws-sdk/clients/ssm';
import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity('cart')
export class Cart {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  products: Product[];

  @Column('uuid')
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
