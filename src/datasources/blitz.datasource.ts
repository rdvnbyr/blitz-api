import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'blitz',
  connector: 'mysql',
  url: 'mysql://blitz-devooby:94f7o8I&a@localhost:3306/db_blitz-devooby',
  host: 'localhost',
  port: 3306,
  user: 'blitz-devooby',
  password: '94f7o8I&a',
  database: 'db_blitz-devooby',
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
