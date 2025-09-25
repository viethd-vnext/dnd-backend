import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration1758769753247 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "gen_random_uuid()"
                },
                { name: "name", type: "varchar", isNullable: false },
                { name: "email", type: "varchar", isNullable: false, isUnique: true },
                { name: "photo", type: "varchar", isNullable: true },
                { name: "role", type: "varchar", isNullable: false, default: "'user'" },
                { name: "password", type: "varchar", isNullable: false },
                { name: "passwordConfirm", type: "varchar", isNullable: true },
                { name: "passwordChangedAt", type: "timestamp", isNullable: true },
                { name: "passwordResetToken", type: "varchar", isNullable: true },
                { name: "passwordResetExpires", type: "timestamp", isNullable: true },
                { name: "active", type: "boolean", isNullable: true, default: "true" }
            ]
        }));
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
