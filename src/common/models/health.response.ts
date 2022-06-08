import { ApiProperty } from '@nestjs/swagger';

export class HealthResponse {
  @ApiProperty({ description: 'The api server health status. Always true.' })
  status: boolean;

  constructor(status = true) {
    this.status = status;
  }
}
