import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { User, MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { AddressForm } from "@/components/AddressForm";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
  });
  const [addresses, setAddresses] = useState<any[]>([]);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [showAddressDialog, setShowAddressDialog] = useState(false);

  useEffect(() => {
    checkAuthAndFetchProfile();
    fetchAddresses();
  }, []);

  const checkAuthAndFetchProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setProfile({
          full_name: data.full_name || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t('error') || "Error",
        description: error.message,
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
        })
        .eq('id', session.user.id);

      if (error) throw error;

      toast({
        title: t('success') || "Success",
        description: t('profileUpdated') || "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t('error') || "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', session.user.id)
        .order('is_default', { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error: any) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId);

      if (error) throw error;

      toast({
        title: t('success') || "Success",
        description: t('addressDeleted') || "Address deleted successfully",
      });

      fetchAddresses();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t('error') || "Error",
        description: error.message,
      });
    }
  };

  const handleAddressSuccess = () => {
    setShowAddressDialog(false);
    setEditingAddress(null);
    fetchAddresses();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center space-x-3 mb-8">
          <User className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">{t('myProfile')}</h1>
        </div>
        
        <div className="max-w-4xl space-y-6">
          {/* Personal Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t('personalInformation') || 'Personal Information'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('fullName') || 'Full Name'}</Label>
                  <Input
                    id="fullName"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-sm text-muted-foreground">
                    {t('emailCannotChange') || 'Email cannot be changed'}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full mt-6" disabled={loading}>
                  {loading ? (t('saving') || 'Saving...') : (t('saveChanges') || 'Save Changes')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Addresses Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle>{t('savedAddresses') || 'Saved Addresses'}</CardTitle>
              </div>
              <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
                <DialogTrigger asChild>
                  <Button 
                    size="sm" 
                    onClick={() => {
                      setEditingAddress(null);
                      setShowAddressDialog(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t('addAddress') || 'Add Address'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingAddress 
                        ? (t('editAddress') || 'Edit Address')
                        : (t('addNewAddress') || 'Add New Address')}
                    </DialogTitle>
                  </DialogHeader>
                  <AddressForm
                    address={editingAddress}
                    onSuccess={handleAddressSuccess}
                    onCancel={() => {
                      setShowAddressDialog(false);
                      setEditingAddress(null);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {addresses.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  {t('noAddresses') || 'No saved addresses yet'}
                </p>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div 
                      key={address.id} 
                      className="border rounded-lg p-4 relative"
                    >
                      {address.is_default && (
                        <span className="absolute top-2 right-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                          {t('default') || 'Default'}
                        </span>
                      )}
                      <div className="space-y-1">
                        <p className="font-semibold">{address.full_name}</p>
                        <p className="text-sm">{address.phone}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.address_line1}
                          {address.address_line2 && `, ${address.address_line2}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingAddress(address);
                            setShowAddressDialog(true);
                          }}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          {t('edit') || 'Edit'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {t('delete') || 'Delete'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
