
import { RequestParams } from '@elastic/elasticsearch';
import { ElasticSearch } from './elasticSearch';

const INDEX_NAME = "server_api_logs";

// type : 리터럴 타입에 사용
// interface : 오브젝트 타입에 사용
export interface IElasticSearchAPILog {
    apiName: string;
    method: string;
    url: string;
    header: Object;
    errorMessage?: string;      // 안넣으면 undefined
}

export class ElasticSearchAPILog extends ElasticSearch<IElasticSearchAPILog> {

    constructor() {
        super(INDEX_NAME);
    }

    public async putLog(log: IElasticSearchAPILog): Promise<void> {
        try {
            const bodyData: RequestParams.Index = {
                index: this.INDEX_NAME,
                body: {
                    ...log,
                    timestamp: new Date()
                }
            };

            await this.requestElasticSearch(bodyData);

            console.log("[SUCCESS]: ElasticSearchAPILog putLog method");
        } catch(error) {
            console.log(`[ERROR]: ElasticSearchAPILog putLog method, error-message=${error.message}`);
            return;
        }
    }
}