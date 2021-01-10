import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import Profile from "./Profile";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true, nullable: false })
  email: string;

  @Column("varchar", { nullable: false })
  password: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}

export default User;
