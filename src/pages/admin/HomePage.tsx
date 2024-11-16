import { useAuthenticate } from '@/hooks';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup
} from "@/components/ui/select"
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { Toaster, toast } from 'sonner';
import { FormMode } from '@/interfaces';
import { LIST_OF_CREATABLE_PRODUCT_OPTION } from '@/constants';
import { autoGenerateRandomID } from '@/lib/utils';
import ProductDataTable from '@/components/custom/ProductDataTable/page';
import UserDataTable from '@/components/custom/UserDataTable/page'

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

const HomePage = () => {
  const navigate = useNavigate();
  const generatedId: string = autoGenerateRandomID(6);
  const [selectedInsertProductType, setSelectedProductType] = useState<String | null>(null);

  useEffect(() => {
    const [isAuthenticate, userData] = useAuthenticate();
    if (!isAuthenticate) {
      console.info(`user has not been authenticated yet - ${isAuthenticate} - ${userData}`);
      navigate("/login");
      return;
    }
  }, [])

  const handleSelectInsertProductType = (selectedOption: string) => {
    console.log(`user has selected: ${selectedOption}`);
    try {
      setSelectedProductType(selectedOption);
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(`Error while selecting product type`, {
        description: errorMessage
      });
    }
  }

  const handleCreateNewProduct = () => {
    try {
      const mode: string = FormMode.CREATE.toLowerCase();
      setSelectedProductType(selectedInsertProductType);
      navigate(`detail/${generatedId}?mode=${mode}&product_type=${selectedInsertProductType}`)
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(`Error while selecting product type`, {
        description: errorMessage
      });
    }
  }

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="flex flex-col gap-4 container mt-4">
        <div>
          <Select onValueChange={handleSelectInsertProductType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a product to insert" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Products</SelectLabel>
                {LIST_OF_CREATABLE_PRODUCT_OPTION.map((product) => {
                  return (
                    <SelectItem key={product.value} value={product.value}>{product.name}</SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <button
            className="btn btn-success uppercase text-white w-full my-4"
            disabled={selectedInsertProductType === null}
            onClick={handleCreateNewProduct}
          >
            create new product
          </button>
        </div>

        {/* Products Table */}
        <ProductDataTable />

        <div className="divider"></div>

        {/* Users Table */}
        <UserDataTable />
      </div>
    </>
  )
}

export default HomePage;