import {Entity, Column, ManyToOne} from 'typeorm';
import Profile from './Profile';

@Entity()
class Recipe {
    @ManyToOne(() => Profile, profile => profile.recipes)
    profile: Profile;

    @Column('varchar', {nullable: false})
    title: string;
}

export default Recipe;

