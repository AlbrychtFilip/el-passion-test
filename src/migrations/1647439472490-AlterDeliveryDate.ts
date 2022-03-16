import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterDeliveryDate1647439472490 implements MigrationInterface {
    name = 'AlterDeliveryDate1647439472490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trips" DROP COLUMN "deliveryDate"`);
        await queryRunner.query(`ALTER TABLE "trips" ADD "deliveryDate" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trips" DROP COLUMN "deliveryDate"`);
        await queryRunner.query(`ALTER TABLE "trips" ADD "deliveryDate" date NOT NULL`);
    }

}
