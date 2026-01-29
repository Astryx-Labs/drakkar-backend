import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IdmService } from './idm.service';
import { CreateIdmDto } from './dto/create-idm.dto';
import { UpdateIdmDto } from './dto/update-idm.dto';

@Controller({
  path: 'idm',
  version: '1',
})
export class IdmController {
  constructor(private readonly idmService: IdmService) {}
  // register
  // login
  // refresh
  // logout

  @Post()
  create(@Body() createIdmDto: CreateIdmDto) {
    return this.idmService.create(createIdmDto);
  }

  @Get()
  findAll() {
    return this.idmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.idmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdmDto: UpdateIdmDto) {
    return this.idmService.update(+id, updateIdmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.idmService.remove(+id);
  }
}
