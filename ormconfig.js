module.exports = [
  {
    "name": "default",
    "type": process.env.DATABASE,
    "host": process.env.LOCALHOST,
    "port": process.env.PORT_USE,
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE_NAME,
    "entities": [
      process.env.ENTITIES_USE
    ],
    "migrations": [
      process.env.MIGRATIONS_USE
    ],
    "cli": {
      "migrationsDir": process.env.MIGRATIONS_DIR_USE
    }
  },
  {
    "name": "mongo",
    "type": process.env.MONGO_DATABASE,
    "host": process.env.MONGO_LOCALHOST,
    "port": process.env.MONGO_PORT_USE,
    "database": process.env.MONGO_DATABASE_NAME,
    "entities": [
      process.env.MONGO_ENTITIES_USE
    ],
    "useUnifiedTopology": true,
  }
]
