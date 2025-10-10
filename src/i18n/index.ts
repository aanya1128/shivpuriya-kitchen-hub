import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      shop: "Shop",
      about: "About Us",
      contact: "Contact",
      
      // Auth
      login: "Login",
      signup: "Sign Up",
      logout: "Sign Out",
      myProfile: "My Profile",
      adminPanel: "Admin Panel",
      
      // Shop
      searchProducts: "Search products...",
      sortBy: "Sort by",
      filterBy: "Filter by",
      priceRange: "Price Range",
      category: "Category",
      addToCart: "Add to Cart",
      addToWishlist: "Add to Wishlist",
      
      // Common
      name: "Name",
      email: "Email",
      phone: "Phone",
      address: "Address",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      back: "Back",
      explore: "Explore",
      viewAllCategories: "View All Categories",
      
      // Search & Filter
      searchPlaceholder: "Search products...",
      priceFilter: "Price Filter",
      categoryFilter: "Category Filter",
      sortOptions: "Sort Options",
      
      // Contact Page
      getInTouch: "Get in Touch",
      contactInformation: "Contact Information",
      sendMessage: "Send us a Message",
      firstName: "First Name",
      lastName: "Last Name",
      subject: "Subject",
      message: "Message",
      sendingMessage: "Sending...",
      
      // Product Management
      addProduct: "Add Product",
      editProduct: "Edit Product",
      productName: "Product Name",
      description: "Description",
      price: "Price",
      comparePrice: "Compare Price",
      stockQuantity: "Stock Quantity",
      material: "Material",
      sku: "SKU",
      weight: "Weight",
      tags: "Tags",
      images: "Images",
      status: "Status",
      productFeatured: "Featured",
      active: "Active",
      inactive: "Inactive",
      outOfStock: "Out of Stock",
      
      // Categories
      copperware: "Copperware",
      steelware: "Steelware",
      brassware: "Brassware",
      poojaessentials: "Pooja Essentials",
      cutlery: "Cutlery",
      homeessentials: "Home Essentials",
      kitchensupplies: "Kitchen Supplies",
      schoolessentials: "School Essentials",
      giftsets: "Gift Sets",
      
      // Hero
      trustedSince: "Trusted Since 1985 • Kalapipal, Madhya Pradesh",
      welcomeTo: "Welcome to",
      heroSubheading: "Discover authentic brass, copper, and steel utensils crafted with tradition. Your trusted destination for premium cookware and modern kitchen solutions.",
      shopNow: "Shop Now",
      learnMore: "Learn More",
      
      // Shop Page
      allCategories: "All Categories",
      productsFound: "products found",
      noProductsFound: "No products found matching your criteria",
      sortByName: "Name A-Z",
      sortByPriceLow: "Price: Low to High",
      sortByPriceHigh: "Price: High to Low",
      sortByNewest: "Newest",
      sortByPopular: "Most Popular",
      featured: "Featured",
      
      // Cart & Wishlist
      viewCart: "View Cart",
      viewWishlist: "View Wishlist",
      removeFromCart: "Remove from cart",
      removeFromWishlist: "Remove from wishlist",
      
      // Footer
      quickLinks: "Quick Links",
      followUs: "Follow Us",
      copyright: "© 2024 Shivpuriya Patra Bhandar. All rights reserved.",
      
      // Admin
      dashboard: "Dashboard",
      totalUsers: "Total Users",
      totalOrders: "Total Orders",
      totalProducts: "Total Products",
      totalRevenue: "Total Revenue",
      recentOrders: "Recent Orders",
      productsManagement: "Products Management",
      customerManagement: "Customer Management",
      analytics: "Analytics",
      orders: "Orders",
      products: "Products",
      customers: "Customers",
      coupons: "Coupons",
      settings: "Settings",
      
      // Company
      companyName: "Shivpuriya Patra Bhandar",
      
      // Checkout & Orders
      checkout: "Checkout",
      shippingDetails: "Shipping Details",
      fullName: "Full Name",
      city: "City",
      state: "State",
      pincode: "Pincode",
      orderSummary: "Order Summary",
      subtotal: "Subtotal",
      shipping: "Shipping",
      free: "Free",
      total: "Total",
      processing: "Processing...",
      placeOrder: "Place Order",
      orderPlaced: "Order Placed!",
      orderSuccess: "Your order has been successfully placed.",
      myOrders: "My Orders",
      noOrders: "No orders found",
      orderNumber: "Order",
      paymentStatus: "Payment Status",
      
      // Account Settings
      accountSettings: "Account Settings",
      personalInformation: "Personal Information",
      emailCannotChange: "Email cannot be changed",
      saving: "Saving...",
      saveChanges: "Save Changes",
      success: "Success",
      profileUpdated: "Profile updated successfully",
      error: "Error",
      
      // Footer - Additional
      stayUpdated: "Stay Updated",
      enterEmail: "Enter your email",
      contactUs: "Contact Us",
      shippingInfo: "Shipping Info",
      returnPolicy: "Return Policy",
      trackOrder: "Track Order",
      sizeGuide: "Size Guide",
      bulkOrders: "Bulk Orders",
      customerServices: "Customer Services",
      helpCenter: "Help Center",
      contactSupport: "Contact Support",
      privacyPolicy: "Privacy Policy",
      termsConditions: "Terms & Conditions",
      faqs: "FAQs",
      warranty: "Warranty",
      trustedPartner: "Your trusted partner for authentic utensils and modern kitchen solutions. Serving quality products with traditional values and modern convenience since 1985.",
      
      // About Page
      aboutTitle: "About Shivpuriya Patra Bhandar",
      aboutDescription: "Established in 1985 in the heart of Kalapipal, Madhya Pradesh, we have been serving families with authentic brass, copper, and steel utensils for nearly four decades.",
      ourStory: "Our Story",
      whyChooseUs: "Why Choose Us?",
      ourValues: "Our Values",
      ourJourney: "Our Journey",
      qualityFirst: "Quality First",
      customerCentric: "Customer Centric",
      traditionalValues: "Traditional Values",
      familyBusiness: "Family Business",
      storyPara1: "What started as a small shop in Kalapipal has grown into a trusted name across Madhya Pradesh. Our founder's vision was simple: to provide every household with quality utensils that blend traditional craftsmanship with modern functionality.",
      storyPara2: "Today, we continue this legacy by offering a wide range of products from authentic brass and copper cookware to contemporary kitchen appliances, lunch boxes, and water bottles. Each product reflects our commitment to quality and customer satisfaction.",
      storyPara3: "Our deep roots in Indian culture and traditions guide us in selecting products that not only meet your daily needs but also connect you with our rich heritage.",
      whyPoint1: "Authentic products sourced directly from trusted manufacturers",
      whyPoint2: "Quality assurance with rigorous testing standards",
      whyPoint3: "Competitive pricing without compromising on quality",
      whyPoint4: "Excellent customer service and support",
      whyPoint5: "Fast and reliable delivery across India",
      valuesPrinciples: "The principles that guide our business and relationships",
      qualityDesc: "Every product is carefully selected and tested for durability and authenticity.",
      customerDesc: "Your satisfaction is our top priority. We listen and adapt to serve you better.",
      traditionalDesc: "We honor traditional craftsmanship while embracing modern innovation.",
      familyDesc: "Four generations of trust and dedication to serving our community.",
      journeyMilestones: "Key moments that shaped who we are today",
      
      // Auth Page
      welcomeBack: "Welcome Back",
      signInContinue: "Sign in to continue to your account",
      createAccount: "Create Account",
      signUpStart: "Sign up to start your journey with us",
      password: "Password",
      forgotPassword: "Forgot Password?",
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: "Already have an account?",
      signInButton: "Sign In",
      signUpButton: "Sign Up",
      orContinueWith: "Or continue with"
    }
  },
  hi: {
    translation: {
      // Navigation
      home: "होम",
      shop: "दुकान",
      about: "हमारे बारे में",
      contact: "संपर्क करें",
      
      // Auth
      login: "लॉगिन",
      signup: "साइन अप",
      logout: "साइन आउट",
      myProfile: "मेरी प्रोफाइल",
      adminPanel: "एडमिन पैनल",
      
      // Shop
      searchProducts: "उत्पाद खोजें...",
      sortBy: "के अनुसार क्रमबद्ध करें",
      filterBy: "फिल्टर करें",
      priceRange: "मूल्य सीमा",
      category: "श्रेणी",
      addToCart: "कार्ट में जोड़ें",
      addToWishlist: "विशलिस्ट में जोड़ें",
      
      // Common
      name: "नाम",
      email: "ईमेल",
      phone: "फोन",
      address: "पता",
      submit: "जमा करें",
      cancel: "रद्द करें",
      save: "सेव करें",
      edit: "संपादित करें",
      delete: "हटाएं",
      back: "वापस",
      explore: "अन्वेषण करें",
      viewAllCategories: "सभी श्रेणियां देखें",
      
      // Search & Filter
      searchPlaceholder: "उत्पाद खोजें...",
      priceFilter: "मूल्य फिल्टर",
      categoryFilter: "श्रेणी फिल्टर",
      sortOptions: "सॉर्ट विकल्प",
      
      // Contact Page
      getInTouch: "संपर्क करें",
      contactInformation: "संपर्क जानकारी",
      sendMessage: "हमें संदेश भेजें",
      firstName: "प्रथम नाम",
      lastName: "अंतिम नाम",
      subject: "विषय",
      message: "संदेश",
      sendingMessage: "भेजा जा रहा है...",
      
      // Product Management
      addProduct: "उत्पाद जोड़ें",
      editProduct: "उत्पाद संपादित करें",
      productName: "उत्पाद का नाम",
      description: "विवरण",
      price: "मूल्य",
      comparePrice: "तुलना मूल्य",
      stockQuantity: "स्टॉक मात्रा",
      material: "सामग्री",
      sku: "SKU",
      weight: "वजन",
      tags: "टैग",
      images: "छवियां",
      status: "स्थिति",
      productFeatured: "फीचर्ड",
      active: "सक्रिय",
      inactive: "निष्क्रिय",
      outOfStock: "स्टॉक खत्म",
      
      // Categories
      copperware: "तांबे के बर्तन",
      steelware: "स्टील के बर्तन",
      brassware: "पीतल के बर्तन",
      poojaessentials: "पूजा सामग्री",
      cutlery: "कटलरी",
      homeessentials: "घरेलू आवश्यकताएं",
      kitchensupplies: "रसोई की आपूर्ति",
      schoolessentials: "स्कूल की आवश्यकताएं",
      giftsets: "उपहार सेट",
      
      // Hero
      trustedSince: "1985 से विश्वसनीय • कलापीपल, मध्य प्रदेश",
      welcomeTo: "में आपका स्वागत है",
      heroSubheading: "परंपरा के साथ तैयार किए गए प्रामाणिक पीतल, तांबे और स्टील के बर्तनों की खोज करें। प्रीमियम कुकवेयर और आधुनिक रसोई समाधान के लिए आपका विश्वसनीय गंतव्य।",
      shopNow: "अभी खरीदें",
      learnMore: "और जानें",
      
      // Shop Page
      allCategories: "सभी श्रेणियाँ",
      productsFound: "उत्पाद मिले",
      noProductsFound: "आपके मानदंडों से मेल खाने वाला कोई उत्पाद नहीं मिला",
      sortByName: "नाम अ-ज",
      sortByPriceLow: "मूल्य: कम से अधिक",
      sortByPriceHigh: "मूल्य: अधिक से कम",
      sortByNewest: "नवीनतम",
      sortByPopular: "सबसे लोकप्रिय",
      featured: "फीचर्ड",
      
      // Cart & Wishlist
      viewCart: "कार्ट देखें",
      viewWishlist: "विशलिस्ट देखें",
      removeFromCart: "कार्ट से हटाएं",
      removeFromWishlist: "विशलिस्ट से हटाएं",
      
      // Footer
      quickLinks: "त्वरित लिंक",
      followUs: "हमें फॉलो करें",
      copyright: "© 2024 शिवपुरिया पात्र भंडार। सर्वाधिकार सुरक्षित।",
      stayUpdated: "अपडेट रहें",
      enterEmail: "अपना ईमेल दर्ज करें",
      contactUs: "हमसे संपर्क करें",
      shippingInfo: "शिपिंग जानकारी",
      returnPolicy: "वापसी नीति",
      trackOrder: "ऑर्डर ट्रैक करें",
      sizeGuide: "साइज गाइड",
      bulkOrders: "थोक ऑर्डर",
      customerServices: "ग्राहक सेवाएं",
      helpCenter: "सहायता केंद्र",
      contactSupport: "सहायता से संपर्क करें",
      privacyPolicy: "गोपनीयता नीति",
      termsConditions: "नियम और शर्तें",
      faqs: "सामान्य प्रश्न",
      warranty: "वारंटी",
      trustedPartner: "प्रामाणिक बर्तनों और आधुनिक रसोई समाधान के लिए आपका विश्वसनीय साथी। 1985 से पारंपरिक मूल्यों और आधुनिक सुविधा के साथ गुणवत्ता उत्पाद प्रदान कर रहे हैं।",
      
      // Admin
      dashboard: "डैशबोर्ड",
      totalUsers: "कुल उपयोगकर्ता",
      totalOrders: "कुल ऑर्डर",
      totalProducts: "कुल उत्पाद",
      totalRevenue: "कुल राजस्व",
      recentOrders: "हाल के ऑर्डर",
      productsManagement: "उत्पाद प्रबंधन",
      customerManagement: "ग्राहक प्रबंधन",
      analytics: "विश्लेषण",
      orders: "ऑर्डर",
      products: "उत्पाद",
      customers: "ग्राहक",
      coupons: "कूपन",
      settings: "सेटिंग्स",
      
      // Company
      companyName: "शिवपुरिया पात्र भंडार",
      
      // Checkout & Orders
      checkout: "चेकआउट",
      shippingDetails: "शिपिंग विवरण",
      fullName: "पूरा नाम",
      city: "शहर",
      state: "राज्य",
      pincode: "पिनकोड",
      orderSummary: "ऑर्डर सारांश",
      subtotal: "उप-योग",
      shipping: "शिपिंग",
      free: "मुफ्त",
      total: "कुल",
      processing: "प्रोसेस हो रहा है...",
      placeOrder: "ऑर्डर दें",
      orderPlaced: "ऑर्डर दिया गया!",
      orderSuccess: "आपका ऑर्डर सफलतापूर्वक दिया गया है।",
      myOrders: "मेरे ऑर्डर",
      noOrders: "कोई ऑर्डर नहीं मिला",
      orderNumber: "ऑर्डर",
      paymentStatus: "भुगतान स्थिति",
      
      // Account Settings
      accountSettings: "खाता सेटिंग्स",
      personalInformation: "व्यक्तिगत जानकारी",
      emailCannotChange: "ईमेल नहीं बदला जा सकता",
      saving: "सेव हो रहा है...",
      saveChanges: "परिवर्तन सेव करें",
      success: "सफलता",
      profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट हुई",
      error: "त्रुटि",
      
      // About Page Content
      aboutTitle: "शिवपुरिया पात्र भंडार के बारे में",
      aboutDescription: "1985 में कलापीपल, मध्य प्रदेश के केंद्र में स्थापित, हम लगभग चार दशकों से परिवारों को प्रामाणिक पीतल, तांबे और स्टील के बर्तन प्रदान कर रहे हैं।",
      ourStory: "हमारी कहानी",
      whyChooseUs: "हमें क्यों चुनें?",
      ourValues: "हमारे मूल्य",
      ourJourney: "हमारी यात्रा",
      qualityFirst: "गुणवत्ता पहले",
      customerCentric: "ग्राहक केंद्रित",
      traditionalValues: "पारंपरिक मूल्य",
      familyBusiness: "पारिवारिक व्यवसाय",
      storyPara1: "कलापीपल में एक छोटी सी दुकान से शुरुआत करके मध्य प्रदेश में एक विश्वसनीय नाम बन गया है। हमारे संस्थापक की दृष्टि सरल थी: हर घर को गुणवत्ता वाले बर्तन प्रदान करना जो पारंपरिक शिल्प कौशल को आधुनिक कार्यक्षमता के साथ जोड़ते हैं।",
      storyPara2: "आज, हम इस विरासत को प्रामाणिक पीतल और तांबे के कुकवेयर से लेकर समकालीन रसोई उपकरण, लंच बॉक्स और पानी की बोतलों तक उत्पादों की एक विस्तृत श्रृंखला की पेशकश करके जारी रखते हैं। प्रत्येक उत्पाद गुणवत्ता और ग्राहक संतुष्टि के प्रति हमारी प्रतिबद्धता को दर्शाता है।",
      storyPara3: "भारतीय संस्कृति और परंपराओं में हमारी गहरी जड़ें हमें ऐसे उत्पादों का चयन करने में मार्गदर्शन करती हैं जो न केवल आपकी दैनिक जरूरतों को पूरा करते हैं बल्कि आपको हमारी समृद्ध विरासत से भी जोड़ते हैं।",
      whyPoint1: "विश्वसनीय निर्माताओं से सीधे प्राप्त प्रामाणिक उत्पाद",
      whyPoint2: "कठोर परीक्षण मानकों के साथ गुणवत्ता आश्वासन",
      whyPoint3: "गुणवत्ता पर समझौता किए बिना प्रतिस्पर्धी मूल्य निर्धारण",
      whyPoint4: "उत्कृष्ट ग्राहक सेवा और समर्थन",
      whyPoint5: "भारत भर में तेज और विश्वसनीय डिलीवरी",
      valuesPrinciples: "वे सिद्धांत जो हमारे व्यवसाय और संबंधों का मार्गदर्शन करते हैं",
      qualityDesc: "हर उत्पाद को सावधानीपूर्वक चुना और स्थायित्व और प्रामाणिकता के लिए परीक्षण किया जाता है।",
      customerDesc: "आपकी संतुष्टि हमारी सर्वोच्च प्राथमिकता है। हम आपकी बेहतर सेवा के लिए सुनते और अनुकूलित करते हैं।",
      traditionalDesc: "हम आधुनिक नवाचार को अपनाते हुए पारंपरिक शिल्प कौशल का सम्मान करते हैं।",
      familyDesc: "हमारे समुदाय की सेवा के लिए विश्वास और समर्पण की चार पीढ़ियां।",
      journeyMilestones: "वे महत्वपूर्ण क्षण जिन्होंने हमें आज का बनाया",
      
      // Auth Page
      welcomeBack: "वापस स्वागत है",
      signInContinue: "अपने खाते में जारी रखने के लिए साइन इन करें",
      createAccount: "खाता बनाएं",
      signUpStart: "हमारे साथ अपनी यात्रा शुरू करने के लिए साइन अप करें",
      password: "पासवर्ड",
      forgotPassword: "पासवर्ड भूल गए?",
      dontHaveAccount: "खाता नहीं है?",
      alreadyHaveAccount: "पहले से खाता है?",
      signInButton: "साइन इन करें",
      signUpButton: "साइन अप करें",
      orContinueWith: "या इसके साथ जारी रखें",
      
      // OTP Verification
      verifyOtp: "OTP सत्यापित करें",
      enterCode: "भेजा गया 6 अंकों का कोड दर्ज करें",
      verifying: "सत्यापित हो रहा है...",
      verifyOtpButton: "OTP सत्यापित करें",
      resetPassword: "पासवर्ड रीसेट करें",
      resetInstructions: "रीसेट निर्देश प्राप्त करने के लिए अपना ईमेल दर्ज करें",
      sendResetLink: "रीसेट लिंक भेजें",
      backToSignIn: "साइन इन पर वापस जाएं",
      backToHome: "होम पर वापस जाएं",
      welcomeMessage: "स्वागत है! कृपया अपने खाते में साइन इन करें",
      enterFullName: "अपना पूरा नाम दर्ज करें",
      yourEmail: "your@email.com",
      enterPassword: "अपना पासवर्ड दर्ज करें",
      signingIn: "साइन इन हो रहा है...",
      phoneNumber: "फोन नंबर",
      sendOtp: "OTP भेजें",
      sendingOtp: "OTP भेजा जा रहा है...",
      enterPhoneNumber: "अपना फोन नंबर दर्ज करें",
      signUpNow: "अभी साइन अप करें",
      sending: "भेजा जा रहा है..."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;