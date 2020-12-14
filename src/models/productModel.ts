import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import UserModel from './userModel';

@Entity('products')
export default class ProductModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserModel, (user) => user.product, {eager: true})
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @Column()
  photo_id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity_days: number;

  @Column()
  delivery_way: string;

  @Column()
  delivery_point: string;

  @Column()
  uf: string;

  @Column()
  city: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
