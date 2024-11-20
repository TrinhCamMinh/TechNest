import { useParams } from "react-router-dom";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formatCurrency, returnProductCarouselImagePath } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { CiCircleQuestion } from "react-icons/ci";
import { IoMdCart } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { fireBaseObject } from "@/features/product-crud";
import { Toaster, toast } from 'sonner';
import { DocumentReference, getDoc } from "firebase/firestore";

const ProductDetail = () => {
    let { productId } = useParams();
    // List of fields to hide
    const hiddenFields = ["id", 'images', 'product_type', 'createdAt', 'updatedAt'];
    const [product, setProduct] = useState<Record<string, any>>({});

    const handleFetchProduct = async (productId: string) => {
        try {
            const data: Record<string, any> = await fireBaseObject.getSingleProduct(productId);
            const categoryRef: DocumentReference = data.category;
            const categoryDocSnap = await getDoc(categoryRef);
            const categoryData = categoryDocSnap.data();

            data.category = categoryData?.name;
            setProduct(data);
        } catch (error) {
            const errorMessage: string = (error as Error).message;
            console.error('Error while fetching detail product - Client Detail page', error);
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        handleFetchProduct(productId ?? '0');


        Object.entries(product)
            .filter(([key]) => !hiddenFields.includes(key)) // Filter out hidden fields
            .map(([key, value]) => {
                return (
                    console.log(`${key} - ${value}`)
                )
            })
    }, [])

    return (
        <>
            <Toaster richColors position="top-right" />
            <div className="grid grid-cols-5 gap-8">
                {/* Product detail content - Left Side */}
                <div className="col-span-3 flex flex-col gap-8">
                    {/* Header and Carousel */}
                    <header>
                        <h2 className="text-2xl font-bold mb-4">{product.name ?? 'No data'}</h2>
                        {
                            returnProductCarouselImagePath(product.product_type).length > 0 &&
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-4/5"
                            >
                                <CarouselContent >
                                    {
                                        returnProductCarouselImagePath(product.product_type).map((image) => {
                                            return (
                                                <CarouselItem key={image} className="md:basis-1/2 lg:basis-1/3">
                                                    <div className="p-1">
                                                        <Card>
                                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                                <img src={image} alt="" />
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                </CarouselItem>
                                            )
                                        })
                                    }
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        }
                    </header>

                    {/* Tabs (specificatios, description) */}
                    <div className="p-8 shadow-xl rounded">
                        <Tabs defaultValue="specifications">
                            <TabsList>
                                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                                <TabsTrigger value="description">Description</TabsTrigger>
                            </TabsList>
                            <TabsContent value="specifications" className="space-y-2">
                                {
                                    Object.entries(product)
                                        .filter(([key]) => !hiddenFields.includes(key)) // Filter out hidden fields
                                        .map(([key, value]) => {
                                            return (
                                                <div key={key} className="space-y-1">
                                                    <Label htmlFor={key} className="capitalize">
                                                        {key.replace('_', ' ')}
                                                    </Label>
                                                    <Input id={key} value={key === 'price' ? formatCurrency(value) : value} readOnly className="capitalize" />
                                                </div>
                                            )
                                        })
                                }
                            </TabsContent>
                            <TabsContent value="description">Currently no data here.</TabsContent>
                        </Tabs>
                    </div>
                </div>

                {/* Price block - Right Side */}
                <aside className="col-span-2 flex flex-col gap-4 mt-8">
                    <div className="card p-5 shadow-xl gap-4">
                        <div className="flex flex-row items-center">
                            <p className="w-16">Giá tại</p>
                            <Select defaultValue="hcm">
                                <SelectTrigger>
                                    <SelectValue placeholder="Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hcm">Ho Chi Minh</SelectItem>
                                    <SelectItem value="hn">Ha Noi</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <p className="text-2xl text-red-600 font-bold uppercase">{formatCurrency(123456)}</p>

                        <div className="shadow-xl rounded-md border-2 border-solid text-sm">
                            <header className="bg-[#f9fafb] p-3">
                                <p className="font-medium">Khuyến mãi</p>
                                <small className="text-slate-400">Giá và khuyến mãi dự kiến áp dụng đến 23:59 | 30/11</small>
                            </header>
                            <div className="p-3">
                                <p className="leading-loose">Nhập mã VNPAYTGDD5 giảm từ 50,000đ đến 200,000đ (áp dụng tùy giá trị đơn hàng) khi thanh toán qua VNPAY-QR.</p>
                                <a className="link link-info">(Xem chi tiết tại đây)</a>
                            </div>
                        </div>

                        <div className="flex flex-row items-center">
                            <p className="text-sm"> <span className="font-bold"> +825 </span>  điểm tích lũy Quà Tặng VIP</p>
                            <TooltipProvider delayDuration={500}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" className="hover:bg-transparent w-fit">
                                            <CiCircleQuestion className="!w-5 !h-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="bg-white text-black leading-relaxed">
                                        <ul className="list-disc list-inside text-wrap">
                                            <li className="w-96">Đây là điểm tích lũy tạm tính khi mua sản phẩm này. Số điểm thực tế có thể thay đổi và sẽ được hiển thị chính xác sau khi Quý khách hoàn tất đặt hàng.</li>
                                            <li className="w-96">Tải app Quà Tặng VIP để tích và sử dụng điểm cho khách hàng thân thiết. Tìm hiểu thêm</li>
                                        </ul>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="divider my-1"></div>

                        <div className="flex flex-row gap-2 items-center justify-between">
                            <button className="btn btn-outline btn-info grow text-white uppercase">
                                <IoMdCart className="w-5 h-5" />
                                add to cart
                            </button>
                            <button className="btn btn-success text-white grow uppercase">buy now</button>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default ProductDetail;