import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FormService } from '../service/form.service';
import { Form } from '../interface/form.interface';

@Controller('forms')
export class FormController {
  constructor(private formService: FormService) {}

  @Post('/')
  @HttpCode(201)
  async createFormResponse(
    @Body() form: Form,
    @Headers('Authorization') token: string,
  ): Promise<Form> {
    try {
      const newForm: Form = await this.formService.createFormAnswer(
        form,
        token,
      );
      // res.status(201).send(newForm);
      return newForm;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error in the request',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get('/')
  @HttpCode(200)
  async findAll(): Promise<Form[]> {
    try {
      const forms = await this.formService.findAll();
      return forms;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error in the request',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get('/id/:id')
  @HttpCode(200)
  async findById(@Param('id') id: number): Promise<Form> {
    try {
      // res.status(201).send(newForm);
      return this.formService.findById(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error in the request',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
