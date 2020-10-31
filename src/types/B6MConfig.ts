export interface B6MConfig {
    databaseConfig: DatabaseConfig
    bucketDirName: string
    skipRun: boolean
}

export interface DatabaseConfig {
    hostname: string,
    username: string,
    password: string,
    dbName: string,
}
