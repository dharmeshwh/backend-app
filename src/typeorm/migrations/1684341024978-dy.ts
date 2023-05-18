import {MigrationInterface, QueryRunner} from "typeorm";

export class dy1684341024978 implements MigrationInterface {
    name = 'dy1684341024978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user_profile` (`id` varchar(36) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `first_name` varchar(15) NOT NULL, `last_name` varchar(15) NOT NULL, `user_name` varchar(36) NOT NULL, `email` varchar(36) NOT NULL, `password` varchar(255) NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `user_profile`");
    }

}
