import { PartialType } from '@nestjs/mapped-types';
import { CreateIdmDto } from './create-idm.dto';

export class UpdateIdmDto extends PartialType(CreateIdmDto) {}
