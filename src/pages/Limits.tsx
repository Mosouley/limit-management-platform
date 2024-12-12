import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/limits/FileUpload";

interface Limit {
  id: number;
  counterparty: string;
  limitType: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  status: "active" | "pending" | "expired";
  notes: string;
}

const Limits = () => {
  const [limits, setLimits] = useState<Limit[]>([]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newLimit = {
      id: limits.length + 1,
      counterparty: formData.get("counterparty") as string,
      limitType: formData.get("limitType") as string,
      amount: parseFloat(formData.get("amount") as string),
      currency: formData.get("currency") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      status: formData.get("status") as "active" | "pending" | "expired",
      notes: formData.get("notes") as string,
    };
    setLimits([...limits, newLimit]);
    toast({
      title: "Success",
      description: "Limit added successfully",
    });
  };

  const handleDelete = (id: number) => {
    setLimits(limits.filter((limit) => limit.id !== id));
    toast({
      title: "Success",
      description: "Limit deleted successfully",
    });
  };

  const handleUploadSuccess = (data: any[]) => {
    const newLimits = data.map((item, index) => ({
      ...item,
      id: limits.length + index + 1,
    }));
    setLimits([...limits, ...newLimits]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Credit Limits</h1>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Limit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Credit Limit</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="counterparty" className="text-sm font-medium">
                        Counterparty
                      </label>
                      <Select name="counterparty" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select counterparty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="counterparty1">Counterparty 1</SelectItem>
                          <SelectItem value="counterparty2">Counterparty 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="limitType" className="text-sm font-medium">
                        Limit Type
                      </label>
                      <Select name="limitType" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select limit type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="type1">Type 1</SelectItem>
                          <SelectItem value="type2">Type 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="amount" className="text-sm font-medium">
                        Amount
                      </label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="currency" className="text-sm font-medium">
                        Currency
                      </label>
                      <Select name="currency" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="startDate" className="text-sm font-medium">
                        Start Date
                      </label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="endDate" className="text-sm font-medium">
                        End Date
                      </label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="status" className="text-sm font-medium">
                        Status
                      </label>
                      <Select name="status" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="notes" className="text-sm font-medium">
                      Notes
                    </label>
                    <Textarea id="notes" name="notes" />
                  </div>
                  <Button type="submit" className="w-full">
                    Save Limit
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <FileUpload onUploadSuccess={handleUploadSuccess} />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Counterparty</TableHead>
                <TableHead>Limit Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {limits.map((limit) => (
                <TableRow key={limit.id}>
                  <TableCell>{limit.counterparty}</TableCell>
                  <TableCell>{limit.limitType}</TableCell>
                  <TableCell>{limit.amount.toLocaleString()}</TableCell>
                  <TableCell>{limit.currency}</TableCell>
                  <TableCell>{new Date(limit.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(limit.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${limit.status === 'active' ? 'bg-green-100 text-green-800' : 
                        limit.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {limit.status.charAt(0).toUpperCase() + limit.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(limit.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Limits;
