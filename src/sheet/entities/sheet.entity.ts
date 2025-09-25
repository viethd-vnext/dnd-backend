import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Min } from 'class-validator';

@Entity("sheet")
export class CharacterSheet {
    constructor(
    ) {}
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'userID' })
    user: User

    @Column({ type: 'uuid' })
    userID: string
    @Column({ nullable: false })
    characterName: string

    @Column({nullable: false})
    characterClass: string

    @Column({nullable: false, default: 10})
    armorClass: number

    @Min(0)
    @Column({nullable: false})
    hp: number

    @Column({nullable: false})
    @Min(1)
    maxHP: number

    @Column({nullable:false, default: 0})
    tempHP: number

    @Column({nullable: false, default: "None"})
    background: string

    @Column({ default: true, select: false })
    active: boolean
}