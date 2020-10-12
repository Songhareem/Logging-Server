
import { Client, RequestParams } from '@elastic/elasticsearch';

// Elasticsearch를 사용하기 위해 객체를 생성합니다.
const client = new Client({
    node: "http://localhost:9200"
});

export abstract class ElasticSearch<T> {

    protected readonly INDEX_NAME: string;

    constructor(indexName: string) {
        this.INDEX_NAME = indexName;
    }

    protected async requestElasticSearch(bodyData: RequestParams.Index) {
        
        // Elasticsearch 객체에서는 index 라는 메소드를 사용해 elasticsearch로 데이터를 보낼 수 있습니다.
        await client.index(bodyData);
    }

    public abstract async putLog(log: T): Promise<void>
}