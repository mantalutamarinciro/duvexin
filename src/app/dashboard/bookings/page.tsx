import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const bookings = [
  { id: "MOV-001", customer: "Liam Johnson", date: "2024-08-15", status: "Scheduled", total: 250.00 },
  { id: "MOV-002", customer: "Olivia Smith", date: "2024-08-16", status: "In Progress", total: 150.00 },
  { id: "MOV-003", customer: "Noah Williams", date: "2024-08-17", status: "Completed", total: 350.00 },
  { id: "MOV-004", customer: "Emma Brown", date: "2024-08-18", status: "Scheduled", total: 450.00 },
  { id: "MOV-005", customer: "Ava Jones", date: "2024-08-19", status: "Cancelled", total: 550.00 },
  { id: "MOV-006", customer: "James Brown", date: "2024-08-20", status: "Scheduled", total: 280.00 },
  { id: "MOV-007", customer: "Sophia Davis", date: "2024-08-21", status: "Completed", total: 720.00 },
]

const getBadgeVariant = (status: string) => {
    switch (status) {
        case "Scheduled": return "secondary";
        case "In Progress": return "default";
        case "Completed": return "outline";
        case "Cancelled": return "destructive";
        default: return "secondary";
    }
}

export default function BookingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Bookings</h1>
        <Button>
          <PlusCircle className="mr-2" />
          New Booking
        </Button>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Upcoming and Recent Moves</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Move ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings.map((booking) => (
                <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.customer}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>
                    <Badge variant={getBadgeVariant(booking.status)}>{booking.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">${booking.total.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Assign Team</DropdownMenuItem>
                        <DropdownMenuItem>Send Update</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Cancel Move</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}
