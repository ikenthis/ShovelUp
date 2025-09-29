import { Injectable } from '@nestjs/common';
import { CreateProjectPhaseInput } from './dto/create-project-phase.input';
import { UpdateProjectPhaseInput } from './dto/update-project-phase.input';

@Injectable()
export class ProjectPhaseService {
  create(createProjectPhaseInput: CreateProjectPhaseInput) {
    return 'This action adds a new projectPhase';
  }

  findAll() {
    return `This action returns all projectPhase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectPhase`;
  }

  update(id: number, updateProjectPhaseInput: UpdateProjectPhaseInput) {
    return `This action updates a #${id} projectPhase`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectPhase`;
  }
}
