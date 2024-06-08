import { DescriptionDetails, DescriptionList, DescriptionTerm } from "@/components/description-list"
import { prisma } from "@/prisma"

async function getProduct(slug: string) {
    const product = await prisma.product.findFirstOrThrow({
        where: { slug }, select: {
            name: true,
            description: true,
            price: true,
            image: true,
        }
    })
    return product
}

export default async function ProductPage({ params, searchParams }: any) {
    const product = await getProduct(params.slug)

    return (
        <main className="px-12 py-16 max-w-screen-xl mx-auto">
            <h1 className="text-center mb-8 text-4xl font-bold tracking-tight">
                <span className="text-2xl font-semibold">BIG V's </span>
                <em className="uppercase">Overpriced Men's Shirts</em>
            </h1>
            <div className="flex flex-col-reverse sm:flex-row gap-12">
                <div className="min-w-56">
                    <img src={product.image} alt="" className="h-76 w-full shadow-md object-cover" />
                </div>
                <div className="max-w-prose">
                    <h2 className="text-2xl/6 font-bold text-gray-800 mb-4">{product.name}</h2>
                    <p className="text-sm leading-relaxed">{product.description}</p>
                    <p className="text-sm text-gray-600 my-8 text-right">${product.price.toFixed(2)}</p>
                    {Object.keys(searchParams) && (
                        <DescriptionList>
                            {searchParams.maxPrice && <>
                                <DescriptionTerm>Max Price</DescriptionTerm>
                                <DescriptionDetails>${searchParams.maxPrice}</DescriptionDetails>
                            </>}
                            {searchParams.color && <>
                                <DescriptionTerm>Color</DescriptionTerm>
                                <DescriptionDetails>{searchParams.color}</DescriptionDetails>
                            </>}
                            {searchParams.hipstery && <>
                                <DescriptionTerm>Hipster</DescriptionTerm>
                                <DescriptionDetails>{searchParams.hipstery ? 'Yes' : 'No'}</DescriptionDetails>
                            </>}
                        </DescriptionList>
                    )}
                </div>
            </div>
        </main>
    )
}

