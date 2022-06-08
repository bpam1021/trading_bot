declare const config: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    synchronize: boolean;
    ssl: {
        require: boolean;
        rejectUnauthorized: boolean;
    };
    migrationsRun: boolean;
    logging: boolean;
    logger: string;
    migrations: string[];
    cli: {
        migrationsDir: string;
    };
};
export = config;
