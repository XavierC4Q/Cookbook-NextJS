import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Recipe from "./Recipe";

@Entity()
class Profile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column("varchar", { nullable: false })
  firstName: string;

  @Column("varchar", { nullable: false })
  lastName: string;

  @Column("varchar", { unique: true, nullable: true })
  displayName: string;

  @Column("varchar", { default: "" })
  headline: string;

  @Column("varchar", { default: "" })
  description: string;

  @CreateDateColumn()
  createdOn: number;

  @UpdateDateColumn()
  updatedOn: number;

  @OneToMany(() => Recipe, (recipe) => recipe.profile)
  recipes: Recipe[];
}

export default Profile;
