/* eslint-disable @typescript-eslint/ban-ts-comment */
import fastify from "fastify";
import fastifyCookie from "fastify-cookie";
import { NestFactory } from "@nestjs/core";
import {
    NestFastifyApplication,
    FastifyAdapter,
} from "@nestjs/platform-fastify";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "../app/app.module";
import { AllExceptionsFilter } from "../utils/filters/exception.filter";

// Creating fastify instance, So we can test api if needed
export const server = fastify({
    disableRequestLogging: true,
    // For trusting the proxy and fixing the user ip in the request
    trustProxy: true,
})
    .register(fastifyCookie)
    .addHook("onRequest", (req, _, done) => {
        console.log(`onRequest:`, req.cookies);

        done();
    })
    .addHook("onResponse", (req, _, done) => {
        console.log(`onRequest:`, req.cookies);

        done();
    });

export async function APP(): Promise<NestFastifyApplication> {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        // @ts-expect-error
        new FastifyAdapter(server)
    );

    const httpAdapter = app.getHttpAdapter();

    app.useGlobalPipes(
        new ValidationPipe({
            // Disabling auto transforming of json payload
            // If you want to convert type, use class-transformer
            transform: false,
            // For not allowing any unexpected payload
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    )
        // Handling Errors globally overriding nestjs inbuilt ExceptionHandler
        .useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    return app;
}
