import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("user_profile")
export class UserProfile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @Column({
    name: "first_name",
    type: "varchar",
    length: 36,
    nullable: false,
  })
  firstname: string;

  @Column({
    name: "last_name",
    type: "varchar",
    length: 36,
    nullable: false,
  })
  lastName: string;

  @Index({ unique: true })
  @Column({
    name: "user_name",
    type: "varchar",
    length: 36,
    nullable: false,
  })
  username: string;

  @Index({ unique: true })
  @Column({
    name: "email",
    length: 48,
    type: "varchar",
    nullable: false,
  })
  email?: string;

  @Column({
    name: "password",
    type: "varchar",
    length: 100,
    nullable: false,
    default: false,
  })
  password: string;
}
