import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DsnpGraphEdgeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'MSA Id of the user represented by this graph edge', type: String, example: '3' })
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Block number when connection represented by this graph edge was created',
    type: Number,
    example: 12,
  })
  since: number;
}
