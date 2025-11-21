import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockBatches = [
  {
    id: "BATCH-001",
    product: "Organic Cotton Fabric",
    quantity: 500,
    status: "IN_TRANSIT",
    location: "Warehouse A",
    createdAt: "2024-01-15",
    txHash: "0x1234...5678",
  },
  {
    id: "BATCH-002",
    product: "Polyester Thread",
    quantity: 1000,
    status: "DELIVERED",
    location: "Manufacturer Site",
    createdAt: "2024-01-12",
    txHash: "0xabcd...efgh",
  },
  {
    id: "BATCH-003",
    product: "Silk Blend Fabric",
    quantity: 250,
    status: "CREATED",
    location: "Origin Point",
    createdAt: "2024-01-18",
    txHash: "0x9876...5432",
  },
];

const statusColors = {
  CREATED: "bg-secondary text-secondary-foreground",
  IN_TRANSIT: "bg-warning text-warning-foreground",
  DELIVERED: "bg-success text-success-foreground",
  SOLD: "bg-primary text-primary-foreground",
};

const BatchList = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Batch ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockBatches.map((batch) => (
            <TableRow key={batch.id}>
              <TableCell className="font-mono text-sm">{batch.id}</TableCell>
              <TableCell>{batch.product}</TableCell>
              <TableCell>{batch.quantity} units</TableCell>
              <TableCell>
                <Badge className={statusColors[batch.status as keyof typeof statusColors]}>
                  {batch.status.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell>{batch.location}</TableCell>
              <TableCell>{new Date(batch.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/track/${batch.id}`)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Track
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BatchList;
