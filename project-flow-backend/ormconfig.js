/**
 * 连接本地 mysql， 只用来生成 migration
 * 只在本地留存
 */
module.exports = {
  type: 'mysql',
  host: '123.56.139.231',
  port: 3306,
  username: 'root',
  password: 'double',
  database: 'project-flow',
  entities: [`${__dirname}/src/entity/**/*{.js,.ts}`],
  migrationsTableName: 'migration_log',
  migrations: [`src/db/migration/*{.js,.ts}`],
  cli: {
    migrationsDir: `src/db/migration`,
  },
};
