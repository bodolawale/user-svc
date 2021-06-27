import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameFields1624637431547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME "first_name" TO "firstName"; ALTER TABLE "users"  RENAME "last_name" TO "lastName"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME "firstName" to "first_name"; ALTER TABLE "users" RENAME "lastName" to "last_name"`,
    );
  }
}
