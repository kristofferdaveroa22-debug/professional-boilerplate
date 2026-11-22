import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailVerificationFields1795363219779 implements MigrationInterface {
    name = 'AddEmailVerificationFields1795363219779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`emails\` ON \`users\` ()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`emails\` ON \`users\``);
    }

}
