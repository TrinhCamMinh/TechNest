import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CiFilter } from "react-icons/ci";
import { DualRangeSlider } from '@/components';
import { FILTER_OPTIONS, PRODUCT_COLLECTION_NAME } from '@/constants';
import { useEffect, useState } from "react";
import { and, collection, getDocs, or, query, where } from "firebase/firestore";
import { useDebounce } from "@/hooks";
import { db } from '@/configs/firebase';

const Filter = () => {
    const MIN_PRICE_RANGE = 300_000;
    const MAX_PRICE_RANGE = 90_000_000;
    const DELAY_AMOUNT = 1000 // 1s delay

    const [filterResults, setFilterResults] = useState<any[]>([]);
    const [filterOptions, setFilterOptions] = useState<string[]>([]);
    const [dualPriceRange, setDualPriceRange] = useState<number[]>([MIN_PRICE_RANGE, MAX_PRICE_RANGE]);

    const debouncedFilterOptions = useDebounce(filterOptions, DELAY_AMOUNT);

    const handleFilterProduct = (filterChosesOptions: string[]) => {
        console.info("user has selected these filter options so far: " + filterChosesOptions)
        setFilterOptions(filterChosesOptions);
    }

    const reformatFilterOptions = (rawFilterOptions: string[]) => {
        const brandOptions = [];
        const priceOptions = [];

        for (const option of rawFilterOptions) {
            // If option data type is Number then it is price option
            // Else it is brand option
            if (Number.isInteger(Number(option))) {
                priceOptions.push(Number(option));
            } else {
                brandOptions.push(option);
            }
        }

        const result: Record<string, any> = { brand: [], price: [] }
        result.brand = brandOptions;
        result.price = priceOptions;

        return result;
    }

    const queryData = async (filter: Record<string, any>) => {
        console.info('filter options: ' + JSON.stringify(filter))
        if (!filter || filter.brand.length === 0) return;

        setFilterResults([]);
        const productRef = collection(db, PRODUCT_COLLECTION_NAME);
        const dualPriceRangeMin = dualPriceRange[0] ?? MIN_PRICE_RANGE;
        const dualPriceRangeMax = dualPriceRange[1] ?? MAX_PRICE_RANGE;

        console.info('price range filter: ' + dualPriceRangeMin + ' - ' + dualPriceRangeMax)

        // Brand must exist in brand array and Price must between a range
        const q = query(productRef, and(
            where('brand', 'in', [...filter.brand]),
            or(
                where('price', '>=', dualPriceRangeMin),
                where('price', '<=', dualPriceRangeMax),
            )
        ));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: any) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setFilterResults([...filterResults, doc.data()]);
        });
    }

    useEffect(() => {
        if (debouncedFilterOptions.length === 0) return;
        const processedFilter = reformatFilterOptions(debouncedFilterOptions)
        queryData(processedFilter);
    }, [debouncedFilterOptions])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="capitalize">
                    <CiFilter className="w-5 h-5" />
                    filter
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 h-fit" side="right" sideOffset={4}>
                <ToggleGroup
                    className="flex flex-col gap-8"
                    type="multiple"
                    variant="outline"
                    onValueChange={handleFilterProduct}
                >
                    {/* Brand options */}
                    <div className="flex flex-col gap-2">
                        <header>
                            <Label>Brands</Label>
                        </header>
                        <div className="flex flex-row flex-wrap gap-2">
                            {
                                FILTER_OPTIONS.BRANDS.map(item => {
                                    return (
                                        <ToggleGroupItem key={item.value} value={item.value} aria-label={`Toggle ${item.value}`}>

                                            {item.name}
                                        </ToggleGroupItem>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Price options */}
                    <div className="flex flex-col gap-2">
                        <header>
                            <Label>Prices</Label>
                        </header>
                        <div className="flex flex-row flex-wrap gap-2">
                            {
                                FILTER_OPTIONS.PRICES_CHIP.map(item => {
                                    return (
                                        <ToggleGroupItem key={item.value} value={item.value.toString()} aria-label={`Toggle ${item.value}`}>
                                            {item.name}
                                        </ToggleGroupItem>
                                    )
                                })
                            }
                        </div>
                        <div className="divider">OR</div>
                        <DualRangeSlider
                            min={MIN_PRICE_RANGE}
                            max={MAX_PRICE_RANGE}
                            onChange={({ min, max }) => setDualPriceRange([min, max])}
                        />
                    </div>

                    {/* Div block displaying the number of filter results */}
                    <div className="flex flex-row justify-center gap-4 items-center mt-8">
                        <Button variant="destructive" className="capitalize">cancel</Button>
                        <Button className="bg-blue-600 text-white">See {filterResults.length} results</Button>
                    </div>
                </ToggleGroup>
            </PopoverContent>
        </Popover>
    )
}

export default Filter