import ProductDetailForm from '@/components/custom/ProductDetailForm/ProductDetailForm';
import { KeyboardFormStrategy } from '@/components/custom/ProductDetailForm/Strategies/KeyboardFormStrategies';
import { PRODUCT_TYPE } from '@/constants';
import { FormMode, FormStrategy } from '@/interfaces';
import { useParams, useSearchParams } from "react-router-dom";

const ProductDetail = () => {
    let { productId } = useParams();
    const [searchParams] = useSearchParams();
    const mode: string = searchParams.get("mode")?.toUpperCase() ?? FormMode.VIEW;
    const productType: string = searchParams.get("product_type") ?? PRODUCT_TYPE.AIR_COOLER;

    const strategy = (): FormStrategy => {
        switch (productType) {
            case PRODUCT_TYPE.KEYBOARD:
                return KeyboardFormStrategy;
            default:
                break;
        }
        return KeyboardFormStrategy;
    }

    return (
        <div className="h-full grid grid-cols-5 gap-4">
            <div className="col-span-3 flex flex-col gap-4">
                <header className="text-center uppercase">
                    <p className='text-2xl font-bold'>Product - <span className='underline underline-offset-4 text-blue-600'>520H0659</span></p>
                </header>
                <main>
                    {/* Form content will be rendered here dynamically based on the strategy */}
                    <ProductDetailForm strategy={strategy()} mode={mode} documentId={productId ?? 'null'} />
                </main>
            </div>
            <aside className="col-span-2 self-center">
                <img alt="product image" className='h-3/6 w-full' />
            </aside>
        </div>
    )
}

export default ProductDetail;