import {User} from 'src/user/interface/user.interface';

export interface Form {
  id: number;
  user: User;
  answers: string;
}
