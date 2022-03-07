import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTrip1646671915037 implements MigrationInterface {
    name = 'CreateTrip1646671915037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trip" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_address" text NOT NULL, "destination_address" text NOT NULL, "price" double precision NOT NULL, "delivery_date" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "trip"`);
    }

}
