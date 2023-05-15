export interface B6MConfig {
  databaseConfig: DatabaseConfig
  bucketName: string;
  bucketDirName: string
  skipRun: boolean
  uploadToS3: boolean
  uploadToServer: boolean
  sshServer: SshServerConfig
}

export interface DatabaseConfig {
  hostname: string
  username: string
  password: string
  dbName: string
}

export interface SshServerConfig {
  hostname: string
  username: string
  password: string
  port: number
}
