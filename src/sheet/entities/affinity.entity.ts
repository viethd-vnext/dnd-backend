import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CharacterSheet } from './sheet.entity';
@Entity("affinity")
export class CharacterAffinity {
    constructor(
    ) {}
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => CharacterSheet, (sheet) => sheet.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'characterID' })
    character: CharacterSheet

    @Column({ type: 'uuid' })
    characterID: string

    @Column({
        type: 'enum',
        enum: ['neutral', 'resistant','vulnerable', 'immune'],
        default: 'neutral'
    })
    bludgeoning: 'neutral' | 'resistant' | 'vulnerable' | 'immune'

    @Column({
        type: 'enum',
        enum: ['neutral', 'resistant','vulnerable', 'immune'],
        default: 'neutral'
    })
    piercing: 'neutral' | 'resistant' | 'vulnerable' | 'immune'

    @Column({
        type: 'enum',
        enum: ['neutral', 'resistant','vulnerable', 'immune'],
        default: 'neutral'
    })
    slashing: 'neutral' | 'resistant' | 'vulnerable' | 'immune'

    @Column({
        type: 'enum',
        enum: ['neutral', 'resistant','vulnerable', 'immune'],
        default: 'neutral'
    })
    fire: 'neutral' | 'resistant' | 'vulnerable' | 'immune'

    @Column({
        type: 'enum',
        enum: ['neutral', 'resistant','vulnerable', 'immune'],
        default: 'neutral'
    })
    cold: 'neutral' | 'resistant' | 'vulnerable' | 'immune'

    @Column({
        type: 'enum',
        enum: ['neutral', 'resistant','vulnerable', 'immune'],
        default: 'neutral'
    })
    acid: 'neutral' | 'resistant' | 'vulnerable' | 'immune'

    @Column({
        type: 'enum',
        enum: ['neutral', 'resistant','vulnerable', 'immune'],
        default: 'neutral'
    })
    thunder: 'neutral' | 'resistant' | 'vulnerable' | 'immune'

    @Column({
        type: 'enum',
        enum: ['neutral', 'resistant','vulnerable', 'immune'],
        default: 'neutral'
    })
    lightning: 'neutral' | 'resistant' | 'vulnerable' | 'immune'

    @Column({
        type: 'enum',
        enum: ['neutral', 'resistant','vulnerable', 'immune'],
        default: 'neutral'
    })
    poison: 'neutral' | 'resistant' | 'vulnerable' | 'immune'

    @Column({
        type: 'enum',
        enum: ['neutral', 'resistant','vulnerable', 'immune'],
        default: 'neutral'
    })
    radiant: 'neutral' | 'resistant' | 'vulnerable' | 'immune'

    @Column({
        type: 'enum',
        enum: ['neutral', 'resistant','vulnerable', 'immune'],
        default: 'neutral'
    })
    necrotic: 'neutral' | 'resistant' | 'vulnerable' | 'immune'

    @Column({
        type: 'enum',
        enum: ['neutral', 'resistant','vulnerable', 'immune'],
        default: 'neutral'
    })
    psychic: 'neutral' | 'resistant' | 'vulnerable' | 'immune'

    @Column({
        type: 'enum',
        enum: ['neutral', 'resistant','vulnerable', 'immune'],
        default: 'neutral'
    })
    force: 'neutral' | 'resistant' | 'vulnerable' | 'immune'
}