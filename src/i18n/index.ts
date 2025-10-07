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
      error: "Error"
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
      familyBusiness: "पारिवारिक व्यवसाय"
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