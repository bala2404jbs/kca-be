import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Root health check' })
  getRoot() {
    return { status: 'ok' };
  }

  @Get('health')
  @ApiOperation({ summary: 'System health check ping' })
  getHealth() {
    return this.appService.getHealth();
  }
}
