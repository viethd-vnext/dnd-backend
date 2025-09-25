import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class SheetMigration1758769984168 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "sheet",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "gen_random_uuid()"
                },
                { name: "userID", type: "uuid", isNullable: false},
                { name: "characterName", type: "varchar", isNullable: false },
                { name: "characterClass", type: "varchar", isNullable: false },
                { name: "armorClass", type: "integer", isNullable: false, default: "10" },
                { name: "hp", type: "integer", isNullable: false },
                { name: "maxHP", type: "integer", isNullable: false},
                { name: "tempHP", type: "integer", isNullable: false,default: "0" },
                { name: "background", type: "varchar", isNullable: false, default: "'None'" },
                { name: "active", type: "boolean", isNullable: true, default: "true" }
            ]
        }));

        await queryRunner.createForeignKey("sheet", new TableForeignKey({
            columnNames: ["userID"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            name: "FK_user_sheet"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("sheet", "FK_user_sheet");
        await queryRunner.dropTable("sheet");
    }

}
