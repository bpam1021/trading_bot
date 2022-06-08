"use strict";
const postgresConnectionStringParser = require("pg-connection-string");
const connectionOptions = postgresConnectionStringParser.parse(process.env.DATABASE_URL);
const config = {
    type: 'postgres',
    host: connectionOptions.host,
    port: Number(connectionOptions.port),
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    ssl: {
        require: true,
        rejectUnauthorized: false,
    },
    migrationsRun: false,
    logging: false,
    logger: 'file',
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    },
};
module.exports = config;
//# sourceMappingURL=orm.config.js.map