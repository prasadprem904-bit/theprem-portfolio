import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin/orders")({
  component: OrdersPage,
});

const orders = [
  { id: "#10241", customer: "Acme Inc.", total: "$1,240.00", status: "Paid", date: "Nov 04, 2026" },
  { id: "#10240", customer: "Globex", total: "$820.00", status: "Refunded", date: "Nov 03, 2026" },
  { id: "#10239", customer: "Umbrella Co.", total: "$3,400.00", status: "Paid", date: "Nov 02, 2026" },
  { id: "#10238", customer: "Initech", total: "$210.00", status: "Pending", date: "Nov 01, 2026" },
  { id: "#10237", customer: "Hooli", total: "$5,900.00", status: "Paid", date: "Oct 31, 2026" },
];

const badge: Record<string, string> = {
  Paid: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Refunded: "bg-muted text-muted-foreground border-border",
};

function OrdersPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Orders</h1>
        <p className="text-sm text-muted-foreground">Recent purchases and invoice status.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent orders</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{o.id}</TableCell>
                    <TableCell>{o.customer}</TableCell>
                    <TableCell>{o.total}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${badge[o.status]}`}>
                        {o.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{o.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}