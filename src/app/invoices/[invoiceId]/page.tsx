import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import Invoice from "./Invoice";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const invoiceId = Number.parseInt(await params.invoiceId);

  const { userId, orgId } = await auth();
  if (!userId) return;

  if (isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID:  " + invoiceId);
  }

  let result;

  if (orgId) {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(eq(Invoices.id, invoiceId), eq(Invoices.organizationId, orgId))
      )
      .limit(1);
  } else {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.userId, userId),
          isNull(Invoices.organizationId)
        )
      )
      .limit(1);
  }

  console.log("results", result);
  if (!result) {
    notFound();
  }

  const invoice = { ...result.invoices, customer: result.customers };
  return <Invoice invoice={invoice} />;
}
