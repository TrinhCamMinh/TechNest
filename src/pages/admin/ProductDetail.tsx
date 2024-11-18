import ProductDetailForm from '@/components/custom/ProductDetailForm/ProductDetailForm';
import { KeyboardFormStrategy } from '@/components/custom/ProductDetailForm/Strategies/KeyboardFormStrategies';
import { PRODUCT_TYPE } from '@/constants';
import { FormMode, FormStrategy } from '@/interfaces';
import { returnProductImagePath } from '@/lib/utils';
import { useParams, useSearchParams } from "react-router-dom";
import ImagePlaceHolder from '@/assets/placeholder.svg';

const ProductDetail = () => {
    let { productId } = useParams();
    const [searchParams] = useSearchParams();
    const mode: string = searchParams.get("mode")?.toUpperCase() ?? FormMode.VIEW;
    const productType: string = searchParams.get("product_type") ?? PRODUCT_TYPE.AIR_COOLER;
    const imagePath: string = returnProductImagePath(productType);

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
                    <p className='text-2xl font-bold uppercase'>{productType} - <span className='underline underline-offset-4 text-blue-600'>{productId}</span></p>
                </header>
                <main>
                    {/* Form content will be rendered here dynamically based on the strategy */}
                    <ProductDetailForm strategy={strategy()} mode={mode} documentId={productId ?? 'null'} />
                </main>
            </div>
            <aside className="col-span-2 self-center">
                <img
                    src={imagePath}
                    alt="product image"
                    className='h-3/6 w-full'
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        e.currentTarget.onerror = null; // Prevents infinite loop if fallback also fails
                        e.currentTarget.src = ImagePlaceHolder; // Replace with your fallback image path
                    }}
                />
            </aside>
        </div>
    )
}

export default ProductDetail;