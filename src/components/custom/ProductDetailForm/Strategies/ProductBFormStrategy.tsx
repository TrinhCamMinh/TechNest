import { FormMode, FormStrategy } from "@/interfaces";
import { MutableRefObject, useRef } from "react";

export const ProductBFormStrategy: FormStrategy = {
    renderForm: (mode: FormMode, data: any = {}) => {
        const isView = mode.toUpperCase() === FormMode.VIEW;
        const isEdit = mode.toUpperCase() === FormMode.CREATE || mode === FormMode.UPDATE;
        const demoRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

        const handleSave = () => {
            console.log("editting: " + demoRef.current?.value);
        }

        return (
            <form>
                <label>
                    Field B1:
                    <input type="text" defaultValue={data.fieldB1 || ''} readOnly={false} ref={isEdit ? demoRef : null} />
                </label>
                <label>
                    Field B2:
                    {/* <input type="text" value={data.fieldB2 || ''} readOnly={isView} /> */}
                </label>
                {isEdit && <button type="button" onClick={handleSave}>Save</button>}
            </form>
        );
    }
};