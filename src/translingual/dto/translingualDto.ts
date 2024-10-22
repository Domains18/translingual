

import { IsString } from "class-validator";

export class translingualDto {
    @IsString()
    threadId: string;
    @IsString()
    message: string;
}
