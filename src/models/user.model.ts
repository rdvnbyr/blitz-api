import {Entity, model, property} from '@loopback/repository';

@model({settings: {mysql: {schema: 'db_blitz-devooby', table: 'User'}, idInjection: false}})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  first_name: string;

  @property({
    type: 'string',
    required: true,
  })
  last_name: string;

  @property({
    type: 'string',
    default: '',
  })
  avatar?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ["admin", "user", "guest"],
    },
  })
  role: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created_at?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  updated_at?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
