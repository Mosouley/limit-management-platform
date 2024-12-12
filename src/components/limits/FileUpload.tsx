import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { parseExcelFile, validateExcelFile } from "@/utils/fileUpload";

interface FileUploadProps {
  onUploadSuccess: (data: any[]) => void;
}

export const FileUpload = ({ onUploadSuccess }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateExcelFile(file)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an Excel file (.xlsx or .xls)",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const data = await parseExcelFile(file);
      onUploadSuccess(data);
      toast({
        title: "Upload successful",
        description: "Excel file has been processed successfully",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to process Excel file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset the input
      event.target.value = '';
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className="hidden"
        id="excel-upload"
        disabled={isUploading}
      />
      <label htmlFor="excel-upload">
        <Button
          variant="outline"
          className="cursor-pointer"
          disabled={isUploading}
        >
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? "Processing..." : "Upload Excel"}
        </Button>
      </label>
    </div>
  );
};