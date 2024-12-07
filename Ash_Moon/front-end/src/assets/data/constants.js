export const navigationItems = [
  {
    id: "home",
    title: "Home",
    link: "/",
  },
  {
    id: "new",
    title: "New",
    link: "/new",
  },
  {
    id: "sale",
    title: "Sale",
    link: "/sale",
  },
  // { id: "about-us", title: "About Us", link: "/about" },
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

// Funcitons
export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
