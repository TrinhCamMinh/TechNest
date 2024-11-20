import { Filter, ProductCaraousel, ProductCard } from "@/components";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clientSearchOptions } from "@/configs/fuse";
import { useDebounce } from "@/hooks";
import { fireBaseObject } from '@/features/product-crud';
import { getDoc } from "firebase/firestore";
import { ObjectGroupBy } from '@/lib/utils';
import Fuse from 'fuse.js';
import { PRODUCT_BADGE_LIST, ALSO_FIND_KEYWORDS, BLOGS_LIST } from "@/constants";

const HomePage = () => {
    const [products, setProducts] = useState<Record<string, any>>({});
    const [raw, setRaw] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchValue, 500); // 500ms delay
    const [searchResults, setSearchResults] = useState<Array<any>>([]);

    const handleFetchProducts = async () => {
        // This data contains Ref of category field
        const listOfRawProductsData: any[] = await fireBaseObject.getProducts();
        const listOfProcessedProductsData: any[] = [];

        for (const item of listOfRawProductsData) {
            const categoryRef = item.category;
            const docSnap = await getDoc(categoryRef);
            const category: any = docSnap.data();
            listOfProcessedProductsData.push({ ...item, category: category.name });
        }

        const productGroupedData = ObjectGroupBy(listOfProcessedProductsData, 'category');
        console.info("Product data after being grouped: ", productGroupedData)

        setRaw(listOfProcessedProductsData);
        setProducts(productGroupedData);
    }

    useEffect(() => {
        setSearchResults([]) // reset data
        console.info(`User is searching for ${debouncedSearchTerm}`)

        if (debouncedSearchTerm) {
            const fuse = new Fuse(raw, clientSearchOptions);
            const result = fuse.search(debouncedSearchTerm);

            console.info('search result ', result);
            setSearchResults(result); // Update the search results with Fuse.js output
        } else {
            setSearchResults([]); // Clear results if search term is empty
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        handleFetchProducts();
    }, [])

    return (
        <div className="flex flex-col gap-8">
            {/* Search and Filter input */}
            <div className="flex flex-row gap-4">
                <Filter />

                <div className="grow relative">
                    <label className="input input-bordered flex items-center gap-2">
                        <input onChange={(e) => setSearchValue(e.target.value)} type="text" className="grow" placeholder="Search" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>

                    {/* Search results container */}
                    <div className={`bg-white shadow-2xl w-full h-fit absolute mt-4 rounded p-4 z-10 ${searchValue ? 'visible' : 'invisible'}`}>
                        {
                            searchResults.length === 0 ?
                                <p>Loading...</p> :
                                searchResults.map(item => <p key={item.item.name}>{item.item.name}</p>)
                        }
                    </div>
                </div>
            </div>

            <div className="artboard artboard-horizontal w-full">
                <img className="w-full rounded" src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/d0/a7/d0a74b8b1d0d82da1f4b0c7d635d6c73.png" alt="banner" />
            </div>

            {/* Badge Section */}
            <div className="p-12 flex flex-row flex-wrap gap-12 w-full shadow-2xl rounded-md">
                {
                    PRODUCT_BADGE_LIST.map((badge) => (
                        <button key={badge.name} className="avatar indicator bg-transparent p-4 hover:bg-slate-50 rounded transition-all">
                            {badge.tag && <span className="indicator-item badge badge-secondary bg-red-400 border-none capitalize">{badge.tag}</span>}
                            <div className="h-20 w-20 rounded-lg !overflow-visible">
                                <img
                                    alt={badge.name}
                                    src={badge.image}
                                />
                                <p className="capitalize font-medium">{badge.name}</p>
                            </div>
                        </button>
                    ))
                }
            </div>

            {
                Object.entries(products).map(([key, value]) => {
                    return (
                        <div className="flex flex-col gap-4" key={key}>
                            <h2 className="text-2xl font-bold capitalize">{key}</h2>
                            <div className="grid grid-cols-4 gap-4">
                                {
                                    value.map((item: any) => {
                                        return (
                                            <ProductCard key={item.id} id={item.id} name={item.name} price={item.price} createdAt={item.createdAt} type={item.product_type} />

                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }

            <div className="divider"></div>

            {/* Offer Section */}
            <div className="flex flex-col gap-2">
                <header>
                    <h2 className="text-2xl font-bold capitalize">Promotional booth</h2>
                </header>
                <div className="grid grid-cols-4 gap-10">
                    <div className="artboard phone-1 rounded-lg">
                        <img className="h-full" src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/67/c9/67c9135c56e8ec31b01a56acb275f645.jpg" alt="offer" />
                    </div>
                    <div className="artboard phone-1 bg-slate-200 rounded-lg">
                        <img className="h-full" src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/f0/03/f0033ed0896a8ff46162efbb46ec16bc.png" alt="offer" />
                    </div>
                    <div className="artboard phone-1 bg-slate-200 rounded-lg">
                        <img className="h-full" src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/dd/0d/dd0d0c55aa73fc441b275bd4dc910359.png" alt="offer" />
                    </div>
                    <div className="artboard phone-1 bg-slate-200 rounded-lg">
                        <img className="h-full" src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/e5/fb/e5fbd8f8e7184f9890b748a3225f8773.png" alt="offer" />
                    </div>
                </div>
            </div>

            {/* Carousel Section */}
            <ProductCaraousel />

            {/* Article Section */}
            <div className="flex flex-col gap-2">
                <header>
                    <h2 className="text-2xl font-bold capitalize">Blogs</h2>
                </header>
                <div className="p-8 w-full shadow-2xl rounded-md">
                    <Tabs defaultValue="Promotion">
                        <TabsList>
                            <TabsTrigger value="Promotion">Promotion</TabsTrigger>
                            <TabsTrigger value="Purchase consultation">Purchase consultation</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Promotion">
                            <div className="grid grid-cols-4 gap-4 w-full">
                                {
                                    BLOGS_LIST.OFFERS.map((blog) => {
                                        return (
                                            <div key={blog.title} className="card card-compact bg-base-100 shadow-xl">
                                                <figure>
                                                    <img
                                                        src={blog.banner}
                                                        alt="Shoes" />
                                                </figure>
                                                <div className="card-body">
                                                    <p>{blog.title}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </TabsContent>
                        <TabsContent value="Purchase consultation">
                            <div className="grid grid-cols-4 gap-4 w-full">
                                {
                                    BLOGS_LIST.PROPOSALS.map((blog) => {
                                        return (
                                            <div key={blog.title} className="card card-compact bg-base-100 shadow-xl">
                                                <figure>
                                                    <img
                                                        src={blog.banner}
                                                        alt="Shoes" />
                                                </figure>
                                                <div className="card-body">
                                                    <p>{blog.title}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </TabsContent>
                    </Tabs>
                    <p className="text-blue-600 hover:underline text-center w-full mt-4 font-medium capitalize">more...</p>
                </div>
            </div>

            {/* People also find Section */}
            <div className="flex flex-col gap-2">
                <header>
                    <h2 className="text-2xl font-bold capitalize">People also find</h2>
                </header>
                <div className="p-8 flex flex-row flex-wrap gap-x-2 gap-y-4 w-full shadow-2xl rounded-md">
                    {
                        ALSO_FIND_KEYWORDS.map((keyword: string) => {
                            return (
                                <div key={keyword} className="badge badge-ghost badge-lg p-3">{keyword}</div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;