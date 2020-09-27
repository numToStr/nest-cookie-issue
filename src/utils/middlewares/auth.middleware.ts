import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(
        req: FastifyRequest & { USER: unknown },
        _: FastifyReply,
        next: () => void
    ): void {
        const { cookies } = req;

        // This is undefined, which should not be
        console.log(`Auth Middleware:`, cookies);

        if (!cookies) {
            throw new UnauthorizedException(
                "Unauthorized Access! Please login."
            );
        }

        next();
    }
}
