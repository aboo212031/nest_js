import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookmarkDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsNotEmpty()
    link: string 
}