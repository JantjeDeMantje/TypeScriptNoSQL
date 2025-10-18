import { IsString, IsNumber, IsIn, IsOptional, IsArray, IsObject } from 'class-validator';

export class CreateModuleDto {
  @IsString() code!: string;
  @IsString() name!: string;
  @IsNumber() ec!: number;
  @IsIn(['NLQF-5', 'NLQF-6']) level!: 'NLQF-5' | 'NLQF-6';
  @IsOptional() @IsString() theme?: string;
  // Accept either string or object { en?: string; nl?: string }
  @IsOptional() description?: any;
  @IsOptional() @IsArray() keywords?: string[];
}

export class UpdateModuleDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsNumber() ec?: number;
  @IsOptional() @IsIn(['NLQF-5', 'NLQF-6']) level?: 'NLQF-5' | 'NLQF-6';
  @IsOptional() @IsString() theme?: string;
  // Accept either string or object { en?: string; nl?: string }
  @IsOptional() description?: any;
  @IsOptional() @IsArray() keywords?: string[];
}