import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FormEntity } from '../entity/form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from '../interface/form.interface';
import { verifyJWT } from 'src/utils/jwt.handler';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormEntity)
    private formRepository: Repository<FormEntity>,
  ) {}

  async createFormAnswer(form: Form, token: string): Promise<Form> {
    const isValid = verifyJWT(token);
    if (isValid) {
      if (isValid.id === form.user.id) {
        const newForm: Form = await this.formRepository.save(form);
        return newForm;
      }
    }
  }

  async findAll(): Promise<Form[]> {
    const forms: Form[] = await this.formRepository.find();
    return forms;
  }

  async findById(id: number): Promise<Form> {
    const form: Form = await this.formRepository.findOneBy({
      id: id,
    });
    return form;
  }
}
