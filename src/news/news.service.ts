import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';
import { SlugHelper } from "../helpers/slug.helper";
import { DateHelper } from 'src/helpers/date.helper';

@Injectable()
export class NewsService {
    protected readonly _select;
    constructor(
        @InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>, 
        private readonly slug: SlugHelper,
        private readonly date: DateHelper) {
        this._select = ['id', 'title', 'slug', 'lang', 'content'];
    }
    
    
    getNews(): Promise<NewsEntity[]> {
        return this.newsRepository.find({ select : this._select });
    }

    getSingleNews(id): Promise<NewsEntity[]> {
        return this.newsRepository.find({  select : this._select, where : {id : id}});
    }

    createNews(data: object) {
        const news   = new NewsEntity();
        news.title   = data['title'];
        news.content = data['content'];
        news.lang    = data['lang'];
        news.slug    = this.slug.make(data['title']);
        return this.newsRepository.save(news);
    }

    async updateNews(data: object, id: number) {
        const response = await this.newsRepository.findOne(id).then((news) => {
            if (news !== undefined) {
                data['slug']  = this.slug.make(data['title']);
                data['updated_at']  = this.date.timeStamp();
                this.newsRepository.save({...data, id: Number(id)});
                return {'success' : true, 'msg' : 'Successfully update news!'};
            }
            throw new HttpException('News doesn\'t exist!', 404);
        });
        return response;
    }

    deleteNews(id: number) {
        return this.newsRepository.delete(id);
    }
}