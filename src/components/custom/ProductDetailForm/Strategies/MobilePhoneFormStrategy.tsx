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
} from "@/components/ui/accordion"

export const MobilePhoneFormStrategy: FormStrategy = {
    renderForm: function (mode: string, data: Record<string, any>): JSX.Element {
        // Get the productId param from the URL.
        const { productId } = useParams();
        const isPrefilledDataFromDb = mode.toUpperCase() === FormMode.VIEW || mode.toUpperCase() === FormMode.UPDATE;
        const isEdit = mode.toUpperCase() === FormMode.CREATE || mode.toUpperCase() === FormMode.UPDATE;
        const isViewOnly = mode.toUpperCase() === FormMode.VIEW;

        const IdRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const priceRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const osRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const cpuProcesserRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const cpuSpeedRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const gpuProcessorRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const ramRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const storageCapacityRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const availableStorageCapacityRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const contactListLimitRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const backCameraResolutionRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const backCameraModesRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const backCameraFlashRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const backCameraFunctionalitesRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const frontCameraResolutionRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const frontCameraFunctionalitiesRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const screenTechnologyRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const screenResolutionRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const screenSizeRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const maxBrightnessRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const touchGlassRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const batterySizeRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const batteryTypeRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const maxChargeSupportRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const batteryTechnologyRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const advanceSecurityRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const specialFuntionalityRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const waterDustResitanceRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const recordRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const movieRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const musicRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const internetRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const simRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const wifiRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const gpsRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const bluetoothRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const chargeConnectPortRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const headphoneJackRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const otherPortsRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const designRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const materialsRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const weightSizeRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const launchYearRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

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
                    price: priceRef.current?.value,
                    os: osRef.current?.value,
                    cpu_processer: cpuProcesserRef.current?.value,
                    cpu_speed: cpuSpeedRef.current?.value,
                    gpu_processor: gpuProcessorRef.current?.value,
                    ram: ramRef.current?.value,
                    storage_capacity: storageCapacityRef.current?.value,
                    available_storage_capacity: availableStorageCapacityRef.current?.value,
                    contact_list_limit: contactListLimitRef.current?.value,
                    back_camera_resolution: backCameraResolutionRef.current?.value,
                    back_camera_modes: backCameraModesRef.current?.value,
                    back_camera_flash: backCameraFlashRef.current?.value,
                    back_camera_functionalites: backCameraFunctionalitesRef.current?.value,
                    front_camera_resolution: frontCameraResolutionRef.current?.value,
                    front_camera_functionalities: frontCameraFunctionalitiesRef.current?.value,
                    screen_technology: screenTechnologyRef.current?.value,
                    screen_resolution: screenResolutionRef.current?.value,
                    screen_size: screenSizeRef.current?.value,
                    max_brightness: maxBrightnessRef.current?.value,
                    touch_glass: touchGlassRef.current?.value,
                    battery_size: batterySizeRef.current?.value,
                    battery_type: batteryTypeRef.current?.value,
                    max_charge_support: maxChargeSupportRef.current?.value,
                    battery_technology: batteryTechnologyRef.current?.value,
                    advance_security: advanceSecurityRef.current?.value,
                    special_funtionality: specialFuntionalityRef.current?.value,
                    water_dust_resistance: waterDustResitanceRef.current?.value,
                    record: recordRef.current?.value,
                    movie: movieRef.current?.value,
                    music: musicRef.current?.value,
                    internet: internetRef.current?.value,
                    sim: simRef.current?.value,
                    wifi: wifiRef.current?.value,
                    gps: gpsRef.current?.value,
                    bluetooth: bluetoothRef.current?.value,
                    charge_connect_port: chargeConnectPortRef.current?.value,
                    headphone_jack: headphoneJackRef.current?.value,
                    other_ports: otherPortsRef.current?.value,
                    design: designRef.current?.value,
                    material: materialsRef.current?.value,
                    weight_size: weightSizeRef.current?.value,
                    launch_year: launchYearRef.current?.value
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
                    price: priceRef.current?.value,
                    os: osRef.current?.value,
                    cpu_processer: cpuProcesserRef.current?.value,
                    cpu_speed: cpuSpeedRef.current?.value,
                    gpu_processor: gpuProcessorRef.current?.value,
                    ram: ramRef.current?.value,
                    storage_capacity: storageCapacityRef.current?.value,
                    available_storage_capacity: availableStorageCapacityRef.current?.value,
                    contact_list_limit: contactListLimitRef.current?.value,
                    back_camera_resolution: backCameraResolutionRef.current?.value,
                    back_camera_modes: backCameraModesRef.current?.value,
                    back_camera_flash: backCameraFlashRef.current?.value,
                    back_camera_functionalites: backCameraFunctionalitesRef.current?.value,
                    front_camera_resolution: frontCameraResolutionRef.current?.value,
                    front_camera_functionalities: frontCameraFunctionalitiesRef.current?.value,
                    screen_technology: screenTechnologyRef.current?.value,
                    screen_resolution: screenResolutionRef.current?.value,
                    screen_size: screenSizeRef.current?.value,
                    max_brightness: maxBrightnessRef.current?.value,
                    touch_glass: touchGlassRef.current?.value,
                    battery_size: batterySizeRef.current?.value,
                    battery_type: batteryTypeRef.current?.value,
                    max_charge_support: maxChargeSupportRef.current?.value,
                    battery_technology: batteryTechnologyRef.current?.value,
                    advance_security: advanceSecurityRef.current?.value,
                    special_funtionality: specialFuntionalityRef.current?.value,
                    water_dust_resistance: waterDustResitanceRef.current?.value,
                    record: recordRef.current?.value,
                    movie: movieRef.current?.value,
                    music: musicRef.current?.value,
                    internet: internetRef.current?.value,
                    sim: simRef.current?.value,
                    wifi: wifiRef.current?.value,
                    gps: gpsRef.current?.value,
                    bluetooth: bluetoothRef.current?.value,
                    charge_connect_port: chargeConnectPortRef.current?.value,
                    headphone_jack: headphoneJackRef.current?.value,
                    other_ports: otherPortsRef.current?.value,
                    design: designRef.current?.value,
                    material: materialsRef.current?.value,
                    weight_size: weightSizeRef.current?.value,
                    launch_year: launchYearRef.current?.value,
                    product_type: 'mobile_phone'
                };

                console.info("Inserting new mobile phone product: " + JSON.stringify(newData));

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
                    <AccordionItem value="config">
                        <AccordionTrigger>Configurations and Memory</AccordionTrigger>
                        <AccordionContent className="h-full flex flex-col gap-8">
                            <label className="input input-bordered flex items-center gap-2">
                                Id
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.id : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? IdRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Price
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.price : 0} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? priceRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                OS
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.os : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? osRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                CPU Processor
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.cpu_processer : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? cpuProcesserRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                CPU speed
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.cpu_speed : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? cpuSpeedRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                GPU processor
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.gpu_processor : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? gpuProcessorRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Ram
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.ram : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? ramRef : undefined} />
                            </label>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="camera">
                        <AccordionTrigger>Camera and Screen</AccordionTrigger>
                        <AccordionContent className="h-full flex flex-col gap-8">
                            <label className="input input-bordered flex items-center gap-2">
                                Storage Capacity
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.storage_capacity : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? storageCapacityRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Available Storage Capacity
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.available_storage_capacity : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? availableStorageCapacityRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Contact List Limit
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.contact_list_limit : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? contactListLimitRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Back Camera Resolution
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.back_camera_resolution : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? backCameraResolutionRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Back Camera Modes
                                {/* Suggested code may be subject to a license. Learn more: ~LicenseLog:1983412058. */}
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.back_camera_modes : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? backCameraModesRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Back Camera Flash
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.back_camera_flash : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? backCameraFlashRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Back Camera Functionalites
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.back_camera_functionalites : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? backCameraFunctionalitesRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Front Camera Resolution
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.front_camera_resolution : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? frontCameraResolutionRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Front Camera Functionalities
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.front_camera_functionalities : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? frontCameraFunctionalitiesRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Screen Technology
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.screen_technology : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? screenTechnologyRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Screen Resolution
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.screen_resolution : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? screenResolutionRef : undefined} />
                            </label>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="battery">
                        <AccordionTrigger>Battery and Charge</AccordionTrigger>
                        <AccordionContent className="h-full flex flex-col gap-8">
                            <label className="input input-bordered flex items-center gap-2">
                                Screen Size
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.screen_size : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? screenSizeRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Max Brightness
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.max_brightness : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? maxBrightnessRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Touch Glass
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.touch_glass : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? touchGlassRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Battery Size
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.battery_size : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? batterySizeRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Battery Type
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.battery_type : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? batteryTypeRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Max Charge Support
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.max_charge_support : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? maxChargeSupportRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Battery Technology
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.battery_technology : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? batteryTechnologyRef : undefined} />
                            </label>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="utility">
                        <AccordionTrigger>Utilities</AccordionTrigger>
                        <AccordionContent className="h-full flex flex-col gap-8">
                            <label className="input input-bordered flex items-center gap-2">
                                Advance Security
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.advance_security : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? advanceSecurityRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Special Funtionality
                                <input type="text" defaultValue={isPrefilledDataFromDb ? data.special_funtionality : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? specialFuntionalityRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Water Dust Resitance
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.water_dust_resistance : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? waterDustResitanceRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Record
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.record : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? recordRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Movie
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.movie : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? movieRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Music
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.music : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? musicRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Internet
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.internet : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? internetRef : undefined} />
                            </label>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="connect">
                        <AccordionTrigger>Connects</AccordionTrigger>
                        <AccordionContent className="h-full flex flex-col gap-8">
                            <label className="input input-bordered flex items-center gap-2">
                                SIM
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.sim : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? simRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Wifi
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.wifi : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? wifiRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                GPS
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.gps : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? gpsRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Bluetooth
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.bluetooth : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? bluetoothRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Charge Connect Port
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.charge_connect_port : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? chargeConnectPortRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Headphone Jack
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.headphone_jack : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? headphoneJackRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Other Ports
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.other_ports : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? otherPortsRef : undefined} />
                            </label>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="design">
                        <AccordionTrigger>Design and Material</AccordionTrigger>
                        <AccordionContent className="h-full flex flex-col gap-8">
                            <label className="input input-bordered flex items-center gap-2">
                                Design
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.design : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? designRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Materials
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.material : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? materialsRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Weight Size
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.weight_size : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? weightSizeRef : undefined} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2">
                                Launch Year
                                <input type="number" defaultValue={isPrefilledDataFromDb ? data.launch_year : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? launchYearRef : undefined} />
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