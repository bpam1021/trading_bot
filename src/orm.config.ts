import * as postgresConnectionStringParser from 'pg-connection-string';

const connectionOptions = postgresConnectionStringParser.parse(
  process.env.DATABASE_URL,
);

// Check typeORM documentation for more information.
const config = {
  type: 'postgres',
  host: connectionOptions.host,
  port: Number(connectionOptions.port),
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: true,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: false,
  logger: 'file',

  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  },
};

export = config;
