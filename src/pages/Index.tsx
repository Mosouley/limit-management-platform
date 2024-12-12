import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Building2, CreditCard, AlertTriangle, FileText, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const DashboardCard = ({ 
  title, 
  value, 
  icon: Icon,
  trend,
  trendValue 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ElementType;
  trend?: 'up' | 'down';
  trendValue?: string;
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="flex flex-col">
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Credit Limits Dashboard</h1>
          <div className="text-sm text-muted-foreground">
            Welcome back, Admin
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total Counterparties"
            value="256"
            icon={Building2}
            trend="up"
            trendValue="+12.5%"
          />
          <DashboardCard
            title="Active Limits"
            value="1,234"
            icon={CreditCard}
            trend="up"
            trendValue="+5.2%"
          />
          <DashboardCard
            title="Limit Exceptions"
            value="23"
            icon={AlertTriangle}
            trend="down"
            trendValue="-2.3%"
          />
          <DashboardCard
            title="Pending Approvals"
            value="45"
            icon={FileText}
            trend="up"
            trendValue="+8.1%"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Exposure Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-sm" />
                    <YAxis className="text-sm" />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0EA5E9" 
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4 text-sm">
                    <div className="min-w-[32px] min-h-[32px] rounded-full bg-muted flex items-center justify-center">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">New limit approved</p>
                      <p className="text-muted-foreground">Counterparty #{i}</p>
                    </div>
                    <div className="text-muted-foreground">2h ago</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;