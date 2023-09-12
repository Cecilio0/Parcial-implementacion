import { UserEntity } from 'src/user/entity/user.entity';
import { User } from 'src/user/interface/user.interface';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('forms')
export class FormEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, { cascade: true })
  @JoinColumn()
  user: User;

  @Column({ nullable: false })
  answers: string;
}
