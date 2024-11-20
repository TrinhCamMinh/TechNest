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
import { useNavigate } from "react-router-dom";
import { db } from "@/configs/firebase";
import { CATEGORY_COLLECTION_NAME } from "@/constants";

export const KeyboardFormStrategy: FormStrategy = {
    renderForm: (mode: string, data: Record<string, any>) => {
        const navigate = useNavigate();
        
        // Get the productId param from the URL.
        const { productId } = useParams();
        const isPrefilledDataFromDb = mode.toUpperCase() === FormMode.VIEW || mode.toUpperCase() === FormMode.UPDATE;
        const isEdit = mode.toUpperCase() === FormMode.CREATE || mode.toUpperCase() === FormMode.UPDATE;
        const isViewOnly = mode.toUpperCase() === FormMode.VIEW;

        const nameRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const priceRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const adaptRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const connectWayRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const connectDistanceRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const keyboardTypeRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const keycapsMaterialRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const otherFunctionalitiesRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const sizeRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const manufacturePlaceRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const brandOfRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const brandRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

        const [selectedCategory, setSelectedCategory] = useState<string>('');
        const [categiesList, setCategiesList] = useState<Array<Record<string, any>>>([]);

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
                    name: nameRef.current?.value,
                    category: categoryRef,
                    price: priceRef.current?.value,
                    adapt: adaptRef.current?.value,
                    connect_way: connectWayRef.current?.value,
                    connect_dinstance: connectDistanceRef.current?.value,
                    keyboard_type: keyboardTypeRef.current?.value,
                    keycaps_material: keycapsMaterialRef.current?.value,
                    other_functionalities: otherFunctionalitiesRef.current?.value,
                    size: sizeRef.current?.value,
                    manufacture_place: manufacturePlaceRef.current?.value,
                    brand_of: brandOfRef.current?.value,
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
                    name: nameRef.current?.value,
                    category: categoryRef,
                    price: priceRef.current?.value,
                    adapt: adaptRef.current?.value,
                    connect_way: connectWayRef.current?.value,
                    connect_dinstance: connectDistanceRef.current?.value,
                    keyboard_type: keyboardTypeRef.current?.value,
                    keycaps_material: keycapsMaterialRef.current?.value,
                    other_functionalities: otherFunctionalitiesRef.current?.value,
                    size: sizeRef.current?.value,
                    manufacture_place: manufacturePlaceRef.current?.value,
                    brand_of: brandOfRef.current?.value,
                    product_type: 'keyboard'
                };

                console.info("Inserting new keyboard product: " + JSON.stringify(newData));

                fireBaseObject.insertProduct(newData)
                    .then(() => toast.success('Insert product successfully'))
                    .then(() => setTimeout(() => navigate("/admin"), 1000))
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
            const docID: string = docSnap.id;
            setSelectedCategory(docID);
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

                <div className="h-full flex flex-col gap-8">
                    <label className="input input-bordered flex items-center gap-2">
                        Name
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.price : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? nameRef : undefined} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Price
                        <input type="number" defaultValue={isPrefilledDataFromDb ? data.price : 0} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? priceRef : undefined} />
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
                    <label className="input input-bordered flex items-center gap-2">
                        Adapt
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.adapt : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? adaptRef : undefined} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Connect Way
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.connect_way : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? connectWayRef : undefined} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Connect Distance
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.connect_dinstance : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? connectDistanceRef : undefined} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Keyborad Type
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.keyboard_type : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? keyboardTypeRef : undefined} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Keycaps Material
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.keycaps_material : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? keycapsMaterialRef : undefined} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Other functionalities
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.other_functionalities : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? otherFunctionalitiesRef : undefined} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Size
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.size : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? sizeRef : undefined} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Manufacture Place
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.manufacture_place : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? manufacturePlaceRef : undefined} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Brand of
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.brand_of : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? brandOfRef : undefined} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Brand
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.brand : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? brandRef : undefined} />
                    </label>
                </div>

                <div className="my-8 w-fit mx-auto">
                    {mode.toUpperCase() === FormMode.UPDATE && <button type="button" className="btn btn-success capitalize btn-wide" onClick={handleUpdateProduct}>save</button>}
                    {mode.toUpperCase() === FormMode.CREATE && <button type="button" className="btn btn-success capitalize btn-wide" onClick={handleInsertNewProduct}>create</button>}
                </div>
            </>
        )
    }
}