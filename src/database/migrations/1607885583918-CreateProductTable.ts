import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProductTable1607885583918 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'products',
        columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'user_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'photo_id',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'title',
              type: 'varchar(50)',
              isNullable: false,
            },
            {
              name: 'description',
              type: 'varchar(500)',
              isNullable: false,
            },
            {
              name: 'price',
              type: 'decimal(7,2)',
              isNullable: false,
            },
            {
              name: 'quantity_days',
              type: 'integer',
              isNullable: false
            },
            {
              name: 'delivery_way',
              type: 'varchar(10)',
              isNullable: false,
            },
            {
              name: 'delivery_point',
              type: 'varchar(100)',
              isNullable: true,
              default: 'NULL'
            },
            {
              name: 'uf',
              type: 'varchar(2)',
              isNullable: true,
              default: 'NULL'
            },
            {
              name: 'city',
              type: 'varchar(20)',
              isNullable: true,
              default: 'NULL'
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()'
            }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('products');
    }

}
