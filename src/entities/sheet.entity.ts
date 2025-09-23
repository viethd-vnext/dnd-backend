import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity("sheet")
export class CharacterSheet {
    constructor(
    ) {}
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column({ nullable: false })
    characterName: string

    @Column({nullable: false})
    characterClass: string

    @Column({nullable: false, default: 10})
    armorClass: number

    @Column({nullable: false})
    hp: number
    
    @Column({nullable:false, default: 0})
    tempHP: number

    @Column({nullable: false, default: "None"})
    background: string

    @Column({ default: true, select: false })
    active: boolean
}