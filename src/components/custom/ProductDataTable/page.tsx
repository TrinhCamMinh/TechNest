import { useEffect, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { fireBaseObject } from "@/features/product-crud"
import { getDoc } from "firebase/firestore"

export default function ProductDataTable() {
    const [data, setData] = useState<any[]>([])

    const fetchListOfProducts = async () => {
        try {
            const listOfRawProductsData: any[] = await fireBaseObject.getProducts();
            const listOfProcessedProductsData: any[] = [];

            for (const item of listOfRawProductsData) {
                const categoryRef = item.category;
                const docSnap = await getDoc(categoryRef);
                const category: any = docSnap.data();
                listOfProcessedProductsData.push({ ...item, category: category.name });
            }

            setData(listOfProcessedProductsData);
        } catch (error) {
            const errorMessage = (error as Error).message
            throw new Error(errorMessage)
        }
    }

    useEffect(() => {
        fetchListOfProducts();
    }, [])

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
