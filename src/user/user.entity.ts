import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({length : 255, nullable: true, unique : true})
  email: string;

  @Column({type : 'text', nullable: true})
  password: string;

  @Column({nullable: true, type : 'timestamp', default : () => "CURRENT_TIMESTAMP"})
  created_at: string;

  @Column({nullable: true, type : 'timestamp', default : () => "CURRENT_TIMESTAMP"})
  updated_at: string;
}