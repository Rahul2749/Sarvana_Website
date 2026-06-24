export const navigationLinks = [
  { label: "Home", path: "/", id: "nav-home" },
  { label: "About", path: "/#about", id: "nav-about" },
  { label: "Products", path: "/products", id: "nav-products" },
  { 
    label: "Menu", 
    path: "/#product-showcase", 
    id: "nav-menus",
    submenus: [
      { label: "Tea", path: "/?category=Tea#product-showcase", id: "sub-tea" },
      { label: "Coffee", path: "/?category=Coffee#product-showcase", id: "sub-coffee" },
      { label: "Juices", path: "/?category=Juices#product-showcase", id: "sub-juices" },
      { label: "Lassi", path: "/?category=Lassi#product-showcase", id: "sub-lassi" },
      { label: "Mojitos", path: "/?category=Mojitos#product-showcase", id: "sub-mojitos" },
      { label: "Milkshakes", path: "/?category=Milkshakes#product-showcase", id: "sub-milkshakes" },
      { label: "Fruit Custard", path: "/?category=Fruit%20Custard#product-showcase", id: "sub-custard" },
      { label: "Snacks Mandi", path: "/?category=Snacks%20Mandi#product-showcase", id: "sub-snacks-mandi" }
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
