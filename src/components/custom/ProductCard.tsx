import { formatCurrency, returnProductImagePath } from "@/lib/utils"
import { Timestamp } from "firebase/firestore"
import React from "react";
import ImagePlaceHolder from '@/assets/placeholder.svg';

const ProductCard = ({ name, price, type, createdAt }: { name: string, price: number, type: string, createdAt: Timestamp }) => {
    const imagePath: string = returnProductImagePath(type);
    return (
        <div className="card card-compact bg-base-100 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer">
            <figure>
                <img
                    src={imagePath}
                    alt={name}
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        e.currentTarget.onerror = null; // Prevents infinite loop if fallback also fails
                        e.currentTarget.src = ImagePlaceHolder; // Replace with your fallback image path
                    }}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {name}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <div className="card-actions justify-start">
                    <div className="badge badge-outline">{type}</div>
                    <div className="badge badge-outline">{createdAt.toDate().toDateString()}</div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <p className="text-2xl text-red-400 font-bold">{formatCurrency(price)}</p>
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard