"use client";
import { Badge } from "@/components/ui/badge";
import { Customers, Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import React from "react";
import { useOptimistic } from "react";
import Container from "@/components/Container";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, CreditCard, Ellipsis, Trash2 } from "lucide-react";
import { AVAILABLE_STATUSES } from "@/constants/invoices";
import { deleteInvoiceAction, updateStatusAction } from "@/app/actions";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

interface InvoiceProps {
  invoice: typeof Invoices.$inferSelect & {
    customer: typeof Customers.$inferSelect;
  };
}
export default function Invoice({ invoice }: InvoiceProps) {
  const [currentStatus, setCurrentStatus] = useOptimistic(
    invoice.status,
    (state, newStatus) => {
      return String(newStatus);
    }
  );
  async function handleOnUpdateStatus(formData: FormData) {
    const originalStatus = currentStatus;
    setCurrentStatus(formData.get("status"));
    try {
      /* await new Promise((resolve) => {
        setTimeout(() => {
          resolve(undefined);
        }, 2000);
      });
      throw new Error("Im making it fail"); */
      await updateStatusAction(formData);
    } catch (e) {
      setCurrentStatus(originalStatus);
    }
  }
  return (
    <main className=" h-full  ">
      <Container>
        <div className="flex justify-between mb-8">
          <h1 className="flex items-center gap-4 text-3xl font-semibold ">
            Invoice {invoice.id}
            <Badge
              className={cn(
                "rounded-full",
                invoice.status === "open" && "bg-blue-500",
                invoice.status === "paid" && "bg-green-600",
                invoice.status === "void" && "bg-zinc-700",
                invoice.status === "uncollectible" && "bg-red-600"
              )}
            >
              {invoice.status}
            </Badge>
          </h1>

          <p></p>
          <div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Change Status
                    <ChevronDown className="w-4 h-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {AVAILABLE_STATUSES.map((status) => {
                    return (
                      <DropdownMenuItem key={status.id}>
                        <form action={handleOnUpdateStatus}>
                          <input type="hidden" name="id" value={invoice.id} />
                          <input
                            type="hidden"
                            name="status"
                            value={status.id}
                          />
                          <button>{status.label}</button>
                        </form>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <span className="sr-only">More Option</span>
                      <Ellipsis className=" w-4 h-auto" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <DialogTrigger asChild>
                        <button className=" flex gap-2">
                          <Trash2 className="w-4 h-auto" />
                          Delete Invoice
                        </button>
                      </DialogTrigger>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Link
                        href={`/invoices/${invoice.id}/payment`}
                        className=" flex gap-2"
                      >
                        <CreditCard className="w-4 h-auto" />
                        Payment
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent>
                  <DialogHeader className=" gep-4">
                    <DialogTitle className="text-2xl">
                      Delete Invoice?
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your invoice and remove your data from our servers.
                    </DialogDescription>
                    <DialogFooter className="flex !justify-center">
                      <form action={deleteInvoiceAction}>
                        <input type="hidden" name="id" value={invoice.id} />
                        <Button variant="destructive" className=" flex gap-2">
                          <Trash2 className="w-4 h-auto" />
                          Delete Invoice
                        </Button>
                      </form>
                    </DialogFooter>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <p className="text-3xl mb-3">${(invoice.value / 100).toFixed(2)}</p>

        <p className="text-lg mb-8">{invoice.description}</p>

        <h2 className="font-bold text-lg mb-4">Billing Details</h2>

        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{invoice.id}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>
            <span>{new Date(invoice.createTs).toLocaleDateString()}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            <span>{invoice.customer.name}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            <span>{invoice.customer.email}</span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
