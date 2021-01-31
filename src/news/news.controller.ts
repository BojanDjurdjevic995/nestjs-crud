import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get()
    getAllNews(): object {        
        return this.newsService.getNews();
    }

    @Get(':id')
    getSingleNews(@Param('id') id: number): object {
        return this.newsService.getSingleNews(id);
    }

    @Post()
    createNews(@Body() body: object): object {
        return this.newsService.createNews(body);
    }

    @Put(':id')
    updateNews(@Body() body: object, @Param('id') id: number): object {
        return this.newsService.updateNews(body, id);
    }

    @Delete(':id')
    deleteNews(@Param('id') id: number): object {
        return this.newsService.deleteNews(id);
    }
}