import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({type : 'text'})
  content: string;

  @Column()
  slug: string;
  
  @Column()
  lang: string;
  
  @Column({nullable: false, type : 'timestamp', default : () => "CURRENT_TIMESTAMP"})
  created_at: string;

  @Column({nullable: false, type : 'timestamp', default : () => "CURRENT_TIMESTAMP"})
  updated_at: string;
}