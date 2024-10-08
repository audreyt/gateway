import { Module } from '@nestjs/common';
import { GraphMonitorService } from './graph.monitor.service';
import { CapacityCheckerService } from '#graph-lib/blockchain/capacity-checker.service';
import { BlockchainModule } from '#graph-lib/blockchain';
import { GraphStateManager } from '#graph-lib/services/graph-state-manager';

@Module({
  imports: [BlockchainModule],
  providers: [GraphMonitorService, GraphStateManager, CapacityCheckerService],
  exports: [],
})
export class GraphNotifierModule {}
