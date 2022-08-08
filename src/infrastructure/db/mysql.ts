import { Knex, knex } from 'knex';
import config from '../../config/main';

export const createMysqlConnection = async (host: string): Promise<Knex> => {
  const conn: Knex.Config = {
    client: 'mysql2',
    connection: {
      host : host,
      user : config.DB_USER,
      password : config.DB_PWD,
      database : config.DB_NAME,
    },
  };
  return new Promise((resolve, reject) => {
    // MongoClient.connect(host,  (error, client) => {
    //   if (error) reject(error);
    //   resolve(client!.db(config.DB_NAME));
    // });
    const knexInstance = knex(conn);
    
    resolve(knexInstance);
  });
};