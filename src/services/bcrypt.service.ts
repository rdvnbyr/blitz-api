import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {compare, genSalt, hash} from 'bcryptjs';

export interface PasswordHasher<T = string> {
  hashPassword(password: T): Promise<T>;
  comparePassword(provdedPass: T, storedPass: T): Promise<boolean>;
}

@injectable({scope: BindingScope.TRANSIENT})
export class BcryptService implements PasswordHasher<string> {
  private rounds = 10;
  constructor(/* Add @inject to inject parameters */) {}

  async comparePassword(providedPass: string, storedPass: string): Promise<boolean> {
    const compared = await compare(providedPass, storedPass);
    return compared as boolean;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.rounds);
    const hashed = await hash(password, salt);
    return hashed as string;
  }
}
