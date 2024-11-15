import { FormMode, FormStrategy } from "@/interfaces";
import { MutableRefObject, useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";
import { fireBaseObject } from "@/features/product-crud";
import { useParams } from 'react-router-dom';

export const KeyboardFormStrategy: FormStrategy = {
    renderForm: (mode: string, data: Record<string, any>) => {
        // Get the productId param from the URL.
        const { productId } = useParams();
        const isPrefilledDataFromDb = mode.toUpperCase() === FormMode.VIEW || mode.toUpperCase() === FormMode.UPDATE;
        const isEdit = mode.toUpperCase() === FormMode.CREATE || mode.toUpperCase() === FormMode.UPDATE;
        const isViewOnly = mode.toUpperCase() === FormMode.VIEW;

        const idRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const categoryRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const priceRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
        const adaptRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

        const handleUpdateProduct = async () => {
            try {
                if (!productId) {
                    toast.error("Invalid product id", {
                        description: productId
                    })
                    return;
                }

                const newData = {
                    id: idRef.current?.value,
                    category: categoryRef.current?.value,
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
                const newData = {
                    id: idRef.current?.value,
                    category: categoryRef.current?.value,
                    price: priceRef.current?.value,
                    adapt: adaptRef.current?.value,
                };

                fireBaseObject.insertProduct(newData)
                    .then(() => toast.success('Insert product successfully'))
                    .catch((error: Error) => toast.error(error.message))
            } catch(e) {
                const errorMessage = (e as Error).message;
                toast.error(`Error while create a new keyboard product`, {
                    description: errorMessage
                })
            }
        }

        return (
            <>
                <Toaster richColors position="top-right" />
                <form className="h-full flex flex-col gap-8">
                    <label className="input input-bordered flex items-center gap-2">
                        Id
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.id : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? idRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Category
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.category : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? categoryRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Price
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.price : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? priceRef : undefined} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Adapt
                        <input type="text" defaultValue={isPrefilledDataFromDb ? data.adapt : ''} className="grow" placeholder="Daisy" readOnly={isViewOnly} ref={isEdit ? adaptRef : undefined} />
                    </label>


                    {mode.toUpperCase() === FormMode.UPDATE && <button type="button" className="btn btn-success capitalize" onClick={handleUpdateProduct}>save</button>}
                    {mode.toUpperCase() === FormMode.CREATE && <button type="button" className="btn btn-success capitalize" onClick={handleInsertNewProduct}>create</button>}
                </form>
            </>
        )
    }
}