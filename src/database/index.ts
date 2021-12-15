import { Connection, createConnections, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection[]> => {
  const defaultOptions = await getConnectionOptions();
  const defaultOptionsMongo = await getConnectionOptions('mongo');

  return createConnections(
    [
      Object.assign(defaultOptions, {
        database: process.env.NODE_ENV === 'test' ? "me_empresta_test" : defaultOptions.database
      }),
      Object.assign(defaultOptionsMongo, {
        database: process.env.NODE_ENV === 'test' ? "me_empresta_test" : defaultOptionsMongo.database
      }),
    ],
  )
};
