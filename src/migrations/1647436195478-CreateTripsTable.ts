import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTripsTable1647436195478 implements MigrationInterface {
    name = 'CreateTripsTable1647436195478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trips" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startAddress" text NOT NULL, "destinationAddress" text NOT NULL, "price" double precision NOT NULL, "deliveryDate" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f71c231dee9c05a9522f9e840f5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "trips"`);
    }

}
