import {PrismaClient} from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}
// hot reload 때문에 globalThis사용 그 이유는 영향을 받지 않는다
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
