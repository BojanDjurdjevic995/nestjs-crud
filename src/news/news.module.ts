import { Module } from '@nestjs/common';
import { SlugHelper } from '../helpers/slug.helper';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from './news.entity';
import { DateHelper } from 'src/helpers/date.helper';

@Module({
    imports: [TypeOrmModule.forFeature([NewsEntity])],
    controllers: [NewsController],
    providers: [NewsService, SlugHelper, DateHelper],
    exports: [TypeOrmModule]
})

export class NewsModule {}