import { Module } from '@nestjs/common';
import { FormController } from './controller/form.controller';
import { FormService } from './service/form.service';
import { FormEntity } from './entity/form.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity])],
  exports: [TypeOrmModule],
  controllers: [FormController],
  providers: [FormService],
})
export class FormAnswerModule {}
