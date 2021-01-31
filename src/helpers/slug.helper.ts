import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugHelper {
    make(title) {
        title = title.replace(/\s/g, '-');
        title = title.toLowerCase();
        return title;
    }
}