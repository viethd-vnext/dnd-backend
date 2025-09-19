import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: true })
    photo: string;

    @Column({
        type: 'enum',
        enum: ['user', 'admin'],
        default: 'user'
    })
    role: 'user' | 'admin' 

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ nullable: true, select: false })
    passwordConfirm: string;

    @Column({ type: 'timestamp', nullable: true })
    passwordChangedAt: Date | null | undefined;

    @Column({ nullable: true })
    passwordResetToken: string;

    @Column({ type: 'timestamp', nullable: true })
    passwordResetExpires: Date | null | undefined;
    @Column({ default: true, select: false })
    active: boolean;
}
