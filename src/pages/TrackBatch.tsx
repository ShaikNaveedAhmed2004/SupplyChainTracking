import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, MapPin, Calendar, Hash, Shield, CheckCircle2 } from "lucide-react";

const mockEvents = [
  {
    id: 1,
    from: "Supplier Inc.",
    to: "Manufacturing Co.",
    location: "Warehouse A → Factory B",
    status: "CREATED",
    timestamp: "2024-01-15 10:30:00",
    txHash: "0x1234567890abcdef1234567890abcdef12345678",
    blockNumber: "18234567",
    verified: true,
  },
  {
    id: 2,
    from: "Manufacturing Co.",
    to: "Distribution Center",
    location: "Factory B → DC North",
    status: "IN_TRANSIT",
    timestamp: "2024-01-16 14:20:00",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    blockNumber: "18234892",
    verified: true,
  },
  {
    id: 3,
    from: "Distribution Center",
    to: "Retail Store",
    location: "DC North → Store #123",
    status: "DELIVERED",
    timestamp: "2024-01-17 09:15:00",
    txHash: "0x567890abcdef1234567890abcdef1234567890ab",
    blockNumber: "18235123",
    verified: true,
  },
];

const TrackBatch = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Batch Tracking</h1>
              <p className="text-sm text-muted-foreground font-mono">{batchId}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Product</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Organic Cotton Fabric</div>
              <p className="text-xs text-muted-foreground">500 units</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Status</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge className="bg-success text-success-foreground">DELIVERED</Badge>
              <p className="text-xs text-muted-foreground mt-1">Store #123</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{mockEvents.length}</div>
              <p className="text-xs text-muted-foreground">Blockchain events</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verification</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blockchain-verified" />
                <span className="text-sm font-medium">Verified</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">All events on-chain</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Journey</CardTitle>
            <CardDescription>Complete history of batch movement with blockchain verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockEvents.map((event, index) => (
                <div key={event.id} className="relative pl-8 pb-6 border-l-2 border-primary/20 last:border-l-0 last:pb-0">
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {event.from} → {event.to}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </p>
                      </div>
                      <Badge className="bg-success text-success-foreground">
                        {event.status.replace("_", " ")}
                      </Badge>
                    </div>

                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{event.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 font-mono text-xs bg-muted/50 p-2 rounded">
                        <Hash className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">TX:</span>
                        <span className="text-foreground">{event.txHash}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 font-mono text-xs bg-muted/50 p-2 rounded">
                        <span className="text-muted-foreground">Block:</span>
                        <span className="text-foreground">{event.blockNumber}</span>
                        {event.verified && (
                          <Badge variant="outline" className="ml-auto border-blockchain-verified text-blockchain-verified">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TrackBatch;
