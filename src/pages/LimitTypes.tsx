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
import { Plus, Upload, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LimitType {
  id: number;
  short_name: string;
  full_name: string;
  category: "balance-sheet" | "off-balance-sheet";
}

const LimitTypes = () => {
  const [limitTypes, setLimitTypes] = useState<LimitType[]>([]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newLimitType = {
      id: limitTypes.length + 1,
      short_name: formData.get("short_name") as string,
      full_name: formData.get("full_name") as string,
      category: formData.get("category") as "balance-sheet" | "off-balance-sheet",
    };
    setLimitTypes([...limitTypes, newLimitType]);
    toast({
      title: "Success",
      description: "Limit Type added successfully",
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
          <h1 className="text-3xl font-bold">Limit Types</h1>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Limit Type
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Limit Type</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="short_name" className="text-sm font-medium">
                      Short Name
                    </label>
                    <Input id="short_name" name="short_name" required />
                  </div>
                  <div>
                    <label htmlFor="full_name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Textarea id="full_name" name="full_name" required />
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
                        <SelectItem value="balance-sheet">BALANCE SHEET</SelectItem>
                        <SelectItem value="off-balance-sheet">OFF BALANCE SHEET</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    Save Limit Type
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
              <TableHead>Short Name</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {limitTypes.map((limitType) => (
              <TableRow key={limitType.id}>
                <TableCell>{limitType.short_name}</TableCell>
                <TableCell>{limitType.full_name}</TableCell>
                <TableCell>{limitType.category}</TableCell>
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

export default LimitTypes;