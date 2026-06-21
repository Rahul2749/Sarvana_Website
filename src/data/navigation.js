export const navigationLinks = [
  { label: "About", path: "/#about", id: "nav-about" },
  { label: "Products", path: "/products", id: "nav-products" },
  { 
    label: "Menu", 
    path: "/#menus", 
    id: "nav-menus",
    submenus: [
      { label: "Tea", path: "/?category=Tea#product-showcase", id: "sub-tea" },
      { label: "Coffee", path: "/?category=Coffee#product-showcase", id: "sub-coffee" },
      { label: "Snacks", path: "/?category=Snacks#product-showcase", id: "sub-snacks" }
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
