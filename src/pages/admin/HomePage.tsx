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
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";

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

  useEffect(() => {
    const [isAuthenticate, userData] = useAuthenticate();
    if (!isAuthenticate) {
      console.info(`user has not been authenticated yet - ${isAuthenticate} - ${userData}`);
      navigate("/login");
      return;
    }

    // handle with user data here
  }, [])

  const handleDeleteProduct = () => {
    const isConfirm = confirm("Are you sure want to delete product");
    if (!isConfirm) {
      alert("user has refuse to delete product");
    }
    // handle remove item from database here...
  }

  return (
    <div className="flex flex-col gap-4">
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
                      <Link to={'detail'}>
                        <button className="tooltip tooltip-success" data-tip="view">
                          <FaEye className='w-7 h-7 text-green-400' />
                        </button>
                      </Link>
                      <Link to={'detail'}>
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
                <TableCell colSpan={5} className='uppercase font-bold'>total no. of product</TableCell>
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
    </div>
  )
}

export default HomePage;