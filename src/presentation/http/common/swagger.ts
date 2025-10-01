import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


export function setupSwagger(app: INestApplication) {

    const config = new DocumentBuilder()
        .setTitle('anzuinfo-p')
        .setDescription('anzuinfo api document')
        .addTag('anzuinfo')
        .addBearerAuth()
        .build();
    app.enableCors({
        origin: [
            'https://p.eagate.573.jp',
            'http://localhost:3000',
            'http://localhost:3001',
            'https://juneh2633.ddns.net',
            'https://anzu-editor.vercel.app',
        ],
        methods: 'GET,POST',
        allowedHeaders: 'Content-Type,Authorization',
    });
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/docs', app, document);
}
