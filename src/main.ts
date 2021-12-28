import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Backend приложения QRFIT')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('qrfit-tv')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    console.log(
        'короче подытожим деплой проверка последняя братишка',
        process.env.BACK_PORT,
    )
    await app.listen(process.env.BACK_PORT, () => {
        console.log('server started on port : ', process.env.BACK_PORT)
    })
}
bootstrap()
