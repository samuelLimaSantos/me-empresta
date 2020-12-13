import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class CreateProductRelationship1607891666049 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createForeignKey('products', new TableForeignKey({
        name: 'productRelation',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('products', 'productRelation');
    }

}
