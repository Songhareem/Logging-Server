import { Client } from '@elastic/elasticsearch';
import Koa from 'koa';
import BodyParser from 'koa-bodyparser';
import kcors from 'koa-cors';
import Router from 'koa-router';
import Container from 'typedi';

import { Routes } from './controllers';

// Elasticsearch를 사용하기 위해 객체를 생성합니다.
const client = new Client({
  node: "http://localhost:9200/"
});

class Server {
  private app: Koa;
  private router: Router;

  constructor() {
    this.app = new Koa();
    this.router = new Router();

    this.setMiddlewares();
    this.setRoutes();
  }

  private setMiddlewares() {
    this.app.use(kcors());
    this.app.use(BodyParser());
  }

  private setRoutes() {
    this.router.use("/api", Container.get(Routes).getRoutes());

    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }

  public async run(port: string = "4000"): Promise<void> {
    this.app.listen(port);

    console.log(`Server application is up and running on port ${port}`);

    // Elasticsearch 객체에서는 index 라는 메소드를 사용해 elasticsearch로 데이터를 보낼 수 있습니다.
    await client.index({
      index: "boot-logs",
      body: {
        message: `Server application is up and running on port ${port}`,
        timestamp: new Date()
      }
    });
  }
}

export default Server;