import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({type : 'text'})
  notes: string;

  @Column({type : 'timestamp'})
  start_date: string;

  @Column({type : 'timestamp'})
  end_date: string;

  @Column({nullable: false, type : 'timestamp', default : () => "CURRENT_TIMESTAMP"})
  created_at: string;

  @Column({nullable: false, type : 'timestamp', default : () => "CURRENT_TIMESTAMP"})
  updated_at: string;
}