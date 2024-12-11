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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, FileText, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Counterparty {
  id: number;
  name: string;
  short_name: string;
  description: string;
  category: "non-group" | "group";
}

const Counterparties = () => {
  const [counterparties, setCounterparties] = useState<Counterparty[]>([]);
  const { toast } = useToast();

  const handleAddCounterparty = (formData: FormData) => {
    const newCounterparty = {
      id: counterparties.length + 1,
      name: formData.get("name") as string,
      short_name: formData.get("short_name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as "non-group" | "group",
    };
    setCounterparties([...counterparties, newCounterparty]);
    toast({
      title: "Success",
      description: "Counterparty added successfully",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here we would process the Excel file
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
          <h1 className="text-3xl font-bold">Counterparties</h1>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Counterparty
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Counterparty</DialogTitle>
                </DialogHeader>
                <form action={handleAddCounterparty} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" name="name" required />
                  </div>
                  <div>
                    <label htmlFor="short_name" className="text-sm font-medium">
                      Short Name
                    </label>
                    <Input id="short_name" name="short_name" required />
                  </div>
                  <div>
                    <label htmlFor="description" className="text-sm font-medium">
                      Description
                    </label>
                    <Textarea id="description" name="description" />
                  </div>
                  <div>
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="non-group">NON-GROUP</SelectItem>
                        <SelectItem value="group">GROUP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    Save Counterparty
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
              <TableHead>Name</TableHead>
              <TableHead>Short Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {counterparties.map((counterparty) => (
              <TableRow key={counterparty.id}>
                <TableCell>{counterparty.name}</TableCell>
                <TableCell>{counterparty.short_name}</TableCell>
                <TableCell>{counterparty.category}</TableCell>
                <TableCell>{counterparty.description}</TableCell>
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

export default Counterparties;