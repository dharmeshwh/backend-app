import {MigrationInterface, QueryRunner} from "typeorm";

export class dy1684382061233 implements MigrationInterface {
    name = 'dy1684382061233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user_profile` (`id` varchar(36) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `first_name` varchar(36) NOT NULL, `last_name` varchar(36) NOT NULL, `user_name` varchar(36) NOT NULL, `email` varchar(48) NOT NULL, `password` varchar(100) NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_1e079a32dcb36304548cce9bc0` (`user_name`), UNIQUE INDEX `IDX_e336cc51b61c40b1b1731308aa` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_e336cc51b61c40b1b1731308aa` ON `user_profile`");
        await queryRunner.query("DROP INDEX `IDX_1e079a32dcb36304548cce9bc0` ON `user_profile`");
        await queryRunner.query("DROP TABLE `user_profile`");
    }

}
