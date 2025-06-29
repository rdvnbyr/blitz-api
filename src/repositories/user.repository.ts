import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BlitzDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export type UserCredentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id, UserRelations> {
  constructor(@inject('datasources.blitz') dataSource: BlitzDataSource) {
    super(User, dataSource);

    this.modelClass.observe('before save', async ctx => {
      if (ctx.instance) {
        ctx.instance.updated_at = new Date();
      } else {
        ctx.instance.created_at = new Date();
      }
    });
  }
}
