import { RequestParams } from '@elastic/elasticsearch';
import { Service } from 'typedi';

import { ElasticSearch } from './elasticSearch';

const INDEX_NAME = "server_error_logs";

export interface IElasticSearchErrorLog {
    apiName: string;
    method: string;
    url: string;
    header: Object;
    message: string;
};

@Service()
export class ElasticSearchErrorLog extends ElasticSearch<IElasticSearchErrorLog> {

    constructor() {
        super(INDEX_NAME);
    }

    public async putLog(log: IElasticSearchErrorLog) {
        try {
            const bodyData: RequestParams.Index = {
                index: this.INDEX_NAME,
                body: {
                    ...log,
                    timestamp: new Date()
                }
            };

            await this.requestElasticSearch(bodyData);

            console.log("[SUCCESS]: ElasticSearchErrorLog putLog method");
        } catch(error) {
            console.log(`[ERROR]: ElasticSearchErrorLog putLog method, error-message=${error.message}`);
            return;
        }
    }
}