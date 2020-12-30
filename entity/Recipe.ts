import {Entity, Column, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Profile from './Profile';

@Entity()
class Recipe {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Profile, profile => profile.recipes)
    profile: Profile;

    @Column('varchar', {nullable: false})
    title: string;
}

export default Recipe;

