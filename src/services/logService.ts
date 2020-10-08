
import { Service } from 'typedi';

import { ElasticSearchAPILog, IElasticSearchAPILog } from '../libries/elasticSearchAPILog';
import { ElasticSearchErrorLog, IElasticSearchErrorLog } from '../libries/elasticSearchErrorLog';

@Service()
export class LogService {
    constructor(
        private elasticSearchAPILog: ElasticSearchAPILog,
        private elasticSearchErrorLog: ElasticSearchErrorLog
    ) {}
}