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
      myOrders: "My Orders",
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
      featured: "Featured",
      active: "Active",
      inactive: "Inactive",
      outOfStock: "Out of Stock",
      
      // Categories
      copperware: "Copperware",
      steelware: "Steelware",
      brassware: "Brassware",
      poojaEssentials: "Pooja Essentials",
      cutlery: "Cutlery",
      homeEssentials: "Home Essentials",
      kitchenEssentials: "Kitchen Essentials",
      schoolEssentials: "School Essentials",
      
      // Company
      companyName: "Shivpuriya Patra Bhandar"
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
      myOrders: "मेरे ऑर्डर",
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
      featured: "फीचर्ड",
      active: "सक्रिय",
      inactive: "निष्क्रिय",
      outOfStock: "स्टॉक खत्म",
      
      // Categories
      copperware: "तांबे के बर्तन",
      steelware: "स्टील के बर्तन",
      brassware: "पीतल के बर्तन",
      poojaEssentials: "पूजा सामग्री",
      cutlery: "कटलरी",
      homeEssentials: "घरेलू आवश्यकताएं",
      kitchenEssentials: "रसोई की आवश्यकताएं",
      schoolEssentials: "स्कूल की आवश्यकताएं",
      
      // Company
      companyName: "शिवपुरिया पात्र भंडार"
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