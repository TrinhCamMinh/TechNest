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
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { fireBaseObject } from '@/features/product-crud';
import { Toaster, toast } from 'sonner';
import { FormMode } from '@/interfaces';
import { LIST_OF_CREATABLE_PRODUCT_OPTION } from '@/constants';
import { autoGenerateRandomID } from '@/lib/utils';
import DemoPage from '@/components/custom/payments/page';

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
  const [listOfProducts, setListOfProducts] = useState<any[]>([]);
  const [selectedInsertProductType, setSelectedProductType] = useState<String | null>(null);

  const fetchListOfProducts = async () => {
    const data = await fireBaseObject.getProducts();
    setListOfProducts(data);
  }

  useEffect(() => {
    const [isAuthenticate, userData] = useAuthenticate();
    if (!isAuthenticate) {
      console.info(`user has not been authenticated yet - ${isAuthenticate} - ${userData}`);
      navigate("/login");
      return;
    }
    fetchListOfProducts();
  }, [])

  const handleDeleteProduct = () => {
    try {
      const isConfirm = confirm("Are you sure want to delete product");
      if (!isConfirm) {
        alert("user has refuse to delete product");
        return;
      }
      // handle remove item from database here...
      fireBaseObject.deleteProduct("KgY4oO38MfIDTy1Bnbqp");
      toast.success("Delete product successfully");
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(`Error while deleting product`, {
        description: errorMessage
      });
    }
  }

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
        <div className="flex flex-col gap-2">
          <header className="text-center">
            <p className="uppercase font-bold">Products</p>
          </header>
          <main>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-center'>ID</TableHead>
                  <TableHead className='text-center'>Name</TableHead>
                  <TableHead className='text-center'>Category</TableHead>
                  <TableHead className='text-center'>Type</TableHead>
                  <TableHead className='text-center'>Price</TableHead>
                  <TableHead className='text-center'>CreatedAt</TableHead>
                  <TableHead className='text-center'>UpdatedAt</TableHead>
                  <TableHead className='text-center'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listOfProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="text-center font-medium">{product.id}</TableCell>
                    <TableCell className='text-center'>{product.name}</TableCell>
                    <TableCell className='text-center'>{product.category}</TableCell>
                    <TableCell className='text-center'>{product.product_type}</TableCell>
                    <TableCell className='text-center'>{product.price}</TableCell>
                    <TableCell className='text-center'>{product.createdAt.toDate().toDateString()}</TableCell>
                    <TableCell className='text-center'>{product.updatedAt.toDate().toDateString()}</TableCell>
                    <TableCell className='text-center'>
                      <div className='flex flex-row justify-center gap-10'>
                        <Link to={`detail/${product.id}?mode=${FormMode.VIEW.toLowerCase()}&product_type=${product.product_type}`}>
                          <button className="tooltip tooltip-success" data-tip="view">
                            <FaEye className='w-7 h-7 text-green-400' />
                          </button>
                        </Link>
                        <Link to={`detail/${product.id}?mode=${FormMode.UPDATE.toLowerCase()}&product_type=${product.product_type}`}>
                          <button className="tooltip tooltip-warning" data-tip="edit">
                            <FaPencilAlt className='w-7 h-7 text-yellow-400' />
                          </button>
                        </Link>
                        <button className="tooltip tooltip-error" data-tip="delete" onClick={handleDeleteProduct}>
                          <FaTrash className='w-7 h-7 text-red-400' />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={7} className='uppercase font-bold'>total no. of product</TableCell>
                  <TableCell className='text-center'>$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </main>
        </div>

        <div className="divider"></div>

        {/* Users Table */}
        <div className="flex flex-col gap-2">
          <header className="text-center">
            <p className="uppercase font-bold">users</p>
          </header>
          <main>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-center'>ID</TableHead>
                  <TableHead className='text-center'>Name</TableHead>
                  <TableHead className='text-center'>Category</TableHead>
                  <TableHead className='text-center'>CreatedAt</TableHead>
                  <TableHead className='text-center'>UpdatedAt</TableHead>
                  <TableHead className='text-center'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="text-center font-medium">{invoice.invoice}</TableCell>
                    <TableCell className='text-center'>{invoice.paymentStatus}</TableCell>
                    <TableCell className='text-center'>{invoice.paymentMethod}</TableCell>
                    <TableCell className='text-center'>{invoice.totalAmount}</TableCell>
                    <TableCell className='text-center'>{invoice.totalAmount}</TableCell>
                    <TableCell className='text-center'>
                      <div className='flex flex-row justify-center gap-10'>
                        <button className="tooltip tooltip-success" data-tip="view">
                          <FaEye className='w-7 h-7 text-green-400' />
                        </button>
                        <button className="tooltip tooltip-warning" data-tip="edit">
                          <FaPencilAlt className='w-7 h-7 text-yellow-400' />
                        </button>
                        <button className="tooltip tooltip-error" data-tip="delete">
                          <FaTrash className='w-7 h-7 text-red-400' />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} className='uppercase font-bold'>total no. of product</TableCell>
                  <TableCell className='text-center'>$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </main>
        </div>

        <div className="divider"></div>

        <DemoPage />
      </div>
    </>
  )
}

export default HomePage;