import { fireBaseObject } from "@/features/product-crud";
import { FormMode, FormStrategy } from "@/interfaces";
import { useEffect, useState } from "react";

interface ProductDetailFormProps {
    strategy: FormStrategy;
    mode: string;
    documentId:string
}

const ProductDetailForm: React.FC<ProductDetailFormProps> = ({ strategy, mode, documentId }) => {
    const [formData, setFormData] = useState({});

    const handleFetchSingleProductData = async () => {
        const data = await fireBaseObject.getSingleProduct(documentId)
        if(!data) return;
        setFormData(data);
    }

    useEffect(() => {
        if (mode.toUpperCase() === FormMode.VIEW || mode.toUpperCase() === FormMode.UPDATE) {
            // Fetch data from DB if necessary
            handleFetchSingleProductData()
        }
    }, []);

    return (
        <div>
            {strategy.renderForm(mode, formData)}
        </div>
    );
};

export default ProductDetailForm;