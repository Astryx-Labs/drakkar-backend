import { Injectable } from '@nestjs/common';
import { CreateIdmDto } from './dto/create-idm.dto';
import { UpdateIdmDto } from './dto/update-idm.dto';

@Injectable()
export class IdmService {
  create(createIdmDto: CreateIdmDto) {
    return 'This action adds a new idm';
  }

  findAll() {
    return `This action returns all idm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} idm`;
  }

  update(id: number, updateIdmDto: UpdateIdmDto) {
    return `This action updates a #${id} idm`;
  }

  remove(id: number) {
    return `This action removes a #${id} idm`;
  }
}
