import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/layouts/AdminLayout";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
          <CardDescription>Manage your store details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input id="storeName" defaultValue="Shivpuriya Patra Bhandar" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeEmail">Email</Label>
            <Input id="storeEmail" type="email" defaultValue="info@shivpuriya.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storePhone">Phone</Label>
            <Input id="storePhone" type="tel" defaultValue="+91 1234567890" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Settings</CardTitle>
          <CardDescription>Configure shipping rates and zones</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Shipping configuration coming soon...</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>Manage payment gateways and methods</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Payment configuration coming soon...</p>
        </CardContent>
      </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
