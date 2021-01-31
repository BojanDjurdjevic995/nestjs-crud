import { Injectable } from '@nestjs/common';

@Injectable()
export class DateHelper {
    timeStamp() {
        var d = new Date();

        var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

        return date + ' ' + time;
    }
}