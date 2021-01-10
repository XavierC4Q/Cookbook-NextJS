import {Entity, Column, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Profile from './Profile';

@Entity()
class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Profile, profile => profile.recipes)
    profile: Profile;

    @Column('varchar', {nullable: false})
    title: string;
}

export default Recipe;

