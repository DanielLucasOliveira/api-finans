import { IsDefined, IsString } from 'class-validator';

export class UserLoginDTO {
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
