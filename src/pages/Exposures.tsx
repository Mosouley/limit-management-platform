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
import { Plus, Upload, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Exposure {
  id: number;
  counterparty: string;
  limit_type: string;
  exposure_amount: number;
  last_updated: string;
}

const Exposures = () => {
  const [exposures, setExposures] = useState<Exposure[]>([]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newExposure = {
      id: exposures.length + 1,
      counterparty: formData.get("counterparty") as string,
      limit_type: formData.get("limit_type") as string,
      exposure_amount: parseFloat(formData.get("exposure_amount") as string),
      last_updated: new Date().toISOString(),
    };
    setExposures([...exposures, newExposure]);
    toast({
      title: "Success",
      description: "Exposure added successfully",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Upload",
        description: "Excel file processing would be implemented here",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Exposures</h1>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Exposure
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Exposure</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <label htmlFor="limit_type" className="text-sm font-medium">
                      Limit Type
                    </label>
                    <Select name="limit_type" required>
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
                    <label htmlFor="exposure_amount" className="text-sm font-medium">
                      Exposure Amount
                    </label>
                    <Input
                      id="exposure_amount"
                      name="exposure_amount"
                      type="number"
                      step="0.01"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Save Exposure
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <div className="relative">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="excel-upload"
              />
              <label htmlFor="excel-upload">
                <Button variant="outline" className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Excel
                </Button>
              </label>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Counterparty</TableHead>
              <TableHead>Limit Type</TableHead>
              <TableHead>Exposure Amount</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exposures.map((exposure) => (
              <TableRow key={exposure.id}>
                <TableCell>{exposure.counterparty}</TableCell>
                <TableCell>{exposure.limit_type}</TableCell>
                <TableCell>{exposure.exposure_amount}</TableCell>
                <TableCell>{new Date(exposure.last_updated).toLocaleString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
};

export default Exposures;