import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { FormAnswerModule } from './form-answer/form-answer.module';
import { FormEntity } from './form-answer/entity/form.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [UserEntity, FormEntity],
    }),
    UserModule,
    FormAnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
