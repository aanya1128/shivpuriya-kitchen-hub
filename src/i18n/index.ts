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
      
      // Categories
      copperware: "Copperware",
      steelware: "Steelware",
      brassware: "Brassware",
      poojaEssentials: "Pooja Essentials",
      cutlery: "Cutlery",
      homeAppliances: "Home Appliances",
      kitchenAppliances: "Kitchen Appliances",
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
      
      // Categories
      copperware: "तांबे के बर्तन",
      steelware: "स्टील के बर्तन",
      brassware: "पीतल के बर्तन",
      poojaEssentials: "पूजा सामग्री",
      cutlery: "कटलरी",
      homeAppliances: "घरेलू उपकरण",
      kitchenAppliances: "रसोई उपकरण",
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
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;