import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, LogOut, User, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import SupplierDashboard from "@/components/dashboards/SupplierDashboard";
import ManufacturerDashboard from "@/components/dashboards/ManufacturerDashboard";
import DistributorDashboard from "@/components/dashboards/DistributorDashboard";
import RetailerDashboard from "@/components/dashboards/RetailerDashboard";
import ConsumerDashboard from "@/components/dashboards/ConsumerDashboard";

interface User {
  email: string;
  role: string;
  id: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case "admin":
        return <AdminDashboard />;
      case "supplier":
        return <SupplierDashboard />;
      case "manufacturer":
        return <ManufacturerDashboard />;
      case "distributor":
        return <DistributorDashboard />;
      case "retailer":
        return <RetailerDashboard />;
      case "consumer":
        return <ConsumerDashboard />;
      default:
        return <SupplierDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Supply Chain Tracker</h1>
                <p className="text-sm text-muted-foreground capitalize">{user.role} Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right mr-2">
                <p className="text-sm font-medium text-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Dashboard;
