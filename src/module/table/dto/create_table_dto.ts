import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTableDto {

    @IsString()
    name: string;
}
