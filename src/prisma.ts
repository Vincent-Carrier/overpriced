import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()


export let colors: string[] = []
prisma.product.findMany({
    distinct: ['color'],
    select: { color: true },
}).then(products => colors = products.map(p => p.color));

