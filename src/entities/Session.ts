import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity("sessions")
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: "CASCADE" })
  user!: User;

  @Column({ unique: true })
  refreshToken!: string;

  @Column({ type: "timestamp" })
  expiresAt!: Date;

  @Column({ default: false })
  revoked!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}

