import {CreateUserDto} from './createUser.dto';

describe('UserDto', () => {
  it('should be defined', () => {
    expect(new CreateUserDto()).toBeDefined();
  });
});
