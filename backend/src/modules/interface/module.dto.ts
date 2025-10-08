import { IsString, IsNumber, IsIn, IsOptional, IsArray } from 'class-validator';

export class CreateModuleDto {
  @IsString() code!: string;
  @IsString() name!: string;
  @IsNumber() ec!: number;
  @IsIn(['NLQF-5', 'NLQF-6']) level!: 'NLQF-5' | 'NLQF-6';
  @IsOptional() @IsString() theme?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsArray() keywords?: string[];
}

export class UpdateModuleDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsNumber() ec?: number;
  @IsOptional() @IsIn(['NLQF-5', 'NLQF-6']) level?: 'NLQF-5' | 'NLQF-6';
  @IsOptional() @IsString() theme?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsArray() keywords?: string[];
}