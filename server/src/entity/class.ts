/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn
} from 'typeorm';
import ClassMember from './classMember';
import Lecture from './lecture';

@Entity()
export default class Class extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @CreateDateColumn()
  public createdDate: Date;

  @UpdateDateColumn()
  public updatedDate: Date;

  @Column('varchar')
  public title: string;

  @Column('varchar')
  public subtitle: string;

  @OneToMany(() => Lecture, lecture => lecture.class)
  public lectures: Lecture[];

  @OneToMany(() => ClassMember, classMember => classMember.class)
  public members!: ClassMember[];
}
