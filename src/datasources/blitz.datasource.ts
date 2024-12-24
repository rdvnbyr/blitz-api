import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'blitz',
  connector: 'mysql',
  url: 'mysql://blitz:X1g_8yk25@localhost:3306/db_blitz',
  host: 'localhost',
  port: 3306,
  user: 'blitz',
  password: 'X1g_8yk25',
  database: 'db_blitz',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class BlitzDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'blitz';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.blitz', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
