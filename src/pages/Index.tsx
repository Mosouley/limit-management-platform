import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="mb-8 text-4xl font-bold">Welcome to the Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/counterparties">
            <Button className="w-full">Counterparties</Button>
          </Link>
          <Link to="/limit-types">
            <Button className="w-full">Limit Types</Button>
          </Link>
          <Link to="/exposures">
            <Button className="w-full">Exposures</Button>
          </Link>
          <Link to="/limits">
            <Button className="w-full">Limits</Button>
          </Link>
          <Link to="/beam-demo">
            <Button className="w-full">Beam Animation Demo</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;