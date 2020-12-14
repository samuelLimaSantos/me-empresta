import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn } from 'typeorm';
  import ProductModel from './productModel';


@Entity('users')
export default class UserModel {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => ProductModel, (product) => product.user_id)
  product: UserModel;

  @Column()
  photo_id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column({select: false})
  password: string;

  @Column()
  whatsapp: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
