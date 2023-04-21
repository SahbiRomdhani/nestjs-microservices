/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";

export class createPostDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description:string;


}
