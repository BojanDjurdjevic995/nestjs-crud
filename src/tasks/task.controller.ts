import { Controller, Get, Post, Body, Put, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    all(): object {
        return this.taskService.get();
    }

    @Get(':id')
    show(@Param('id') id: number): object {
        return this.taskService.single(id);
    }

    @Post()
    create(@Body() body: object): object {
        return this.taskService.create(body);
    }

    @Put(':id')
    async update(
        @Body() body: object, 
        @Param('id') id: number, 
        @Res() res: Response): Promise<object> {
        var response =  await this.taskService.update(body, id);
        var code = response['success'] ? 200 : 500;
        
        return res.status(code).json(response);
    }

    @Delete(':id')
    destroy(@Param('id') id: number): object {
        return this.taskService.destroy(id);
    }
}