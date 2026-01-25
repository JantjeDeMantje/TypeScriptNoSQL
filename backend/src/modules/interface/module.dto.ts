import { IsString, IsNumber, IsIn, IsOptional, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

type LocalizedDescription = string | { en?: string; nl?: string };

export class FilterModuleDto {
  @IsOptional() @IsNumber() @Transform(({ value }) => Number(value)) ec?: number;
  @IsOptional() @IsString() level?: string;
  @IsOptional() @IsString() theme?: string;
  @IsOptional() @IsString() q?: string;
}

export class CreateModuleDto {
  @IsString() code!: string;
  @IsString() name!: string;
  @IsNumber() ec!: number;
  @IsIn(['NLQF-5', 'NLQF-6']) level!: 'NLQF-5' | 'NLQF-6';
  @IsOptional() @IsString() theme?: string;
  // Accept either string or object { en?: string; nl?: string }
  @IsOptional() description?: LocalizedDescription;
  @IsOptional() @IsArray() keywords?: string[];
}

export class UpdateModuleDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsNumber() ec?: number;
  @IsOptional() @IsIn(['NLQF-5', 'NLQF-6']) level?: 'NLQF-5' | 'NLQF-6';
  @IsOptional() @IsString() theme?: string;
  // Accept either string or object { en?: string; nl?: string }
  @IsOptional() description?: LocalizedDescription;
  @IsOptional() @IsArray() keywords?: string[];
}