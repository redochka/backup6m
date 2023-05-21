Backup MySQL/MariaDB database and upload to S3

- Backup your databases automatically
- Compress the dump
- Upload to S3 (digitalocean)

You can provide configuration of Host to be backed up in yaml format. 
Put the configuration in the `mount/b6m-config` directory (see samples there). 

See available configuration in the `src/types/B6MConfig` file.



### Run :

A `.env` file is required for S3 uploads. See `.env.sample`

```sh
yarn install
yarn start
```
Docker image provided.

- Build the image:

```sh
docker build -t backup6m .
```

- Run 

```sh
docker run -v /path/to/backup6m/mount:/app/mount backup6m
```

