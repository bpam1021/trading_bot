import { Module, HttpModule } from '@nestjs/common';

import { SocketGateway } from './socket.gateway';

@Module({
  providers: [SocketGateway],
  exports: [],
  imports: [],
})
export class SocketModule {}
