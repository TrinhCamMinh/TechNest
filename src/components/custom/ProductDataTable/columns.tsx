import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { fireBaseObject } from "@/features/product-crud"
import { FormMode } from "@/interfaces"
import { ColumnDef } from "@tanstack/react-table"
import { Timestamp } from "firebase/firestore"
import { ArrowUpDown } from "lucide-react"
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom"
import { Toaster, toast } from "sonner"

export const columns: ColumnDef<any>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "product_type",
        header: "Type",
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)

            return <div>{formatted}</div>
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    CreatedAt
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const createdAt: Timestamp = row.getValue("createdAt");
            const formatted = createdAt.toDate().toDateString();
            return <div>{formatted}</div>
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    UpdatedAt
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const updatedAt: Timestamp = row.getValue("updatedAt");
            const formatted = updatedAt.toDate().toDateString();
            return <div>{formatted}</div>
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const productId: string = row.getValue("id");
            const productType: string = row.getValue("product_type");

            const handleDeleteProduct = () => {
                try {
                    const isConfirm = confirm("Are you sure want to delete product");
                    if (!isConfirm) {
                        alert("user has refuse to delete product");
                        return;
                    }
                    // handle remove item from database here...
                    fireBaseObject.deleteProduct(productId);
                    toast.success("Delete product successfully");
                } catch (error) {
                    const errorMessage = (error as Error).message;
                    toast.error(`Error while deleting product`, {
                        description: errorMessage
                    });
                }
            }

            return (
                <>
                    <Toaster richColors position="top-right" />

                    <div className='flex flex-row justify-center items-center gap-4'>
                        <Link to={`detail/${productId}?mode=${FormMode.VIEW.toLowerCase()}&product_type=${productType}`}>
                            <button className="tooltip tooltip-success" data-tip="view">
                                <FaEye className='w-5 h-5 text-green-400' />
                            </button>
                        </Link>
                        <Link to={`detail/${productId}?mode=${FormMode.UPDATE.toLowerCase()}&product_type=${productType}`}>
                            <button className="tooltip tooltip-warning" data-tip="edit">
                                <FaPencilAlt className='w-5 h-5 text-yellow-400' />
                            </button>
                        </Link>
                        <button className="tooltip tooltip-error" data-tip="delete" onClick={handleDeleteProduct}>
                            <FaTrash className='w-5 h-5 text-red-400' />
                        </button>
                    </div>
                </>
            )
        },
    },
]
