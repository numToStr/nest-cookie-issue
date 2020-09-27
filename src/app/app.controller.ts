import { Controller, Get, Req, Res } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { isProd } from "../config/keys";

@Controller()
export class AppController {
    @Get("/set-cookie")
    async setCookie(@Res() res: FastifyReply): Promise<void> {
        await res
            .setCookie("hello", "world", {
                path: "/",
                secure: isProd,
                httpOnly: true,
                sameSite: "strict",
            })
            .send("OK");
    }

    @Get("/get-cookie")
    getCookie(@Req() req: FastifyRequest): unknown {
        return req.cookies;
    }

    @Get("/boom")
    boom(): string {
        return "I am boom";
    }
}
