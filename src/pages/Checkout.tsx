import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    Razorpay: any;
    recaptchaVerifier: any;
  }
}

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  useEffect(() => {
    checkAuthAndFetchCart();
    fetchAddresses();
    loadRazorpayScript();
  }, []);

  const loadRazorpayScript = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };

  const checkAuthAndFetchCart = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        variant: "destructive",
        title: t('error') || "Error",
        description: "Please login to place an order",
      });
      navigate('/auth');
      return;
    }

    // Fetch cart items
    try {
      const { data: items, error } = await supabase
        .from('carts')
        .select('*, products(*)')
        .eq('user_id', session.user.id);

      if (error) throw error;

      setCartItems(items || []);
      
      // Calculate total
      const total = (items || []).reduce((sum, item) => {
        return sum + ((item.products?.price || 0) * item.quantity);
      }, 0);
      setTotalAmount(total);
    } catch (error: any) {
      console.error('Error fetching cart:', error);
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
      
      if (data && data.length > 0) {
        setAddresses(data);
        const defaultAddress = data.find(addr => addr.is_default);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress.id);
          const addr = defaultAddress;
          setFormData({
            fullName: addr.full_name,
            phone: addr.phone,
            address: addr.address_line1 + (addr.address_line2 ? `, ${addr.address_line2}` : ''),
            city: addr.city,
            state: addr.state,
            pincode: addr.pincode,
          });
        }
      }
    } catch (error: any) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
    const address = addresses.find(addr => addr.id === addressId);
    if (address) {
      setFormData({
        ...formData,
        fullName: address.full_name,
        phone: address.phone,
        address: address.address_line1 + (address.address_line2 ? `, ${address.address_line2}` : ''),
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      });
    }
  };

  const initiatePayment = async (orderId: string, orderNumber: string) => {
    const options = {
      key: "rzp_test_vWJpFZ9vMELa7Y", // Replace with your Razorpay key
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      name: "Shivpuriya Patra Bhandar",
      description: `Order ${orderNumber}`,
      order_id: orderId,
      handler: async function (response: any) {
        try {
          // Update order with payment details
          const { error } = await supabase
            .from('orders')
            .update({
              payment_status: 'completed',
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              status: 'confirmed',
            })
            .eq('id', orderId);

          if (error) throw error;

          // Clear cart
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            await supabase
              .from('carts')
              .delete()
              .eq('user_id', session.user.id);
          }

          toast({
            title: t('paymentSuccess') || "Payment Successful!",
            description: t('orderConfirmed') || "Your order has been confirmed.",
          });

          navigate("/orders");
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: t('error') || "Error",
            description: error.message,
          });
        }
      },
      prefill: {
        name: formData.fullName,
        contact: formData.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          variant: "destructive",
          title: t('error') || "Error",
          description: "Please login to place an order",
        });
        navigate('/auth');
        return;
      }

      // Generate order number
      const orderNumber = `ORD${Date.now()}`;

      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: session.user.id,
          order_number: orderNumber,
          total_amount: totalAmount,
          shipping_address: {
            fullName: formData.fullName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            phone: formData.phone,
          },
          status: 'pending',
          payment_status: 'pending',
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products?.price || 0,
        total_price: (item.products?.price || 0) * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Initiate Razorpay payment
      initiatePayment(order.id, orderNumber);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t('error') || "Error",
        description: error.message || "Failed to place order",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">{t('checkout') || 'Checkout'}</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('shippingDetails') || 'Shipping Details'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {addresses.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <Label>{t('selectAddress') || 'Select Saved Address'}</Label>
                      <RadioGroup value={selectedAddress} onValueChange={handleAddressSelect}>
                        {addresses.map((address) => (
                          <div key={address.id} className="flex items-start space-x-2 border rounded-lg p-3">
                            <RadioGroupItem value={address.id} id={address.id} />
                            <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                              <div className="space-y-1">
                                <p className="font-semibold">{address.full_name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {address.address_line1}
                                  {address.address_line2 && `, ${address.address_line2}`}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {address.city}, {address.state} - {address.pincode}
                                </p>
                                <p className="text-sm text-muted-foreground">{address.phone}</p>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      <p className="text-sm text-muted-foreground">
                        {t('orEnterNew') || 'Or enter a new address below'}
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t('fullName') || 'Full Name'}</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                    <Label htmlFor="address">{t('address')}</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
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

                  <Button type="submit" className="w-full mt-6" disabled={loading}>
                    {loading ? (t('processing') || 'Processing...') : (t('placeOrder') || 'Place Order')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t('orderSummary') || 'Order Summary'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{t('subtotal') || 'Subtotal'}</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('shipping') || 'Shipping'}</span>
                  <span>{t('free') || 'Free'}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>{t('total') || 'Total'}</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
