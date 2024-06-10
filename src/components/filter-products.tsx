"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/button";
import { Field, Fieldset, Label } from "@/components/fieldset";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Radio, RadioField, RadioGroup } from "./radio";

export default function FilterProducts({ filter, colorOptions }: { filter?: any, colorOptions: string[] }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    function filterProducts(formData: FormData) {
        const obj = Object.fromEntries(formData) as Record<string, string>
        for (const k in obj) if (!obj[k]) delete obj[k]
        const searchParams = new URLSearchParams(obj)
        router.push(`/?${searchParams}`)
    }

    return (
        <form action={filterProducts}>
            <Fieldset className="flex flex-col gap-y-4">
                <Field>
                    <Label htmlFor="maxPrice">Max Price</Label>
                    <Input defaultValue={filter?.maxPrice} name="maxPrice" type="number" min="0" />
                </Field>
                <Field>
                    <Label htmlFor="color">Color</Label>
                    <Select defaultValue={filter?.color} name='color'>
                        <option key="" defaultChecked />
                        {colorOptions.map(color => <option key={color}>{color}</option>)}
                    </Select>
                </Field>
                <Field>
                    <Label htmlFor="hipstery">Hipster</Label>
                    <RadioGroup name="hipstery" defaultValue={filter?.hipstery}>
                        <RadioField>
                            <Radio value="true" />
                            <Label>Yes</Label>
                        </RadioField>
                        <RadioField>
                            <Radio value="false" />
                            <Label>No</Label>
                        </RadioField>
                        <RadioField>
                            {/** @ts-ignore **/}
                            <Radio />
                            <Label>Don't care</Label>
                        </RadioField>
                    </RadioGroup>
                </Field>
            </Fieldset>
            <Button type="submit" className="mt-8 cursor-pointer w-full">Filter</Button>
            <Button plain disabled={!searchParams.size} className="mt-2 cursor-pointer w-full disabled:text-gray-500" onClick={() => router.push('/')}>Clear Filter</Button>
        </form>
    )
}
