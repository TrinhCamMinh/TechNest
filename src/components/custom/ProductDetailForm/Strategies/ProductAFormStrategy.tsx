import { FormMode, FormStrategy } from "@/interfaces";

export const ProductAFormStrategy: FormStrategy = {
    renderForm: (mode: FormMode, data:any = {}) => {
        const isView = mode.toUpperCase() === FormMode.VIEW;
        const isEdit = mode.toUpperCase() === FormMode.CREATE || mode === FormMode.UPDATE;

        return (
            <form>
                <label>
                    Field A1:
                    <input type="text" value={data.fieldA1 || 'empty value A1'} readOnly={isView} />
                </label>
                <label>
                    Field A2:
                    <input type="text" value={data.fieldA2 || 'empty value A2'} readOnly={isView} />
                </label>
                {isEdit && <button type="submit">Save</button>}
            </form>
        );
    }
};