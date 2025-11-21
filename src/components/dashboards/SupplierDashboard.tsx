import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Package, Plus, List, ShoppingBag } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BatchList from "@/components/BatchList";

const SupplierDashboard = () => {
  const { toast } = useToast();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [batchQuantity, setBatchQuantity] = useState("");
  const [showBatchDialog, setShowBatchDialog] = useState(false);

  const handleCreateProduct = () => {
    if (!productName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a product name",
        variant: "destructive",
      });
      return;
    }

    const txHash = "0x" + Math.random().toString(36).substring(2, 15);
    
    toast({
      title: "Product Created",
      description: `Product "${productName}" created successfully. Blockchain TX: ${txHash}`,
    });

    setProductName("");
    setProductDescription("");
  };

  const handleCreateBatch = () => {
    if (!batchQuantity || parseInt(batchQuantity) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid quantity",
        variant: "destructive",
      });
      return;
    }

    const txHash = "0x" + Math.random().toString(36).substring(2, 15);
    
    toast({
      title: "Batch Created",
      description: `New batch created with ${batchQuantity} units. Blockchain TX: ${txHash}`,
    });

    setBatchQuantity("");
    setShowBatchDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Currently in supply chain</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blockchain TXs</CardTitle>
            <List className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">All verified on-chain</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create New Product</CardTitle>
            <CardDescription>Register a new product in the supply chain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                placeholder="e.g., Organic Cotton Fabric"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="productDescription">Description</Label>
              <Textarea
                id="productDescription"
                placeholder="Product details and specifications"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>

            <Button onClick={handleCreateProduct} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Create Product
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create New Batch</CardTitle>
            <CardDescription>Create a batch for an existing product</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="batchProduct">Select Product</Label>
              <Input
                id="batchProduct"
                placeholder="Search products..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={batchQuantity}
                onChange={(e) => setBatchQuantity(e.target.value)}
              />
            </div>

            <Button onClick={handleCreateBatch} className="w-full">
              <Package className="w-4 h-4 mr-2" />
              Create Batch
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Batches</CardTitle>
          <CardDescription>Track all batches you've created</CardDescription>
        </CardHeader>
        <CardContent>
          <BatchList />
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierDashboard;
