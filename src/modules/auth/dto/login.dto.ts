import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    example: 'superadmin', 
    description: 'Username or email address' 
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ 
    example: 'Admin123!', 
    description: 'User password' 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}