import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

interface AddressFormProps {
  address?: {
    id: string;
    full_name: string;
    phone: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    pincode: string;
    is_default: boolean;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

export const AddressForm = ({ address, onSuccess, onCancel }: AddressFormProps) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: address?.full_name || "",
    phone: address?.phone || "",
    address_line1: address?.address_line1 || "",
    address_line2: address?.address_line2 || "",
    city: address?.city || "",
    state: address?.state || "",
    pincode: address?.pincode || "",
    is_default: address?.is_default || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      if (address) {
        // Update existing address
        const { error } = await supabase
          .from('addresses')
          .update(formData)
          .eq('id', address.id);

        if (error) throw error;
      } else {
        // Create new address
        const { error } = await supabase
          .from('addresses')
          .insert([{ ...formData, user_id: session.user.id }]);

        if (error) throw error;
      }

      toast({
        title: t('success') || "Success",
        description: address 
          ? t('addressUpdated') || "Address updated successfully"
          : t('addressAdded') || "Address added successfully",
      });

      onSuccess();
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="full_name">{t('fullName') || 'Full Name'}</Label>
        <Input
          id="full_name"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t('phone') || 'Phone'}</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address_line1">{t('addressLine1') || 'Address Line 1'}</Label>
        <Input
          id="address_line1"
          value={formData.address_line1}
          onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address_line2">{t('addressLine2') || 'Address Line 2 (Optional)'}</Label>
        <Input
          id="address_line2"
          value={formData.address_line2}
          onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">{t('city') || 'City'}</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">{t('state') || 'State'}</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pincode">{t('pincode') || 'Pincode'}</Label>
          <Input
            id="pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_default"
          checked={formData.is_default}
          onCheckedChange={(checked) => 
            setFormData({ ...formData, is_default: checked as boolean })
          }
        />
        <Label htmlFor="is_default">{t('setAsDefault') || 'Set as default address'}</Label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? (t('saving') || 'Saving...') : (t('save') || 'Save')}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('cancel') || 'Cancel'}
        </Button>
      </div>
    </form>
  );
};
