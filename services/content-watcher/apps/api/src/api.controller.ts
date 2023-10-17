import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, ParseFilePipeBuilder, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ApiService } from './api.service';
import {
  AnnouncementTypeDto,
  AssetIncludedRequestDto,
  BroadcastDto,
  DSNP_VALID_MIME_TYPES,
  DsnpUserIdParam,
  ProfileDto,
  ReactionDto,
  ReplyDto,
  TombstoneDto,
  UpdateDto,
  ResetScannerDto,
} from '../../../libs/common/src';
import { IChainWatchOptionsDto } from '../../../libs/common/src/dtos/chain.watch.dto';

@Controller('api')
export class ApiController {
  private readonly logger: Logger;

  constructor(private apiService: ApiService) {
    this.logger = new Logger(this.constructor.name);
  }

  // eslint-disable-next-line class-methods-use-this
  @Get('health')
  health() {
    return {
      status: HttpStatus.OK,
    };
  }

  @Post('resetScanner')
  @ApiBody({
    description: 'blockNumber',
    type: ResetScannerDto,
  })
  resetScanner(@Body() resetScannerDto: ResetScannerDto) {
    return this.apiService.setLastSeenBlockNumber(BigInt(resetScannerDto.blockNumber ?? 0n));
  }

  @Post('setWatchOptions')
  @ApiBody({
    description: 'watchOptions: Filter contents by schemaIds and/or dsnpIds',
    type: IChainWatchOptionsDto,
  })
  setWatchOptions(@Body() watchOptions: IChainWatchOptionsDto) {
    return this.apiService.setWatchOptions(watchOptions);
  }

  @Post('pauseScanner')
  pauseScanner() {
    return this.apiService.pauseScanner();
  }

  @Post('startScanner')
  startScanner() {
    return this.apiService.resumeScanner();
  }
}
