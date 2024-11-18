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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export const LaptopFormStrategy: FormStrategy = {
    renderForm: function (mode: string, data: Record<string, any>): JSX.Element {
        // Get the productId param from the URL.
        const { productId } = useParams();
        const isPrefilledDataFromDb = mode.toUpperCase() === FormMode.VIEW || mode.toUpperCase() === FormMode.UPDATE;
        const isEdit = mode.toUpperCase() === FormMode.CREATE || mode.toUpperCase() === FormMode.UPDATE;
        const isViewOnly = mode.toUpperCase() === FormMode.VIEW;

        const IdRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const cpuProcosserRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const numberOfProcesserRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const numberOfProcesserCoresRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const numberOfProcesserThreadRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const cpuSpeedRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const cpuSpeedMaximumRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const bufferMemoryRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const ramRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const ramTypeRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const busRamSpeedRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const ramSupportRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const hardDiskRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const screenSizeRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const screenResolutionRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const screenRefreshRateRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const colorCoverageRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const screenTechnologyRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const soundCardRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const soundTechnologyRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const communicatePortRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const wirelessConnectRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const webcamRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const otherFunctionalitiesRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const keyboardLedRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const sizeRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const weightRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const materialRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
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
                    cpu_processer: cpuProcosserRef.current?.value,
                    number_of_processer: numberOfProcesserRef.current?.value,
                    number_of_processer_cores: numberOfProcesserCoresRef.current?.value,
                    number_of_processer_thread: numberOfProcesserThreadRef.current?.value,
                    cpu_speed: cpuSpeedRef.current?.value,
                    cpu_speed_maximum: cpuSpeedMaximumRef.current?.value,
                    buffer_memory: bufferMemoryRef.current?.value,
                    ram: ramRef.current?.value,
                    ram_type: ramTypeRef.current?.value,
                    bus_ram_speed: busRamSpeedRef.current?.value,
                    ram_support: ramSupportRef.current?.value,
                    hard_disk: hardDiskRef.current?.value,
                    screen_size: screenSizeRef.current?.value,
                    screen_resolution: screenResolutionRef.current?.value,
                    screen_refresh_rate: screenRefreshRateRef.current?.value,
                    color_coverage: colorCoverageRef.current?.value,
                    screen_technology: screenTechnologyRef.current?.value,
                    sound_card: soundCardRef.current?.value,
                    sound_technology: soundTechnologyRef.current?.value,
                    communicate_port: communicatePortRef.current?.value,
                    wireless_connect: wirelessConnectRef.current?.value,
                    webcam: webcamRef.current?.value,
                    other_functionalities: otherFunctionalitiesRef.current?.value,
                    keyboard_led: keyboardLedRef.current?.value,
                    size: sizeRef.current?.value,
                    weight: weightRef.current?.value,
                    material: materialRef.current?.value,
                    price: priceRef.current?.value,
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
                    cpu_processer: cpuProcosserRef.current?.value,
                    number_of_processer: numberOfProcesserRef.current?.value,
                    number_of_processer_cores: numberOfProcesserCoresRef.current?.value,
                    number_of_processer_thread: numberOfProcesserThreadRef.current?.value,
                    cpu_speed: cpuSpeedRef.current?.value,
                    cpu_speed_maximum: cpuSpeedMaximumRef.current?.value,
                    buffer_memory: bufferMemoryRef.current?.value,
                    ram: ramRef.current?.value,
                    ram_type: ramTypeRef.current?.value,
                    bus_ram_speed: busRamSpeedRef.current?.value,
                    ram_support: ramSupportRef.current?.value,
                    hard_disk: hardDiskRef.current?.value,
                    screen_size: screenSizeRef.current?.value,
                    screen_resolution: screenResolutionRef.current?.value,
                    screen_refresh_rate: screenRefreshRateRef.current?.value,
                    color_coverage: colorCoverageRef.current?.value,
                    screen_technology: screenTechnologyRef.current?.value,
                    sound_card: soundCardRef.current?.value,
                    sound_technology: soundTechnologyRef.current?.value,
                    communicate_port: communicatePortRef.current?.value,
                    wireless_connect: wirelessConnectRef.current?.value,
                    webcam: webcamRef.current?.value,
                    other_functionalities: otherFunctionalitiesRef.current?.value,
                    keyboard_led: keyboardLedRef.current?.value,
                    size: sizeRef.current?.value,
                    weight: weightRef.current?.value,
                    material: materialRef.current?.value,
                    price: priceRef.current?.value,
                    product_type: 'laptop'
                };

                console.info("Inserting new laptop product: " + JSON.stringify(newData));

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

                <Accordion type="multiple">
                    <AccordionItem value="processer">
                        <AccordionTrigger>Processers</AccordionTrigger>
                        <AccordionContent className="h-full flex flex-col gap-8">
                            <label className="input input-bordered flex items-center gap-2">
                                Id
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.id : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? IdRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                CPU Processer
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.cpu_processer : 0} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? cpuProcosserRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Number of Processer
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.number_of_processer : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? numberOfProcesserRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Number of processer cores
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.number_of_processer_cores : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? numberOfProcesserCoresRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Number of processer thread
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.number_of_processer_thread : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? numberOfProcesserThreadRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                CPU speed
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.cpu_speed : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? cpuSpeedRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                CPU speed maximum
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.max_cpu_speed : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? cpuSpeedMaximumRef : undefined} />
                            </label>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="ram">
                        <AccordionTrigger>Ram, Hard Disks</AccordionTrigger>
                        <AccordionContent className="h-full flex flex-col gap-8">
                            <label className="input input-bordered flex items-center gap-2">
                                Buffer Memory
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.buffer_memory : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? bufferMemoryRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Ram
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.ram : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? ramRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Ram type
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.ram_type : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? ramTypeRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Bus ram speed
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.bus_ram_speed : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? busRamSpeedRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Ram support
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.ram_support : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? ramSupportRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Hard Disk
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.hard_disk : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? hardDiskRef : undefined} />
                            </label>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="screen">
                        <AccordionTrigger>Screen</AccordionTrigger>
                        <AccordionContent className="h-full flex flex-col gap-8">
                            <label className="input input-bordered flex items-center gap-2">
                                Screen size
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.screen_size : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? screenSizeRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Screen resolution
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.screen_resolution : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? screenResolutionRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Screen refresh rate
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.refresh_rate : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? screenRefreshRateRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Color coverage
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.color_coverage : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? colorCoverageRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Screen technology
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.screen_technology : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? screenTechnologyRef : undefined} />
                            </label>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="grahic">
                        <AccordionTrigger>Graphic and Sound</AccordionTrigger>
                        <AccordionContent className="h-full flex flex-col gap-8">
                            <label className="input input-bordered flex items-center gap-2">
                                Sound Card
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.sound_card : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? soundCardRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Sound Technology
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.sound_technology : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? soundTechnologyRef : undefined} />
                            </label>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="connect_port">
                        <AccordionTrigger>Connect Port & Expand functionalities</AccordionTrigger>
                        <AccordionContent className="h-full flex flex-col gap-8">
                            <label className="input input-bordered flex items-center gap-2">
                                Communicate Port
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.communicate_port : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? communicatePortRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Wireless Connect
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.wireless_connect : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? wirelessConnectRef : undefined} />
                            </label>

                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="size">
                        <AccordionTrigger>Size and Weight</AccordionTrigger>
                        <AccordionContent className="h-full flex flex-col gap-8">
                            <label className="input input-bordered flex items-center gap-2">
                                Size
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.size : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? sizeRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Weight
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.weight : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? weightRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Material
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.material : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? materialRef : undefined} />
                            </label>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="other">
                        <AccordionTrigger>Others</AccordionTrigger>
                        <AccordionContent className="h-full flex flex-col gap-8">
                            <label className="input input-bordered flex items-center gap-2">
                                Webcam
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.webcam : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? webcamRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Other functionalities
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.other_functionalities : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? otherFunctionalitiesRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Keyboard Led
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.keyboard_led : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? keyboardLedRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Price
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.price : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? priceRef : undefined} />
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
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {mode.toUpperCase() === FormMode.UPDATE && <button type="button" className="btn btn-success capitalize" onClick={handleUpdateProduct}>save</button>}
                {mode.toUpperCase() === FormMode.CREATE && <button type="button" className="btn btn-success capitalize" onClick={handleInsertNewProduct}>create</button>}
            </>
        )
    }
}