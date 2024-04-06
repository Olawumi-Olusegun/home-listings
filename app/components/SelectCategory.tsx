"use client"

import { Card, CardHeader } from "@/components/ui/card"
import { categoryItems } from "../lib/categoryItems"
import Image from "next/image"
import { useState } from "react"


export const SelectCategory = () => {

    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 gap-8 mt-10 w-full lg:w-3/5 mx-auto mb-36">
        <input type="hidden" name="categoryName" value={selectedCategory as string} hidden />
        {
            categoryItems.map((item) => (
                <div className="cursor-pointer" key={item.id}>
                    <Card onClick={() => setSelectedCategory(item.name)} className={selectedCategory === item.name ? "border-primary" : ""}>
                        <CardHeader>
                            <Image src={item.imageUrl} alt={item.name} height={32} width={32} className="w-8 h-8" />
                          <h3 className="font-medium">{item.title}</h3>
                        </CardHeader>
                    </Card>
                </div>
            ))
        }
    </div>
}