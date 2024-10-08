import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { ApiService } from './api.service';
import { HealthController, ScanControllerV1, SearchControllerV1, WebhookControllerV1 } from './controllers';
import { BlockchainModule } from '#content-watcher-lib/blockchain/blockchain.module';
import { CrawlerModule } from '#content-watcher-lib/crawler/crawler.module';
import { IPFSProcessorModule } from '#content-watcher-lib/ipfs/ipfs.module';
import { PubSubModule } from '#content-watcher-lib/pubsub/pubsub.module';
import { ScannerModule } from '#content-watcher-lib/scanner/scanner.module';
import { AppConfigModule } from '#content-watcher-lib/config/config.module';
import { AppConfigService } from '#content-watcher-lib/config/config.service';
import * as QueueConstants from '#content-watcher-lib';
import { QueueModule } from '#content-watcher-lib/queues/queue.module';
import { CacheModule } from '#content-watcher-lib/cache/cache.module';

@Module({
  imports: [
    AppConfigModule,
    ScheduleModule.forRoot(),
    BlockchainModule,
    ScannerModule,
    CrawlerModule,
    IPFSProcessorModule,
    PubSubModule,
    CacheModule.forRootAsync({
      useFactory: (configService: AppConfigService) => [
        { url: configService.redisUrl.toString(), keyPrefix: configService.cacheKeyPrefix },
      ],
      inject: [AppConfigService],
    }),
    QueueModule,

    // Bullboard UI
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
    BullBoardModule.forFeature(
      {
        name: QueueConstants.REQUEST_QUEUE_NAME,
        adapter: BullMQAdapter,
      },
      {
        name: QueueConstants.IPFS_QUEUE,
        adapter: BullMQAdapter,
      },
      {
        name: QueueConstants.BROADCAST_QUEUE_NAME,
        adapter: BullMQAdapter,
      },
      {
        name: QueueConstants.REPLY_QUEUE_NAME,
        adapter: BullMQAdapter,
      },
      {
        name: QueueConstants.REACTION_QUEUE_NAME,
        adapter: BullMQAdapter,
      },
      {
        name: QueueConstants.TOMBSTONE_QUEUE_NAME,
        adapter: BullMQAdapter,
      },
      {
        name: QueueConstants.PROFILE_QUEUE_NAME,
        adapter: BullMQAdapter,
      },
      {
        name: QueueConstants.UPDATE_QUEUE_NAME,
        adapter: BullMQAdapter,
      },
    ),
    EventEmitterModule.forRoot({
      // Use this instance throughout the application
      global: true,
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
  ],
  providers: [ApiService],
  // Controller order determines the order of display for docs
  // v[Desc first][ABC Second], Health, and then Dev only last
  controllers: [ScanControllerV1, SearchControllerV1, WebhookControllerV1, HealthController],
  exports: [ScheduleModule],
})
export class ApiModule {}
