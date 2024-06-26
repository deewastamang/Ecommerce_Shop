"use client";
import DataTable from "@/components/adminComponents/products/ProductDataTable";
import { useGetProductsQuery } from "@/features/productSlice/product.slice";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import GlobalError from "@/app/global-error";
import { ImFilesEmpty } from "react-icons/im";;
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import DeleteProductDialog from "@/components/adminComponents/products/DeleteProductDialog";
import UpdateProductModal from "@/components/adminComponents/products/UpdateProductModal";
import { dateFormatter } from "@/helper";
import { Badge } from "@/components/ui/badge";

const AdminProductsPage = () => {
  document.title = "Admin | Products"
  const { data: products, error, isLoading, refetch } = useGetProductsQuery();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDeleteRowClick = (product) => {
    setSelectedRow(product);
    setIsDeleteModalOpen(true);
  };
  const handleEditRowClick = (product) => {
    setSelectedRow(product);
    setEditModalOpen(true);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const columns = [
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
      accessorKey: "_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <IoKeyOutline />
            Product ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const productId = getValue();
        return (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                <Badge variant="adminTable">
                  <ImFilesEmpty className="mr-2" /> 
                  {productId.substring(0,5)}...
                </Badge>
                </TooltipTrigger>
                <TooltipContent className="w-60 bg-white rounded">
                  <p className="">{productId}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <MdOutlineSubtitles className="text-lg" />
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const title = getValue();
        return <span className=""> {title}</span>;
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <MdOutlineDescription />
            Description
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const description = getValue();
        return (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {description.substring(0, 10)}...
                </TooltipTrigger>
                <TooltipContent className="w-48 bg-white rounded">
                  <p className="">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        );
      },
      enableResizing: false,
      size: 800,
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <IoPricetagOutline/>
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const price = getValue();
        return (
          <Badge variant="adminTable">
            NPR {price.toFixed(2)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "oldPrice",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <IoPricetagOutline/>
            Old Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const price = getValue();
        return (
          <Badge variant="adminTable">
          NPR {price.toFixed(2)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <TbCategory />
            Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const category = getValue();
        return (
          <>
          <Badge variant="adminTable">
            {category === "women" ? (
              <span className="text-pink-600">Women</span>
            ) : category === "men" ? (
              <span className="text-blue-600">Men</span>
            ) : (
              <span className="text-orange-600">{category}</span>
            )}

          </Badge>
          </>
        );
      },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <IoStorefrontOutline />
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const inStock = getValue();
        return (
          <>
            {inStock > 0 ? (
              <span className="text-green-700 font-medium">{inStock}</span>
            ) : (
              <span className="text-red-600 font-medium">N/A</span>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <MdOutlineDateRange />
            Added at
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const dateString = getValue();
        const date = dateString
          ? dateFormatter(dateString).substring(0, 10)
          : null;
        const time = dateString
          ? dateFormatter(dateString).substring(11, 27)
          : null;
        return (
          <>
            {dateString ? (
              <div className="flex flex-col ">
              <div className="font-medium text-black">{date}</div>
              <div className="text-slate-500 font-medium text-xs">{time}</div>
            </div>
            ) : (
              <span className="text-red-600 font-medium">N/A</span>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex gap-x-1"
          >
            <MdOutlineDateRange />
            Updated at
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row, getValue }) => {
        const dateString = getValue();
        const date = dateString
          ? dateFormatter(dateString).substring(0, 10)
          : null;
        const time = dateString
          ? dateFormatter(dateString).substring(11, 27)
          : null;
        return (
          <>
            {dateString ? (
              <div className="flex flex-col ">
                <div className="font-medium text-black">{date}</div>
                <div className="text-slate-500 font-medium text-xs">{time}</div>
              </div>
            ) : (
              <span className="text-red-600 font-medium">N/A</span>
            )}
          </>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const singleRowData = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white rounded">
              <DropdownMenuItem
                className="text-green-600"
                onClick={() => handleEditRowClick(singleRowData)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDeleteRowClick(singleRowData)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <GlobalError />;
  }
  return (
    <div>
      <UpdateProductModal
        isOpen={isEditModalOpen}
        selectedRow={selectedRow}
        closeEditModal={() => setEditModalOpen(false)}
        refetch={refetch}
      />
      <DeleteProductDialog
        isOpen={isDeleteModalOpen}
        selectedRow={selectedRow}
        closeDeleteModal={() => setIsDeleteModalOpen(false)}
        refetch={refetch}
      />
      <DataTable data={products?.data} columns={columns} refetch={refetch} />
    </div>
  );
};

export default AdminProductsPage;
