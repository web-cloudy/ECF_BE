import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RolesGuard } from './auth/guards/roles.guard';
import cookieParser from 'cookie-parser';
import { get } from 'http';
import { writeFileSync, createWriteStream } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverUrl = "https://ecf-be.vercel.app/";
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.setGlobalPrefix("api");
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Express Capital Financing Software API Documentation')
    .setDescription('The ECF API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));

  await app.listen(process.env.PORT ?? 4000);

  if (process.env.NODE_ENV === 'development') {

    // write swagger ui files
    get(
      `${serverUrl}/swagger/swagger-ui-bundle.js`, function
      (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
      console.log(
        `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
      );
    });

    get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
      console.log(
        `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
      );
    });

    get(
      `${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
        );
        console.log(
          `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
        );
      });

    get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
      );
    });

  }

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
