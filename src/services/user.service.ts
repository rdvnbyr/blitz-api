import {UserService} from '@loopback/authentication';
import {BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {User} from '../models';
import {UserCredentials, UserRepository} from '../repositories/user.repository';
import {BcryptService} from './bcrypt.service';

@injectable({scope: BindingScope.TRANSIENT})
export class MyUserService implements UserService<User, UserCredentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @service(BcryptService) public bcryptService: BcryptService,
  ) {}

  async verifyCredentials(credentials: UserCredentials): Promise<User> {
    const invalidCredentialsError = 'Invalid email or password.';
    const foundUser = await this.userRepository.findOne({
      where: {email: credentials.email},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    const passwordMatched = await this.bcryptService.comparePassword(credentials.password, foundUser.password);
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    const userProfile = {
      [securityId]: user.id!.toString(),
      id: user.id,
    };
    return userProfile as UserProfile;
  }
}
