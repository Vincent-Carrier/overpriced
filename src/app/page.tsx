import FilterProducts from '@/components/filter-products'
import { prisma } from '@/prisma'
import { Prisma } from '@prisma/client'
import Link from 'next/link'

type ProductFilter = { maxPrice?: string; color?: string; hipstery: string }

async function getProducts(filter?: ProductFilter) {
    const products = await prisma.product.findMany({
        select: { name: true, slug: true, price: true, thumbnail: true },
        where: {
            price: filter?.maxPrice && { lte: Number(filter.maxPrice) },
            color: filter?.color && { equals: filter.color },
            // @ts-ignore
            hipstery: filter?.hipstery && { equals: filter.hipstery == 'true' ? true : false },
        },
    })
    return products
}

let allColors: string[]
async function getAllColors() {
    if (allColors) return allColors

    const products = await prisma.product.findMany({
        select: { color: true },
        distinct: ['color'],
    })
    allColors = products.map(p => p.color)
    return allColors
}

export default async function Home({ searchParams }: { searchParams: ProductFilter }) {
    const products = await getProducts(searchParams)
    const allColors = await getAllColors()

    return (
        <main className="px-12 py-16 max-w-screen-xl mx-auto">
            <h1 className="text-center mb-8 text-4xl font-bold tracking-tight">
                <span className="text-2xl font-semibold">BIG V's </span>
                <em className="uppercase">Overpriced Men's Shirts</em>
            </h1>
            <div className="flex flex-col-reverse sm:flex-row gap-8">
                <aside className="w-56 h-min shadow-sm max-sm:w-full bg-zinc-100 px-4 py-6">
                    <FilterProducts colorOptions={allColors} filter={searchParams} />
                </aside>
                {products.length === 0 ? (
                    <p className="w-full text-center mt-24">No product matched your filters</p>
                ) : (
                    <ul className="flex flex-wrap justify-start gap-4 w-full mx-auto">
                        {products.map(product => (
                            <ProductCard product={product} filter={searchParams} />
                        ))}
                    </ul>
                )}
            </div>
        </main>
    )
}

type Product = Prisma.PromiseReturnType<typeof getProducts>[number]

function ProductCard({ product, filter }: { product: Product; filter: ProductFilter }) {
    return (
        <li key={product.slug} className="bg-white shadow-sm w-56 h-96">
            <Link href={`/product/${product.slug}?${new URLSearchParams(filter)}`}>
                <img src={product.thumbnail} alt="" className="h-76 w-full object-cover" />
                <div className="px-2 py-2 flex flex-col">
                    <p className="mb-1 h-10 font-semibold text-gray-700 leading-tight tracking-tight">
                        {product.name}
                    </p>
                    <p className="text-sm text-gray-600 self-end">${product.price.toFixed(2)}</p>
                </div>
            </Link>
        </li>
    )
}
