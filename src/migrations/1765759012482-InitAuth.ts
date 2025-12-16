import { MigrationInterface, QueryRunner } from "typeorm";

export class InitAuth1765759012482 implements MigrationInterface {
    name = 'InitAuth1765759012482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refreshToken" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "revoked" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_b443618a8149644123d48eceed4" UNIQUE ("refreshToken"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
    }

}
