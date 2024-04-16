/*
https://docs.nestjs.com/modules
*/
import '@frequency-chain/api-augment';

import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [BlockchainService],
  exports: [BlockchainService],
})
export class BlockchainModule {}
