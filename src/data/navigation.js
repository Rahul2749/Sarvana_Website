export const navigationLinks = [
  { label: "Home", path: "/", id: "nav-home" },
  { label: "About", path: "/#about", id: "nav-about" },
  { label: "Products", path: "/products", id: "nav-products" },
  { 
    label: "Menu", 
    path: "/#product-showcase", 
    id: "nav-menus",
    submenus: [
      { label: "Tea", path: "/products?category=Tea", id: "sub-tea" },
      { label: "Coffee", path: "/products?category=Coffee", id: "sub-coffee" },
      { label: "Juices", path: "/products?category=Juices", id: "sub-juices" },
      { label: "Lassi", path: "/products?category=Lassi", id: "sub-lassi" },
      { label: "Mojitos", path: "/products?category=Mojitos", id: "sub-mojitos" },
      { label: "Milkshakes", path: "/products?category=Milkshakes", id: "sub-milkshakes" },
      { label: "Fruit Custard", path: "/products?category=Fruit%20Custard", id: "sub-custard" },
      { label: "Snacks Mandi", path: "/products?category=Snacks%20Mandi", id: "sub-snacks-mandi" }
    ]
  },
  { label: "Process", path: "/#process", id: "nav-process" },
  { label: "Contact", path: "/#contact", id: "nav-contact" },
  { label: "FAQ", path: "/#faq", id: "nav-faq" },
  { label: "Stories", path: "/#stories", id: "nav-stories" }
];

export const socialLinks = [
  { label: "Instagram", url: "#", icon: "instagram" },
  { label: "Facebook", url: "#", icon: "facebook" },
  { label: "Twitter", url: "#", icon: "twitter" },
  { label: "YouTube", url: "#", icon: "youtube" }
];
