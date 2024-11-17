import { FormMode, FormStrategy } from "@/interfaces";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { fireBaseObject } from "@/features/product-crud";
import { useParams } from 'react-router-dom';
import { DocumentReference, getDoc, collection, getDocs, doc } from "firebase/firestore";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { db } from "@/configs/firebase";
import { CATEGORY_COLLECTION_NAME } from "@/constants";

export const KeyboardFormStrategy: FormStrategy = {
    renderForm: (mode: string, data: Record<string, any>) => {
        // Get the productId param from the URL.
        const { productId } = useParams();
        const isPrefilledDataFromDb = mode.toUpperCase() === FormMode.VIEW || mode.toUpperCase() === FormMode.UPDATE;
        const isEdit = mode.toUpperCase() === FormMode.CREATE || mode.toUpperCase() === FormMode.UPDATE;
        const isViewOnly = mode.toUpperCase() === FormMode.VIEW;

        const idRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const priceRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const adaptRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

        const [selectedCategory, setSelectedCategory] = useState<string>('');
        const [categiesList, setCategiesList] = useState<Array<Record<string, any>>>([]);
        const [populatedCategory, setPopulatedCategory] = useState<Record<string, any>>({});

        const handleGetDocumentRef = (collectionName: string, documentId: string): DocumentReference => {
            return doc(db, collectionName, documentId);
        }

        const handleUpdateProduct = async () => {
            try {
                if (!productId) {
                    toast.error("Invalid product id", {
                        description: productId
                    })
                    return;
                }

                const categoryRef = handleGetDocumentRef(CATEGORY_COLLECTION_NAME, selectedCategory);

                const newData = {
                    id: idRef.current?.value,
                    category: categoryRef,
                    price: priceRef.current?.value,
                    adapt: adaptRef.current?.value,
                };

                console.info(`Updating ${productId}`, newData);

                fireBaseObject.updateProduct(productId, newData)
                    .then(() => toast.success('Update product successfully'))
                    .catch((error: Error) => toast.error(error.message))

            } catch (error) {
                const errorMessage = (error as Error).message;
                toast.error(`Error while create a new keyboard product`, {
                    description: errorMessage
                })
            }
        }

        const handleInsertNewProduct = () => {
            try {
                const categoryRef = handleGetDocumentRef(CATEGORY_COLLECTION_NAME, selectedCategory);

                const newData = {
                    id: idRef.current?.value,
                    category: categoryRef,
                    price: priceRef.current?.value,
                    adapt: adaptRef.current?.value,
                };

                fireBaseObject.insertProduct(newData)
                    .then(() => toast.success('Insert product successfully'))
                    .catch((error: Error) => toast.error(error.message))
            } catch (e) {
                const errorMessage = (e as Error).message;
                toast.error(`Error while create a new keyboard product`, {
                    description: errorMessage
                })
            }
        }

        const handleFetchAllCategories = async () => {
            try {
                const categoryDataList: Record<string, any>[] = [];
                const querySnapshot = await getDocs(collection(db, CATEGORY_COLLECTION_NAME));
                querySnapshot.forEach((doc) => {
                    const categoryRef: DocumentReference = doc.ref;
                    const categoryData: Record<string, any> = doc.data();
                    const categoryID: string = doc.id;
                    const obj = {
                        data: categoryData,
                        ref: categoryRef,
                        id: categoryID
                    }
                    categoryDataList.push(obj);
                });
                setCategiesList(categoryDataList);
            } catch (error) {
                const errorMessage: string = (error as Error).message;
                toast.error("Error while fetching category data", {
                    description: errorMessage
                })
            }
        }

        const handlePopulateCategoryRef = async (categoryRef: DocumentReference) => {
            const docSnap = await getDoc(categoryRef);
            const populatedData = docSnap.data();
            const docID: string = docSnap.id;

            const obj = {
                ...populatedData,
                id: docID
            }

            setSelectedCategory(docID);
            setPopulatedCategory(obj);
        }

        useEffect(() => {
            handleFetchAllCategories();
        }, [])

        useEffect(() => {
            const categoryRef: DocumentReference = data.category
            handlePopulateCategoryRef(categoryRef);
        }, [data])

        return (
            <>
                <Toaster richColors position="top-right" />
                <form className="h-full flex flex-col gap-8">
                    <label className="input input-bordered flex items-center gap-2">
                        Id
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.id : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? idRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Price
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.price : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? priceRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Adapt
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.adapt : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? adaptRef : undefined} />
                    </label>

                    <Select
                        disabled={isViewOnly}
                        value={isPrefilledDataFromDb ? selectedCategory : ''}
                        onValueChange={(selectedOption: string) => setSelectedCategory(selectedOption)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                categiesList.map((category: Record<string, any>) => {
                                    return (
                                        <SelectItem key={category.id} value={category.id}>{category.data.name}</SelectItem>
                                    )
                                })
                            }
                        </SelectContent>
                    </Select>

                    {mode.toUpperCase() === FormMode.UPDATE && <button type="button" className="btn btn-success capitalize" onClick={handleUpdateProduct}>save</button>}
                    {mode.toUpperCase() === FormMode.CREATE && <button type="button" className="btn btn-success capitalize" onClick={handleInsertNewProduct}>create</button>}
                </form>
            </>
        )
    }
}