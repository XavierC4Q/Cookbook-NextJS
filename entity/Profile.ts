import {Entity, Column, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import Recipe from './Recipe';

@Entity()
class Profile {
    @Column('varchar', {nullable: false})
    firstName: string;

    @Column('varchar', {nullable: false})
    lastName: string;

    @Column('varchar', {default: ''})
    displayName: string;

    @Column('varchar', {default: ''})
    headline: string;

    @Column('varchar', {default: ''})
    description: string;

    @CreateDateColumn()
    createdOn: number;

    @UpdateDateColumn()
    updatedOn: number;

    @OneToMany(() => Recipe, recipe => recipe.profile)
    recipes: Recipe[];
}

export default Profile;

