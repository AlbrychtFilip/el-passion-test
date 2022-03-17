import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterDistance1647507251729 implements MigrationInterface {
    name = 'AlterDistance1647507251729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trips" ADD "distance" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trips" DROP COLUMN "distance"`);
    }

}
