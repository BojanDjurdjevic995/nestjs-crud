import { Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateHelper } from '../helpers/date.helper';

@Injectable()
export class TaskService {
    private response: object = {'success' :  true, 'msg' : ''};
    constructor(
        @InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>, 
        private readonly timestamp: DateHelper) {}

    get() {
        return this.taskRepository.find();
    }

    single(id) {
        return this.taskRepository.findOne({ where : {id : id}});
    }

    create(data: object) {
        var task        = new TaskEntity();
        for (const key in data)
            task[key] = data[key];
        
        return this.taskRepository.save(task);
    }

    async update(data: object, id: number) {
        data['updated_at'] = this.timestamp.timeStamp();
        const response = await this.taskRepository.findOne(id).then((task) => {
            this.response['success'] = (task !== undefined) ? true : false;
            this.response['msg']     = (task !== undefined) ? 'Successfully update task!' : 'Task doesn\'t exist!';

            if (task !== undefined) 
                this.taskRepository.save({...data, id: Number(id)});

            return this.response
        });

        return response;
    }

    destroy(id: number) {
        return this.taskRepository.delete(id);
    }
}