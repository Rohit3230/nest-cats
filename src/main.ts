import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/middleware/http-exception.filter';
import { LoggingInterceptor } from './common/middleware/logging.interceptor';
import { TransformInterceptor } from './common/middleware/transform.interceptor';
import { TimeoutInterceptor } from './common/middleware/timeout.interceptor';
import { CacheInterceptor } from './common/middleware/cache.interceptor';
import { ErrorsInterceptor } from './common/middleware/errors.interceptor';

// async function bootstrap() {
//   // const app = await NestFactory.create(AppModule);
//   // await app.listen(3000);
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalFilters(new HttpExceptionFilter());
//   await app.listen(3000);
// }

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalInterceptors(new CacheInterceptor());
  app.useGlobalInterceptors(new ErrorsInterceptor());
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
} 

bootstrap();
