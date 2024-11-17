import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { db } from "@/configs/firebase";
import { CATEGORY_COLLECTION_NAME } from "@/constants";
import { fireBaseObject } from "@/features/product-crud";
import { FormMode, FormStrategy } from "@/interfaces";
import { SelectTrigger } from "@radix-ui/react-select";
import { DocumentReference, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

export const TelevisionFormStrategy: FormStrategy = {
    renderForm: function (mode: string, data: Record<string, any>): JSX.Element {
        // Get the productId param from the URL.
        const { productId } = useParams();
        const isPrefilledDataFromDb = mode.toUpperCase() === FormMode.VIEW || mode.toUpperCase() === FormMode.UPDATE;
        const isEdit = mode.toUpperCase() === FormMode.CREATE || mode.toUpperCase() === FormMode.UPDATE;
        const isViewOnly = mode.toUpperCase() === FormMode.VIEW;

        const IdRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const typeOfTelevisionRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const screenSizeRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const resolutionRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const typeOfScreenRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const osRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const baseMaterialRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const bezelMaterialRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const manufacturePlaceRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const launchYearRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const displayTechnologyRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const processerRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const refreshRateRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const soundTechnologyRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const numberOfSpeakersRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const connectWithSpeakersRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const internetConnectionRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const wirelessConnectionRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const usbRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const soundDisplayPortRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const soundExportPortRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const standSizeRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const standWeightRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const withoutStandSizeRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const withoutStandWeightRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const brandRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const priceRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

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
                    id: IdRef.current?.value,
                    category: categoryRef,
                    type_of_television: typeOfTelevisionRef.current?.value,
                    screen_size: screenSizeRef.current?.value,
                    resolution: resolutionRef.current?.value,
                    type_of_screen: typeOfScreenRef.current?.value,
                    os: osRef.current?.value,
                    base_material: baseMaterialRef.current?.value,
                    bezel_material: bezelMaterialRef.current?.value,
                    manufacture_place: manufacturePlaceRef.current?.value,
                    launch_year: launchYearRef.current?.value,
                    display_technology: displayTechnologyRef.current?.value,
                    processer: processerRef.current?.value,
                    refresh_rate: refreshRateRef.current?.value,
                    sound_technology: soundTechnologyRef.current?.value,
                    number_of_speakers: numberOfSpeakersRef.current?.value,
                    connect_with_speakers: connectWithSpeakersRef.current?.value,
                    internet_connection: internetConnectionRef.current?.value,
                    wireless_connection: wirelessConnectionRef.current?.value,
                    usb: usbRef.current?.value,
                    sound_display_port: soundDisplayPortRef.current?.value,
                    sound_export_port: soundExportPortRef.current?.value,
                    stand_size: standSizeRef.current?.value,
                    stand_weight: standWeightRef.current?.value,
                    without_stand_size: withoutStandSizeRef.current?.value,
                    without_stand_weight: withoutStandWeightRef.current?.value,
                    brand: brandRef.current?.value,
                    price: priceRef.current?.value
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
                    id: IdRef.current?.value,
                    category: categoryRef,
                    type_of_television: typeOfTelevisionRef.current?.value,
                    screen_size: screenSizeRef.current?.value,
                    resolution: resolutionRef.current?.value,
                    type_of_screen: typeOfScreenRef.current?.value,
                    os: osRef.current?.value,
                    base_material: baseMaterialRef.current?.value,
                    bezel_material: bezelMaterialRef.current?.value,
                    manufacture_place: manufacturePlaceRef.current?.value,
                    launch_year: launchYearRef.current?.value,
                    display_technology: displayTechnologyRef.current?.value,
                    processer: processerRef.current?.value,
                    refresh_rate: refreshRateRef.current?.value,
                    sound_technology: soundTechnologyRef.current?.value,
                    number_of_speakers: numberOfSpeakersRef.current?.value,
                    connect_with_speakers: connectWithSpeakersRef.current?.value,
                    internet_connection: internetConnectionRef.current?.value,
                    wireless_connection: wirelessConnectionRef.current?.value,
                    usb: usbRef.current?.value,
                    sound_display_port: soundDisplayPortRef.current?.value,
                    sound_export_port: soundExportPortRef.current?.value,
                    stand_size: standSizeRef.current?.value,
                    stand_weight: standWeightRef.current?.value,
                    without_stand_size: withoutStandSizeRef.current?.value,
                    without_stand_weight: withoutStandWeightRef.current?.value,
                    brand: brandRef.current?.value,
                    price: priceRef.current?.value,
                    product_type: 'television'
                };

                console.info("Inserting new television product: " + JSON.stringify(newData));

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
                <form className="h-full flex flex-col gap-8">
                    <label className="input input-bordered flex items-center gap-2">
                        Id
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.id : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? IdRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Type Of Televsion
                        <input type="number" defaultValue={isPrefilledDataFromDb ? data.type_of_television : 0} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? typeOfTelevisionRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Screen Size
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.screen_size : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? screenSizeRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Resolution
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.resolution : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? resolutionRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Type of Screen
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.type_of_screen : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? typeOfScreenRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        OS
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.os : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? osRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Base Material
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.base_material : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? baseMaterialRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Bezel Material
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.bezel_material : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? bezelMaterialRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Manufacture Place
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.manufacture_place : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? manufacturePlaceRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Launch Year
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.launch_year : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? launchYearRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Display Technology
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.display_technology : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? displayTechnologyRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Processer
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.processer : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? processerRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Refresh Rate
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.refresh_rate : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? refreshRateRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Sound Technology
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.sound_technology : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? soundTechnologyRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Number of Speakers
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.number_of_speakers : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? numberOfSpeakersRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Connect with Speakers
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.connect_with_speakers : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? connectWithSpeakersRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Internet Connection
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.internet_connection : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? internetConnectionRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Wireless Connection
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.wireless_connection : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? wirelessConnectionRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        USB
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.usb : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? usbRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Sound Display Port
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.sound_display_port : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? soundDisplayPortRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Sound Export Port
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.sound_export_port : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? soundExportPortRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Stand Size
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.stand_size : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? standSizeRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Stand Weight
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.stand_weight : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? standWeightRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Without Stand size
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.without_stand_size : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? withoutStandSizeRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Without Stand Weight
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.without_stand_weight : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? withoutStandWeightRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Brand
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.brand : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? brandRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Price
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.price : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? priceRef : undefined} />
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