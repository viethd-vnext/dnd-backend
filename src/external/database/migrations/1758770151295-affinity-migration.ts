import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AffinityMigration1758770151295 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "affinity",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "gen_random_uuid()"
                },
                { name: "characterID", type: "uuid", isNullable: false },
                { name: "bludgeoning", type: "varchar", isNullable: false, default: "'neutral'" },
                { name: "piercing", type: "varchar", isNullable: false, default: "'neutral'" },
                { name: "slashing", type: "varchar", isNullable: false, default: "'neutral'" },
                { name: "fire", type: "varchar", isNullable: false, default: "'neutral'" },
                { name: "cold", type: "varchar", isNullable: false, default: "'neutral'" },
                { name: "acid", type: "varchar", isNullable: false, default: "'neutral'" },
                { name: "thunder", type: "varchar", isNullable: false, default: "'neutral'" },
                { name: "lightning", type: "varchar", isNullable: false, default: "'neutral'" },
                { name: "poison", type: "varchar", isNullable: false, default: "'neutral'" },
                { name: "radiant", type: "varchar", isNullable: false, default: "'neutral'" },
                { name: "necrotic", type: "varchar", isNullable: false, default: "'neutral'" },
                { name: "psychic", type: "varchar", isNullable: false, default: "'neutral'" },
                { name: "force", type: "varchar", isNullable: false, default: "'neutral'" }
            ]
        }));

        await queryRunner.createForeignKey("affinity", new TableForeignKey({
            columnNames: ["characterID"],
            referencedTableName: "sheet",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            name: "FK_character_affinity"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("affinity", "FK_character_affinity");
        await queryRunner.dropTable("affinity");
    }

}
