import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DsnpGraphEdgeDto } from './dsnp-graph-edge.dto';

export class UserGraphDto {
  @ApiProperty({
    description: 'MSA Id that is the owner of the graph represented by the graph edges in this object',
    type: String,
    example: '2',
  })
  dsnpId: string;

  @ApiPropertyOptional({
    description: 'Optional array of graph edges in the specific user graph represented by this object',
    type: [DsnpGraphEdgeDto],
  })
  dsnpGraphEdges?: DsnpGraphEdgeDto[];
}
