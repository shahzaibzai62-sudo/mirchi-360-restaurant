import { useState, useEffect, useRef } from "react";

const MENU_DATA = {
  rolls: [
    { id: "r1", name: "Chicken Roll", price: 280, category: "Rolls" },
    { id: "r2", name: "Chicken Behari Boti Roll", price: 290, category: "Rolls" },
    { id: "r3", name: "Chicken Broast Roll", price: 280, category: "Rolls" },
    { id: "r4", name: "Fish N Chips Roll", price: 290, category: "Rolls" },
    { id: "r5", name: "Chicken Malai Boti Roll", price: 290, category: "Rolls" },
    { id: "r6", name: "Afghani Reshmi Kabab Roll", price: 280, category: "Rolls" },
    { id: "r7", name: "Mirchi 360 Special Roll", price: 210, category: "Rolls" },
    { id: "r8", name: "Vegetable Roll", price: 210, category: "Rolls" },
  ],
  appetizers: [
    { id: "a1", name: "Spicy Wings", price: 450, category: "Appetizers" },
    { id: "a2", name: "Honey Wings", price: 480, category: "Appetizers" },
    { id: "a3", name: "Fish N Chips", price: 1150, category: "Appetizers" },
    { id: "a4", name: "Finger Fish", price: 1150, category: "Appetizers" },
    { id: "a5", name: "French Fries", price: 300, category: "Appetizers" },
    { id: "a6", name: "Chicken Cheese Balls", price: 800, category: "Appetizers" },
    { id: "a7", name: "Hot N Sour Soup", price: 280, category: "Appetizers" },
    { id: "a8", name: "Chicken Corn Soup", price: 280, category: "Appetizers" },
    { id: "a9", name: "Mirchi 360 Special Soup", price: 350, category: "Appetizers" },
    { id: "a10", name: "Family Bowl Soup", price: 1200, category: "Appetizers" },
  ],
  fastFood: [
    { id: "ff1", name: "Zinger Burger", price: 530, category: "Fast Food" },
    { id: "ff2", name: "Chicken Club Sandwich", price: 480, category: "Fast Food" },
    { id: "ff3", name: "Zinger Extreme Burger", price: 700, category: "Fast Food" },
    { id: "ff4", name: "BBQ Club Sandwich", price: 700, category: "Fast Food" },
    { id: "ff5", name: "Chicken Burger", price: 430, category: "Fast Food" },
    { id: "ff6", name: "Vegetable Club Sandwich", price: 380, category: "Fast Food" },
    { id: "ff7", name: "Steak Burger", price: 510, category: "Fast Food" },
    { id: "ff8", name: "Mexican Sandwich", price: 380, category: "Fast Food" },
    { id: "ff9", name: "Supreme Burger", price: 700, category: "Fast Food" },
    { id: "ff10", name: "Mexican Vegetable Sandwich", price: 380, category: "Fast Food" },
    { id: "ff11", name: "Chicken Broast", price: 530, category: "Fast Food" },
  ],
  bbq: [
    { id: "b1", name: "Chicken Tikka", price: 450, category: "BBQ" },
    { id: "b2", name: "Chicken Behari Boti", price: 860, category: "BBQ" },
    { id: "b3", name: "Chicken Tikka Boti", price: 860, category: "BBQ" },
    { id: "b4", name: "Chicken Green Boti", price: 860, category: "BBQ" },
    { id: "b5", name: "Chicken Reshmi Kabab", price: 860, category: "BBQ" },
    { id: "b6", name: "Chicken Malai Boti", price: 860, category: "BBQ" },
    { id: "b7", name: "Afghani Kabab", price: 860, category: "BBQ" },
    { id: "b8", name: "Vegetable Boti", price: 860, category: "BBQ" },
    { id: "b9", name: "Chicken Gola Kabab", price: 860, category: "BBQ" },
    { id: "b10", name: "Chicken Namkeen Boti", price: 860, category: "BBQ" },
    { id: "b11", name: "BBQ Shashlik", price: 600, category: "BBQ" },
    { id: "b12", name: "Dhaka Chicken", price: 860, category: "BBQ" },
    { id: "b13", name: "Chicken Wings", price: 600, category: "BBQ" },
    { id: "b14", name: "BBQ Platter (Half)", price: 2800, category: "BBQ" },
    { id: "b15", name: "BBQ Platter (Full)", price: 4300, category: "BBQ" },
  ],
  chinese: [
    { id: "c1", name: "Chicken Dry Chili with Rice", price: 1100, category: "Chinese" },
    { id: "c2", name: "Chicken Mirchi 360 Special with Rice", price: 1100, category: "Chinese" },
    { id: "c3", name: "Chicken Chili Onion with Rice", price: 1100, category: "Chinese" },
    { id: "c4", name: "Singaporian Rice", price: 1100, category: "Chinese" },
    { id: "c5", name: "Chicken Manchurian with Rice", price: 1100, category: "Chinese" },
    { id: "c6", name: "Chicken Fried Rice", price: 500, category: "Chinese" },
    { id: "c7", name: "Chicken Shashlik with Rice", price: 1100, category: "Chinese" },
    { id: "c8", name: "Chicken Spagetti", price: 1100, category: "Chinese" },
    { id: "c9", name: "Chicken Chowmein", price: 1100, category: "Chinese" },
    { id: "c10", name: "Vegetable Chowmein", price: 600, category: "Chinese" },
    { id: "c11", name: "Vegetable Rice", price: 470, category: "Chinese" },
    { id: "c12", name: "Plain Rice", price: 350, category: "Chinese" },
    { id: "c13", name: "Mac and Cheese Pasta", price: 950, category: "Chinese" },
    { id: "c14", name: "Alferado Pasta", price: 950, category: "Chinese" },
    { id: "c15", name: "Chicken Lasagna", price: 1000, category: "Chinese" },
    { id: "c16", name: "Penne Arabia", price: 1000, category: "Chinese" },
    { id: "c17", name: "Chinese Thali", price: 1100, category: "Chinese" },
    { id: "c18", name: "Asian Thali", price: 1100, category: "Chinese" },
  ],
  pizza: [
    { id: "p1", name: "Chicken Fajita (Small)", price: 530, category: "Pizza" },
    { id: "p2", name: "Chicken Fajita (Medium)", price: 830, category: "Pizza" },
    { id: "p3", name: "Chicken Fajita (Large)", price: 1300, category: "Pizza" },
    { id: "p4", name: "Bonfire Pizza (Small)", price: 550, category: "Pizza" },
    { id: "p5", name: "Bonfire Pizza (Medium)", price: 1000, category: "Pizza" },
    { id: "p6", name: "Bonfire Pizza (Large)", price: 1500, category: "Pizza" },
    { id: "p7", name: "Afghani Pizza (Small)", price: 600, category: "Pizza" },
    { id: "p8", name: "Afghani Pizza (Medium)", price: 900, category: "Pizza" },
    { id: "p9", name: "Afghani Pizza (Large)", price: 1450, category: "Pizza" },
    { id: "p10", name: "Chicken Tikka (Small)", price: 530, category: "Pizza" },
    { id: "p11", name: "Chicken Tikka (Medium)", price: 830, category: "Pizza" },
    { id: "p12", name: "Chicken Tikka (Large)", price: 1300, category: "Pizza" },
    { id: "p13", name: "Special Pizza (Small)", price: 600, category: "Pizza" },
    { id: "p14", name: "Special Pizza (Medium)", price: 1000, category: "Pizza" },
    { id: "p15", name: "Special Pizza (Large)", price: 1500, category: "Pizza" },
    { id: "p16", name: "Stuffed Crust Pizza (Medium)", price: 1100, category: "Pizza" },
    { id: "p17", name: "Stuffed Crust Pizza (Large)", price: 1600, category: "Pizza" },
    { id: "p18", name: "Chicken Super Supreme (Small)", price: 530, category: "Pizza" },
    { id: "p19", name: "Chicken Super Supreme (Medium)", price: 850, category: "Pizza" },
    { id: "p20", name: "Chicken Super Supreme (Large)", price: 1300, category: "Pizza" },
    { id: "p21", name: "Stuffed Kebab Pizza (Small)", price: 600, category: "Pizza" },
    { id: "p22", name: "Stuffed Kebab Pizza (Medium)", price: 1000, category: "Pizza" },
    { id: "p23", name: "Stuffed Kebab Pizza (Large)", price: 1600, category: "Pizza" },
    { id: "p24", name: "Behari Spring Roll Pizza", price: 800, category: "Pizza" },
    { id: "p25", name: "Vegetable Pizza (Small)", price: 530, category: "Pizza" },
    { id: "p26", name: "Vegetable Pizza (Medium)", price: 850, category: "Pizza" },
    { id: "p27", name: "Vegetable Pizza (Large)", price: 1300, category: "Pizza" },
    { id: "p28", name: "Malai Pizza (Small)", price: 600, category: "Pizza" },
    { id: "p29", name: "Malai Pizza (Medium)", price: 1100, category: "Pizza" },
    { id: "p30", name: "Malai Pizza (Large)", price: 1600, category: "Pizza" },
    { id: "p31", name: "Pizza Fries", price: 600, category: "Pizza" },
  ],
  desiItems: [
    { id: "d1", name: "Royal Sindhi Chicken Biryani (Small)", price: 1050, category: "Desi Items" },
    { id: "d2", name: "Royal Sindhi Chicken Biryani (Large)", price: 1800, category: "Desi Items" },
    { id: "d3", name: "Chicken Reshmi Paneer Handi (Small)", price: 1300, category: "Desi Items" },
    { id: "d4", name: "Chicken Reshmi Paneer Handi (Large)", price: 2300, category: "Desi Items" },
    { id: "d5", name: "Mutton Biryani (Small)", price: 1250, category: "Desi Items" },
    { id: "d6", name: "Mutton Biryani (Large)", price: 2300, category: "Desi Items" },
    { id: "d7", name: "Royal Chicken Handi (Small)", price: 1250, category: "Desi Items" },
    { id: "d8", name: "Royal Chicken Handi (Large)", price: 2300, category: "Desi Items" },
    { id: "d9", name: "Mutton Handi (Small)", price: 2100, category: "Desi Items" },
    { id: "d10", name: "Mutton Handi (Large)", price: 3600, category: "Desi Items" },
    { id: "d11", name: "Chicken Makhni Handi (Small)", price: 1300, category: "Desi Items" },
    { id: "d12", name: "Chicken Makhni Handi (Large)", price: 2800, category: "Desi Items" },
    { id: "d13", name: "Daal Makhni (Small)", price: 800, category: "Desi Items" },
    { id: "d14", name: "Daal Makhni (Large)", price: 1400, category: "Desi Items" },
    { id: "d15", name: "Chicken White Handi (Small)", price: 1300, category: "Desi Items" },
    { id: "d16", name: "Chicken White Handi (Large)", price: 2200, category: "Desi Items" },
    { id: "d17", name: "Vegetable Biryani (Small)", price: 800, category: "Desi Items" },
    { id: "d18", name: "Vegetable Biryani (Large)", price: 1500, category: "Desi Items" },
    { id: "d19", name: "Nawabi Biryani (Small)", price: 1150, category: "Desi Items" },
    { id: "d20", name: "Nawabi Biryani (Large)", price: 2000, category: "Desi Items" },
    { id: "d21", name: "Tikka Biryani (Small)", price: 1300, category: "Desi Items" },
    { id: "d22", name: "Tikka Biryani (Large)", price: 2300, category: "Desi Items" },
  ],
  karahi: [
    { id: "k1", name: "Chicken Karahi (Small)", price: 1200, category: "Karahi" },
    { id: "k2", name: "Chicken Karahi (Large)", price: 2400, category: "Karahi" },
    { id: "k3", name: "Chicken Peshawari Karahi (Small)", price: 1200, category: "Karahi" },
    { id: "k4", name: "Chicken Peshawari Karahi (Large)", price: 2400, category: "Karahi" },
    { id: "k5", name: "Chicken White Karahi (Small)", price: 1250, category: "Karahi" },
    { id: "k6", name: "Chicken White Karahi (Large)", price: 2500, category: "Karahi" },
    { id: "k7", name: "Chicken Lahori Karahi (Small)", price: 1250, category: "Karahi" },
    { id: "k8", name: "Chicken Lahori Karahi (Large)", price: 2500, category: "Karahi" },
    { id: "k9", name: "Chicken Brown Karahi (Small)", price: 1200, category: "Karahi" },
    { id: "k10", name: "Chicken Brown Karahi (Large)", price: 2300, category: "Karahi" },
    { id: "k11", name: "Mutton Peshawari Karahi (Small)", price: 2050, category: "Karahi" },
    { id: "k12", name: "Mutton Peshawari Karahi (Large)", price: 3800, category: "Karahi" },
    { id: "k13", name: "Mutton White Karahi (Small)", price: 2150, category: "Karahi" },
    { id: "k14", name: "Mutton White Karahi (Large)", price: 3900, category: "Karahi" },
    { id: "k15", name: "Mutton Karahi (Small)", price: 2050, category: "Karahi" },
    { id: "k16", name: "Mutton Karahi (Large)", price: 3800, category: "Karahi" },
    { id: "k17", name: "Mutton Lahori Karahi (Small)", price: 2150, category: "Karahi" },
    { id: "k18", name: "Mutton Lahori Karahi (Large)", price: 3900, category: "Karahi" },
    { id: "k19", name: "Mutton Brown Karahi (Small)", price: 2050, category: "Karahi" },
    { id: "k20", name: "Mutton Brown Karahi (Large)", price: 3800, category: "Karahi" },
  ],
  vegetable: [
    { id: "v1", name: "Paner Handi", price: 1100, category: "Vegetable" },
    { id: "v2", name: "Paneer Palak", price: 1050, category: "Vegetable" },
    { id: "v3", name: "Paneer Mughlai", price: 1100, category: "Vegetable" },
    { id: "v4", name: "Paneer Achari", price: 1100, category: "Vegetable" },
    { id: "v5", name: "Paneer Stuff", price: 750, category: "Vegetable" },
    { id: "v6", name: "Paneer Nachos", price: 550, category: "Vegetable" },
    { id: "v7", name: "Vegetable Cutlus", price: 600, category: "Vegetable" },
    { id: "v8", name: "Malai Kofta", price: 800, category: "Vegetable" },
    { id: "v9", name: "Vegetable Kofta Handi", price: 1000, category: "Vegetable" },
    { id: "v10", name: "Vegetable Achari Handi", price: 900, category: "Vegetable" },
    { id: "v11", name: "Vegetable White Handi", price: 900, category: "Vegetable" },
    { id: "v12", name: "Vegetable Cheese Cutlus", price: 900, category: "Vegetable" },
    { id: "v13", name: "Vegetable Peri Bites", price: 750, category: "Vegetable" },
    { id: "v14", name: "Mirchi 360 Yakhni Rice", price: 600, category: "Vegetable" },
    { id: "v15", name: "Vegetable Platter", price: 700, category: "Vegetable" },
    { id: "v16", name: "Dynamite Chicken", price: 700, category: "Vegetable" },
  ],
  beverages: [
    { id: "bv1", name: "Kit Kat Shake", price: 480, category: "Beverages" },
    { id: "bv2", name: "Strawberry Shake", price: 420, category: "Beverages" },
    { id: "bv3", name: "Mango Juice", price: 380, category: "Beverages" },
    { id: "bv4", name: "Faluda", price: 520, category: "Beverages" },
    { id: "bv5", name: "Lab E Shireen", price: 300, category: "Beverages" },
    { id: "bv6", name: "Fruit Trifle", price: 800, category: "Beverages" },
    { id: "bv7", name: "Cadbury Shake", price: 450, category: "Beverages" },
    { id: "bv8", name: "Orange Juice", price: 320, category: "Beverages" },
    { id: "bv9", name: "Annar Juice", price: 410, category: "Beverages" },
    { id: "bv10", name: "Oreo Shake", price: 450, category: "Beverages" },
    { id: "bv11", name: "Apple Juice", price: 350, category: "Beverages" },
    { id: "bv12", name: "Falsa Juice", price: 350, category: "Beverages" },
    { id: "bv13", name: "Pineapple Shake", price: 400, category: "Beverages" },
    { id: "bv14", name: "Grape Fruit", price: 350, category: "Beverages" },
    { id: "bv15", name: "Pinna Colada", price: 370, category: "Beverages" },
    { id: "bv16", name: "Cheeko Shake", price: 320, category: "Beverages" },
    { id: "bv17", name: "Banana Shake", price: 350, category: "Beverages" },
    { id: "bv18", name: "Banana Brazer", price: 380, category: "Beverages" },
    { id: "bv19", name: "Mint Lemon", price: 290, category: "Beverages" },
    { id: "bv20", name: "Blueberry Shake", price: 400, category: "Beverages" },
    { id: "bv21", name: "Fruit Refal", price: 480, category: "Beverages" },
    { id: "bv22", name: "Mirchi 360 Special Shake", price: 400, category: "Beverages" },
    { id: "bv23", name: "Lovestory Shake", price: 450, category: "Beverages" },
    { id: "bv24", name: "Cake Alaska", price: 500, category: "Beverages" },
    { id: "bv25", name: "Brownie Shake", price: 400, category: "Beverages" },
    { id: "bv26", name: "Fresh Cocktail", price: 450, category: "Beverages" },
    { id: "bv27", name: "Coffee", price: 299, category: "Beverages" },
    { id: "bv28", name: "Tea", price: 120, category: "Beverages" },
    { id: "bv29", name: "Large Water", price: 120, category: "Beverages" },
    { id: "bv30", name: "Cold Coffee", price: 299, category: "Beverages" },
    { id: "bv31", name: "Fresh Lime", price: 199, category: "Beverages" },
    { id: "bv32", name: "Small Water", price: 60, category: "Beverages" },
    { id: "bv33", name: "Disposable Can", price: 120, category: "Beverages" },
    { id: "bv34", name: "Green Tea", price: 80, category: "Beverages" },
    { id: "bv35", name: "Lemon Kehwa", price: 80, category: "Beverages" },
  ],
  deserts: [
    { id: "ds1", name: "Ice Cream", price: 300, category: "Deserts" },
    { id: "ds2", name: "Kheer Mix", price: 800, category: "Deserts" },
    { id: "ds3", name: "Kunapa", price: 800, category: "Deserts" },
  ],
  salads: [
    { id: "s1", name: "Russian Salad", price: 599, category: "Salads" },
    { id: "s2", name: "Chicken Pineapple Salad", price: 599, category: "Salads" },
    { id: "s3", name: "Green Salad", price: 150, category: "Salads" },
    { id: "s4", name: "Raita", price: 150, category: "Salads" },
    { id: "s5", name: "Fruit Chaat", price: 150, category: "Salads" },
  ],
  parathaNaan: [
    { id: "pn1", name: "Chicken Paratha", price: 410, category: "Paratha & Naan" },
    { id: "pn2", name: "Boghni Naan", price: 65, category: "Paratha & Naan" },
    { id: "pn3", name: "Chicken Cheese Paratha", price: 450, category: "Paratha & Naan" },
    { id: "pn4", name: "Garlic Naan", price: 65, category: "Paratha & Naan" },
    { id: "pn5", name: "Aalu Paratha", price: 270, category: "Paratha & Naan" },
    { id: "pn6", name: "Kandhari Naan", price: 65, category: "Paratha & Naan" },
    { id: "pn7", name: "Plain Paratha", price: 70, category: "Paratha & Naan" },
    { id: "pn8", name: "Chapati", price: 30, category: "Paratha & Naan" },
    { id: "pn9", name: "Naan", price: 40, category: "Paratha & Naan" },
  ],
};

const ALL_ITEMS = Object.values(MENU_DATA).flat();

const CATEGORIES = [
  { key: "all", label: "All", icon: "🍽️" },
  { key: "rolls", label: "Rolls", icon: "🌯" },
  { key: "appetizers", label: "Appetizers", icon: "🍗" },
  { key: "fastFood", label: "Fast Food", icon: "🍔" },
  { key: "bbq", label: "BBQ", icon: "🔥" },
  { key: "chinese", label: "Chinese", icon: "🥢" },
  { key: "pizza", label: "Pizza", icon: "🍕" },
  { key: "desiItems", label: "Desi Items", icon: "🍛" },
  { key: "karahi", label: "Karahi", icon: "🫕" },
  { key: "vegetable", label: "Vegetable", icon: "🥦" },
  { key: "parathaNaan", label: "Paratha & Naan", icon: "🫓" },
  { key: "salads", label: "Salads", icon: "🥗" },
  { key: "deserts", label: "Deserts", icon: "🍨" },
  { key: "beverages", label: "Beverages", icon: "🥤" },
];

const CATEGORY_ICONS = {
  Rolls: "🌯", Appetizers: "🍗", "Fast Food": "🍔", BBQ: "🔥",
  Chinese: "🥢", Pizza: "🍕", "Desi Items": "🍛", Karahi: "🫕",
  Vegetable: "🥦", "Paratha & Naan": "🫓", Salads: "🥗",
  Deserts: "🍨", Beverages: "🥤",
};

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="95" fill="#1a0a00" stroke="#c8960c" stroke-width="5"/>
  <circle cx="100" cy="100" r="80" fill="none" stroke="#8b0000" stroke-width="3"/>
  <text x="100" y="55" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="#c8960c" letter-spacing="3">MIRCHI</text>
  <text x="100" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="52" font-weight="bold" fill="#e8a000" opacity="0.9">360</text>
  <text x="100" y="160" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#c8960c" letter-spacing="5">THREE SIXTY</text>
  <text x="100" y="178" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#c8960c" letter-spacing="5">DEGREES</text>
  <text x="30" y="108" font-family="serif" font-size="18" fill="#cc2200">🌶</text>
  <text x="150" y="108" font-family="serif" font-size="18" fill="#338800">🌿</text>
</svg>`;

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState(MENU_DATA);
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", address: "", payment: "", notes: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [editName, setEditName] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  const allDisplayItems = Object.values(menuItems).flat();
  const filteredItems = activeCategory === "all"
    ? allDisplayItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    : (menuItems[activeCategory] || []).filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      if (ex) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => {
    const ex = prev.find(c => c.id === id);
    if (ex && ex.qty > 1) return prev.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c);
    return prev.filter(c => c.id !== id);
  });

  const handleOrder = () => {
    if (!orderForm.name || !orderForm.phone || !orderForm.address || !orderForm.payment) return;
    setOrderPlaced(true);
    setCart([]);
    setCartOpen(false);
  };

  const handleAdminLogin = () => {
    if (adminPass === "mirchi360admin") { setAdminMode(true); setAdminPass(""); }
    else alert("Wrong password!");
  };

  const saveEdit = () => {
    if (!editingItem) return;
    setMenuItems(prev => {
      const updated = { ...prev };
      for (const cat in updated) {
        updated[cat] = updated[cat].map(i =>
          i.id === editingItem.id ? { ...i, name: editName || i.name, price: parseFloat(editPrice) || i.price } : i
        );
      }
      return updated;
    });
    setEditingItem(null);
  };

  const scrollToMenu = () => {
    setActiveSection("menu");
    setTimeout(() => menuRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Raleway:wght@300;400;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --gold: #c8960c;
      --gold-light: #e8c050;
      --red: #8b0000;
      --red-bright: #cc2200;
      --dark: #0d0700;
      --dark2: #1a0f03;
      --dark3: #261505;
      --text: #f5e8c0;
      --text-dim: #b8a070;
    }
    html { scroll-behavior: smooth; }
    body { font-family: 'Raleway', sans-serif; background: var(--dark); color: var(--text); overflow-x: hidden; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--dark2); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

    /* NAV */
    .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(13,7,0,0.97); border-bottom: 1px solid var(--gold); display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 70px; backdrop-filter: blur(10px); }
    .nav-logo { display: flex; align-items: center; gap: 12px; cursor: pointer; }
    .nav-logo svg { height: 50px; width: 50px; }
    .nav-brand { font-family: 'Playfair Display', serif; color: var(--gold); font-size: 1.2rem; line-height: 1.2; }
    .nav-brand span { display: block; font-size: 0.7rem; color: var(--text-dim); letter-spacing: 3px; text-transform: uppercase; }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { color: var(--text-dim); text-decoration: none; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; transition: color 0.3s; cursor: pointer; }
    .nav-links a:hover, .nav-links a.active { color: var(--gold); }
    .nav-right { display: flex; align-items: center; gap: 1rem; }
    .cart-btn { background: var(--gold); color: var(--dark); border: none; padding: 8px 18px; border-radius: 4px; font-weight: 700; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; transition: all 0.2s; letter-spacing: 1px; }
    .cart-btn:hover { background: var(--gold-light); transform: translateY(-1px); }
    .cart-badge { background: var(--red-bright); color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; font-weight: 700; }
    .hamburger { display: none; background: none; border: none; color: var(--gold); font-size: 1.5rem; cursor: pointer; }

    /* HERO */
    .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding-top: 70px; position: relative; overflow: hidden; background: radial-gradient(ellipse at 50% 40%, #2d1500 0%, #0d0700 70%); }
    .hero::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(200,150,12,0.03) 40px, rgba(200,150,12,0.03) 41px); }
    .hero-particles { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
    .particle { position: absolute; width: 2px; height: 2px; background: var(--gold); border-radius: 50%; animation: float linear infinite; opacity: 0.6; }
    @keyframes float { 0% { transform: translateY(100vh) rotate(0deg); opacity: 0; } 10% { opacity: 0.6; } 90% { opacity: 0.6; } 100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; } }
    .hero-content { position: relative; z-index: 2; transition: all 1.2s cubic-bezier(0.16,1,0.3,1); }
    .hero-content.visible { opacity: 1; transform: none; }
    .hero-content.hidden { opacity: 0; transform: translateY(40px); }
    .hero-tagline { font-size: 0.75rem; letter-spacing: 6px; color: var(--gold); text-transform: uppercase; margin-bottom: 1.5rem; opacity: 0.8; }
    .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 8vw, 7rem); font-weight: 900; line-height: 1; color: var(--text); margin-bottom: 0.5rem; }
    .hero-title .gold { color: var(--gold); }
    .hero-sub { font-size: clamp(1rem, 2vw, 1.4rem); color: var(--text-dim); margin: 1.5rem 0 2.5rem; letter-spacing: 1px; font-weight: 300; }
    .hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn-primary { background: var(--gold); color: var(--dark); padding: 14px 36px; border: none; font-family: 'Raleway', sans-serif; font-weight: 700; font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: all 0.3s; }
    .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(200,150,12,0.4); }
    .btn-outline { background: transparent; color: var(--gold); padding: 14px 36px; border: 2px solid var(--gold); font-family: 'Raleway', sans-serif; font-weight: 700; font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: all 0.3s; }
    .btn-outline:hover { background: var(--gold); color: var(--dark); transform: translateY(-2px); }
    .hero-stats { display: flex; gap: 3rem; justify-content: center; margin-top: 4rem; flex-wrap: wrap; }
    .stat { text-align: center; }
    .stat-num { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: var(--gold); font-weight: 700; }
    .stat-label { font-size: 0.75rem; letter-spacing: 3px; color: var(--text-dim); text-transform: uppercase; }
    .scroll-hint { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); color: var(--gold); opacity: 0.5; animation: bounce 2s infinite; font-size: 1.5rem; }
    @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-10px); } }

    /* ABOUT */
    .about-section { padding: 6rem 2rem; max-width: 1000px; margin: 0 auto; text-align: center; }
    .section-header { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 4vw, 3rem); color: var(--gold); margin-bottom: 1rem; }
    .gold-line { width: 60px; height: 2px; background: var(--gold); margin: 1rem auto 2rem; }
    .about-text { color: var(--text-dim); line-height: 1.9; font-size: 1rem; max-width: 700px; margin: 0 auto; }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 3rem; }
    .feature { padding: 2rem 1.5rem; background: var(--dark2); border: 1px solid rgba(200,150,12,0.2); border-radius: 8px; text-align: center; transition: all 0.3s; }
    .feature:hover { border-color: var(--gold); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(200,150,12,0.15); }
    .feature-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .feature h3 { font-family: 'Playfair Display', serif; color: var(--gold); margin-bottom: 0.5rem; }
    .feature p { color: var(--text-dim); font-size: 0.85rem; line-height: 1.6; }

    /* MENU SECTION */
    .menu-section { padding: 5rem 1rem 4rem; }
    .menu-header { text-align: center; margin-bottom: 3rem; }
    .search-bar { max-width: 400px; margin: 1.5rem auto 0; display: flex; gap: 8px; }
    .search-bar input { flex: 1; background: var(--dark2); border: 1px solid rgba(200,150,12,0.3); color: var(--text); padding: 10px 16px; border-radius: 4px; font-size: 0.9rem; font-family: 'Raleway', sans-serif; outline: none; }
    .search-bar input:focus { border-color: var(--gold); }
    .cat-tabs { display: flex; gap: 8px; overflow-x: auto; padding: 0.5rem 1rem 1.5rem; justify-content: flex-start; max-width: 1200px; margin: 0 auto; scrollbar-width: thin; scrollbar-color: var(--gold) transparent; }
    .cat-tab { flex-shrink: 0; padding: 8px 18px; border: 1px solid rgba(200,150,12,0.3); background: var(--dark2); color: var(--text-dim); border-radius: 30px; cursor: pointer; font-size: 0.8rem; letter-spacing: 1px; transition: all 0.2s; white-space: nowrap; display: flex; align-items: center; gap: 6px; font-family: 'Raleway', sans-serif; }
    .cat-tab:hover { border-color: var(--gold); color: var(--gold); }
    .cat-tab.active { background: var(--gold); color: var(--dark); border-color: var(--gold); font-weight: 700; }
    .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.2rem; max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .menu-card { background: var(--dark2); border: 1px solid rgba(200,150,12,0.15); border-radius: 8px; padding: 1.2rem; display: flex; align-items: center; gap: 1rem; transition: all 0.25s; position: relative; overflow: hidden; }
    .menu-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); transform: scaleX(0); transition: transform 0.3s; }
    .menu-card:hover::before { transform: scaleX(1); }
    .menu-card:hover { border-color: rgba(200,150,12,0.4); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.4); }
    .card-icon { font-size: 1.8rem; width: 48px; text-align: center; flex-shrink: 0; }
    .card-info { flex: 1; min-width: 0; }
    .card-name { font-size: 0.88rem; color: var(--text); font-weight: 600; line-height: 1.3; margin-bottom: 4px; }
    .card-cat { font-size: 0.7rem; color: var(--text-dim); letter-spacing: 1px; }
    .card-price { font-family: 'Playfair Display', serif; color: var(--gold); font-size: 1rem; font-weight: 700; white-space: nowrap; }
    .add-btn { background: var(--gold); border: none; color: var(--dark); width: 30px; height: 30px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: 700; transition: all 0.2s; flex-shrink: 0; }
    .add-btn:hover { background: var(--gold-light); transform: scale(1.1); }
    .edit-btn { background: transparent; border: 1px solid var(--gold); color: var(--gold); width: 26px; height: 26px; border-radius: 4px; font-size: 0.75rem; cursor: pointer; margin-left: 4px; transition: all 0.2s; flex-shrink: 0; }
    .edit-btn:hover { background: var(--gold); color: var(--dark); }
    .no-results { text-align: center; color: var(--text-dim); padding: 4rem; font-size: 1.1rem; }

    /* CART DRAWER */
    .cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 200; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
    .cart-overlay.open { opacity: 1; pointer-events: all; }
    .cart-drawer { position: fixed; right: 0; top: 0; bottom: 0; width: min(420px, 100vw); background: var(--dark2); border-left: 1px solid rgba(200,150,12,0.3); z-index: 201; transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); display: flex; flex-direction: column; }
    .cart-drawer.open { transform: none; }
    .cart-head { padding: 1.5rem; border-bottom: 1px solid rgba(200,150,12,0.2); display: flex; justify-content: space-between; align-items: center; }
    .cart-head h2 { font-family: 'Playfair Display', serif; color: var(--gold); }
    .close-btn { background: none; border: none; color: var(--text-dim); font-size: 1.5rem; cursor: pointer; transition: color 0.2s; }
    .close-btn:hover { color: var(--gold); }
    .cart-items { flex: 1; overflow-y: auto; padding: 1rem; }
    .cart-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 0; border-bottom: 1px solid rgba(200,150,12,0.1); }
    .ci-name { flex: 1; font-size: 0.85rem; color: var(--text); }
    .ci-price { color: var(--gold); font-weight: 700; font-size: 0.9rem; }
    .qty-controls { display: flex; align-items: center; gap: 6px; }
    .qty-btn { background: rgba(200,150,12,0.2); border: 1px solid var(--gold); color: var(--gold); width: 24px; height: 24px; border-radius: 4px; cursor: pointer; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .qty-btn:hover { background: var(--gold); color: var(--dark); }
    .qty-num { color: var(--text); font-size: 0.85rem; min-width: 20px; text-align: center; }
    .cart-empty { text-align: center; color: var(--text-dim); padding: 3rem 1rem; }
    .cart-empty div { font-size: 3rem; margin-bottom: 1rem; }
    .cart-footer { padding: 1.5rem; border-top: 1px solid rgba(200,150,12,0.2); }
    .cart-total { display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.1rem; font-weight: 700; color: var(--text); }
    .cart-total span:last-child { color: var(--gold); font-family: 'Playfair Display', serif; }
    .order-form { display: flex; flex-direction: column; gap: 10px; margin-bottom: 1rem; }
    .order-form input, .order-form select, .order-form textarea { background: var(--dark3); border: 1px solid rgba(200,150,12,0.3); color: var(--text); padding: 10px 14px; border-radius: 4px; font-family: 'Raleway', sans-serif; font-size: 0.85rem; outline: none; width: 100%; }
    .order-form input:focus, .order-form select:focus, .order-form textarea:focus { border-color: var(--gold); }
    .order-form select option { background: var(--dark3); }
    .order-form textarea { resize: none; height: 60px; }
    .place-order-btn { width: 100%; background: var(--gold); color: var(--dark); border: none; padding: 14px; border-radius: 4px; font-family: 'Raleway', sans-serif; font-weight: 700; font-size: 0.95rem; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
    .place-order-btn:hover { background: var(--gold-light); }
    .place-order-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    /* PAYMENT */
    .payment-section { padding: 5rem 2rem; max-width: 900px; margin: 0 auto; text-align: center; }
    .payment-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
    .payment-card { background: var(--dark2); border: 1px solid rgba(200,150,12,0.2); border-radius: 10px; padding: 2rem 1.5rem; text-align: center; transition: all 0.3s; cursor: pointer; }
    .payment-card:hover { border-color: var(--gold); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(200,150,12,0.15); }
    .payment-card .p-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .payment-card h3 { color: var(--gold); font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; }
    .payment-card p { color: var(--text-dim); font-size: 0.8rem; }

    /* CONTACT */
    .contact-section { padding: 5rem 2rem; max-width: 800px; margin: 0 auto; text-align: center; }
    .contact-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
    .contact-card { background: var(--dark2); border: 1px solid rgba(200,150,12,0.2); border-radius: 8px; padding: 1.5rem; transition: all 0.3s; }
    .contact-card:hover { border-color: var(--gold); }
    .contact-card .c-icon { font-size: 2rem; margin-bottom: 0.75rem; }
    .contact-card h3 { color: var(--gold); font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 0.5rem; }
    .contact-card p { color: var(--text-dim); font-size: 0.9rem; line-height: 1.6; }

    /* ADMIN */
    .admin-section { padding: 4rem 2rem; max-width: 900px; margin: 0 auto; }
    .admin-login { background: var(--dark2); border: 1px solid rgba(200,150,12,0.3); border-radius: 10px; padding: 2rem; max-width: 400px; margin: 0 auto; text-align: center; }
    .admin-login input { width: 100%; background: var(--dark3); border: 1px solid rgba(200,150,12,0.3); color: var(--text); padding: 12px; border-radius: 4px; margin: 1rem 0; font-family: 'Raleway', sans-serif; font-size: 1rem; outline: none; text-align: center; letter-spacing: 4px; }
    .admin-list { display: flex; flex-direction: column; gap: 8px; }
    .admin-item { background: var(--dark2); border: 1px solid rgba(200,150,12,0.15); border-radius: 6px; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.75rem; }
    .ai-name { flex: 1; font-size: 0.85rem; color: var(--text); }
    .ai-price { color: var(--gold); font-weight: 700; min-width: 80px; text-align: right; }
    .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .logout-btn { background: transparent; border: 1px solid var(--red-bright); color: var(--red-bright); padding: 6px 14px; border-radius: 4px; cursor: pointer; font-size: 0.8rem; transition: all 0.2s; }
    .logout-btn:hover { background: var(--red-bright); color: white; }

    /* MODAL */
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 1rem; }
    .modal { background: var(--dark2); border: 1px solid var(--gold); border-radius: 10px; padding: 2rem; width: 100%; max-width: 400px; }
    .modal h3 { font-family: 'Playfair Display', serif; color: var(--gold); margin-bottom: 1.5rem; }
    .modal input { width: 100%; background: var(--dark3); border: 1px solid rgba(200,150,12,0.3); color: var(--text); padding: 10px 14px; border-radius: 4px; font-family: 'Raleway', sans-serif; margin-bottom: 10px; outline: none; font-size: 0.9rem; }
    .modal-btns { display: flex; gap: 1rem; margin-top: 1rem; }
    .modal-btns button { flex: 1; padding: 10px; border-radius: 4px; border: none; cursor: pointer; font-family: 'Raleway', sans-serif; font-weight: 600; transition: all 0.2s; }
    .modal-btns .save { background: var(--gold); color: var(--dark); }
    .modal-btns .cancel { background: transparent; border: 1px solid var(--text-dim); color: var(--text-dim); }

    /* SUCCESS */
    .success-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 400; display: flex; align-items: center; justify-content: center; padding: 1rem; }
    .success-box { background: var(--dark2); border: 2px solid var(--gold); border-radius: 14px; padding: 3rem 2rem; text-align: center; max-width: 450px; width: 100%; }
    .success-icon { font-size: 4rem; margin-bottom: 1rem; animation: pop 0.5s ease; }
    @keyframes pop { 0% { transform: scale(0); } 70% { transform: scale(1.2); } 100% { transform: scale(1); } }
    .success-box h2 { font-family: 'Playfair Display', serif; color: var(--gold); font-size: 1.8rem; margin-bottom: 0.5rem; }
    .success-box p { color: var(--text-dim); line-height: 1.6; margin-bottom: 1.5rem; }

    /* FOOTER */
    .footer { background: #070400; border-top: 1px solid rgba(200,150,12,0.2); padding: 2.5rem 2rem; text-align: center; color: var(--text-dim); font-size: 0.8rem; }
    .footer-brand { font-family: 'Playfair Display', serif; color: var(--gold); font-size: 1.3rem; margin-bottom: 0.5rem; }
    .footer-links { display: flex; gap: 2rem; justify-content: center; margin: 1rem 0; flex-wrap: wrap; }
    .footer-links a { color: var(--text-dim); text-decoration: none; font-size: 0.8rem; letter-spacing: 1px; cursor: pointer; transition: color 0.2s; }
    .footer-links a:hover { color: var(--gold); }

    /* DIVIDER */
    .divider { height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); max-width: 600px; margin: 0 auto; opacity: 0.4; }

    @media (max-width: 768px) {
      .nav-links { display: none; }
      .hamburger { display: block; }
      .mobile-nav { position: fixed; top: 70px; left: 0; right: 0; background: rgba(13,7,0,0.99); border-bottom: 1px solid rgba(200,150,12,0.3); z-index: 99; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; transform: translateY(-110%); transition: transform 0.3s; }
      .mobile-nav.open { transform: none; }
      .mobile-nav a { color: var(--text-dim); text-decoration: none; font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; padding: 0.5rem 0; cursor: pointer; border-bottom: 1px solid rgba(200,150,12,0.1); transition: color 0.2s; }
      .mobile-nav a:hover { color: var(--gold); }
      .hero-stats { gap: 1.5rem; }
      .menu-grid { grid-template-columns: 1fr; }
    }
  `;

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 6}s`,
  }));

  const navTo = (section) => {
    setActiveSection(section);
    setMobileNavOpen(false);
  };

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => navTo("home")}>
          <div dangerouslySetInnerHTML={{ __html: LOGO_SVG }} style={{ height: 50, width: 50 }} />
          <div className="nav-brand">
            Mirchi 360
            <span>Three Sixty Degrees</span>
          </div>
        </div>
        <ul className="nav-links">
          {["home", "menu", "payment", "contact", "admin"].map(s => (
            <li key={s}><a onClick={() => navTo(s)} className={activeSection === s ? "active" : ""}>{s.charAt(0).toUpperCase() + s.slice(1)}</a></li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="hamburger" onClick={() => setMobileNavOpen(!mobileNavOpen)}>☰</button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className={`mobile-nav ${mobileNavOpen ? "open" : ""}`}>
        {["home", "menu", "payment", "contact", "admin"].map(s => (
          <a key={s} onClick={() => navTo(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</a>
        ))}
      </div>

      {/* HOME */}
      {activeSection === "home" && (
        <>
          <section className="hero">
            <div className="hero-particles">
              {particles.map(p => (
                <div key={p.id} className="particle" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }} />
              ))}
            </div>
            <div className={`hero-content ${heroVisible ? "visible" : "hidden"}`}>
              <div className="hero-tagline">🌶 Sanghar's Finest Restaurant 🌶</div>
              <h1 className="hero-title">
                <span className="gold">Mirchi</span> 360
              </h1>
              <p className="hero-sub">Three Sixty Degrees of Flavour — Where Every Bite Tells a Story</p>
              <div className="hero-btns">
                <button className="btn-primary" onClick={scrollToMenu}>Explore Menu</button>
                <button className="btn-outline" onClick={() => navTo("contact")}>Find Us</button>
              </div>
              <div className="hero-stats">
                <div className="stat"><div className="stat-num">360°</div><div className="stat-label">Flavours</div></div>
                <div className="stat"><div className="stat-num">14+</div><div className="stat-label">Categories</div></div>
                <div className="stat"><div className="stat-num">150+</div><div className="stat-label">Menu Items</div></div>
                <div className="stat"><div className="stat-num">24/7</div><div className="stat-label">Delivery</div></div>
              </div>
            </div>
            <div className="scroll-hint">↓</div>
          </section>

          <section className="about-section">
            <h2 className="section-header">About Mirchi 360</h2>
            <div className="gold-line" />
            <p className="about-text">
              Located in the heart of Sanghar, Mirchi 360 offers a complete dining experience — from sizzling BBQ and fresh Karahis to gourmet pizzas, Chinese delights, and authentic Desi flavours. Our passion is in every dish, crafted with the finest ingredients and the warmth of true hospitality.
            </p>
            <div className="features">
              {[
                { icon: "🔥", title: "Live BBQ", desc: "Fresh BBQ platters grilled to perfection right before your eyes." },
                { icon: "🛵", title: "Fast Delivery", desc: "Hot food delivered to your door across Sanghar." },
                { icon: "👨‍🍳", title: "Expert Chefs", desc: "Trained culinary experts bringing 360° of flavour." },
                { icon: "🌶", title: "Premium Quality", desc: "Only the finest ingredients for an uncompromising taste." },
              ].map(f => (
                <div key={f.title} className="feature">
                  <div className="feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
          <div className="divider" />
        </>
      )}

      {/* MENU */}
      {activeSection === "menu" && (
        <section className="menu-section" ref={menuRef} style={{ paddingTop: "90px" }}>
          <div className="menu-header">
            <h2 className="section-header">Our Menu</h2>
            <div className="gold-line" />
            <div className="search-bar">
              <input
                placeholder="Search dishes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="cat-tabs">
            {CATEGORIES.map(c => (
              <button key={c.key} className={`cat-tab ${activeCategory === c.key ? "active" : ""}`} onClick={() => setActiveCategory(c.key)}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
          {filteredItems.length === 0 ? (
            <div className="no-results">🍽️ No items found. Try a different search.</div>
          ) : (
            <div className="menu-grid">
              {filteredItems.map(item => (
                <div key={item.id} className="menu-card">
                  <div className="card-icon">{CATEGORY_ICONS[item.category] || "🍽️"}</div>
                  <div className="card-info">
                    <div className="card-name">{item.name}</div>
                    <div className="card-cat">{item.category}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <div className="card-price">₨{item.price.toLocaleString()}</div>
                    <button className="add-btn" onClick={() => addToCart(item)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* PAYMENT */}
      {activeSection === "payment" && (
        <section className="payment-section" style={{ paddingTop: "100px" }}>
          <h2 className="section-header">Payment Options</h2>
          <div className="gold-line" />
          <p style={{ color: "var(--text-dim)", marginBottom: "1rem" }}>We accept multiple payment methods for your convenience.</p>
          <div className="payment-cards">
            {[
              { icon: "📱", name: "EasyPaisa", desc: "Pay directly via EasyPaisa mobile wallet. Fast, simple, secure.", num: "0332-4187360" },
              { icon: "💳", name: "JazzCash", desc: "JazzCash mobile payment accepted. Just send and confirm.", num: "Contact us" },
              { icon: "🏦", name: "Bank Transfer", desc: "Direct bank transfer accepted. Ask for account details.", num: "On request" },
              { icon: "💵", name: "Cash on Delivery", desc: "Pay cash when your order arrives at your door.", num: "Available" },
            ].map(p => (
              <div key={p.name} className="payment-card">
                <div className="p-icon">{p.icon}</div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <p style={{ color: "var(--gold)", marginTop: "8px", fontWeight: 700, fontSize: "0.85rem" }}>{p.num}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "3rem", background: "var(--dark2)", border: "1px solid rgba(200,150,12,0.2)", borderRadius: "10px", padding: "2rem" }}>
            <h3 style={{ color: "var(--gold)", fontFamily: "Playfair Display, serif", marginBottom: "1rem" }}>📲 EasyPaisa Details</h3>
            <p style={{ color: "var(--text-dim)", lineHeight: 1.8 }}>
              Account Name: <span style={{ color: "var(--text)" }}>Mirchi 360 Restaurant</span><br />
              Mobile Number: <span style={{ color: "var(--gold)", fontWeight: 700 }}>0332-4187360</span><br />
              After payment, send screenshot via WhatsApp to confirm your order.
            </p>
          </div>
        </section>
      )}

      {/* CONTACT */}
      {activeSection === "contact" && (
        <section className="contact-section" style={{ paddingTop: "100px" }}>
          <h2 className="section-header">Find Us</h2>
          <div className="gold-line" />
          <div className="contact-info">
            <div className="contact-card">
              <div className="c-icon">📍</div>
              <h3>Location</h3>
              <p>Sanghar Branch<br />Sanghar, Sindh, Pakistan</p>
            </div>
            <div className="contact-card">
              <div className="c-icon">📞</div>
              <h3>Phone</h3>
              <p>0332-4187360<br />0379-7833360<br />0305-0368360</p>
            </div>
            <div className="contact-card">
              <div className="c-icon">📟</div>
              <h3>PTCL</h3>
              <p>0235-541060<br />0235-542361</p>
            </div>
            <div className="contact-card">
              <div className="c-icon">🛵</div>
              <h3>Delivery</h3>
              <p>Home Delivery Available<br />Call to order now!</p>
            </div>
          </div>
          <div style={{ marginTop: "3rem", background: "var(--dark2)", border: "1px solid rgba(200,150,12,0.2)", borderRadius: "10px", padding: "2rem", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🕐</div>
            <h3 style={{ color: "var(--gold)", fontFamily: "Playfair Display, serif", marginBottom: "0.5rem" }}>Opening Hours</h3>
            <p style={{ color: "var(--text-dim)", lineHeight: 1.8 }}>
              Open Daily — Lunch & Dinner<br />
              <span style={{ color: "var(--text)" }}>12:00 PM – 12:00 AM</span>
            </p>
          </div>
        </section>
      )}

      {/* ADMIN */}
      {activeSection === "admin" && (
        <section className="admin-section" style={{ paddingTop: "100px" }}>
          <h2 className="section-header" style={{ textAlign: "center" }}>Admin Panel</h2>
          <div className="gold-line" />
          {!adminMode ? (
            <div className="admin-login">
              <p style={{ color: "var(--text-dim)", marginBottom: "0.5rem" }}>Enter admin password to edit menu prices</p>
              <input
                type="password"
                placeholder="••••••••"
                value={adminPass}
                onChange={e => setAdminPass(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
              />
              <button className="btn-primary" style={{ width: "100%" }} onClick={handleAdminLogin}>Login</button>
              <p style={{ color: "var(--text-dim)", fontSize: "0.75rem", marginTop: "1rem" }}>Password: mirchi360admin</p>
            </div>
          ) : (
            <>
              <div className="admin-header">
                <p style={{ color: "var(--text-dim)" }}>Click ✏️ on any item to edit its name or price.</p>
                <button className="logout-btn" onClick={() => setAdminMode(false)}>Logout</button>
              </div>
              <div className="admin-list">
                {Object.values(menuItems).flat().map(item => (
                  <div key={item.id} className="admin-item">
                    <span style={{ color: "var(--text-dim)", fontSize: "0.75rem", width: "60px", flexShrink: 0 }}>{item.category}</span>
                    <span className="ai-name">{item.name}</span>
                    <span className="ai-price">₨{item.price.toLocaleString()}</span>
                    <button className="edit-btn" onClick={() => { setEditingItem(item); setEditName(item.name); setEditPrice(String(item.price)); }}>✏️</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">Mirchi 360 — Three Sixty Degrees</div>
        <div className="footer-links">
          {["home", "menu", "payment", "contact"].map(s => (
            <a key={s} onClick={() => navTo(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</a>
          ))}
        </div>
        <p>© 2024 Mirchi 360. Sanghar Branch. All rights reserved.</p>
      </footer>

      {/* CART DRAWER */}
      <div className={`cart-overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="cart-head">
          <h2>🛒 Your Order</h2>
          <button className="close-btn" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div>🍽️</div>
              <p>Your cart is empty.<br />Add some delicious items!</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <span style={{ fontSize: "1.2rem" }}>{CATEGORY_ICONS[item.category] || "🍽️"}</span>
                <div className="ci-name">{item.name}</div>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => removeFromCart(item.id)}>−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                </div>
                <div className="ci-price">₨{(item.price * item.qty).toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>₨{cartTotal.toLocaleString()}</span>
            </div>
            <div className="order-form">
              <input placeholder="Your Name *" value={orderForm.name} onChange={e => setOrderForm(f => ({ ...f, name: e.target.value }))} />
              <input placeholder="Phone Number *" value={orderForm.phone} onChange={e => setOrderForm(f => ({ ...f, phone: e.target.value }))} />
              <input placeholder="Delivery Address *" value={orderForm.address} onChange={e => setOrderForm(f => ({ ...f, address: e.target.value }))} />
              <select value={orderForm.payment} onChange={e => setOrderForm(f => ({ ...f, payment: e.target.value }))}>
                <option value="">Select Payment Method *</option>
                <option value="easypaisa">EasyPaisa</option>
                <option value="jazzcash">JazzCash</option>
                <option value="bank">Bank Transfer</option>
                <option value="cod">Cash on Delivery</option>
              </select>
              <textarea placeholder="Special instructions (optional)" value={orderForm.notes} onChange={e => setOrderForm(f => ({ ...f, notes: e.target.value }))} />
            </div>
            <button
              className="place-order-btn"
              onClick={handleOrder}
              disabled={!orderForm.name || !orderForm.phone || !orderForm.address || !orderForm.payment}
            >
              Place Order — ₨{cartTotal.toLocaleString()}
            </button>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="modal-overlay" onClick={() => setEditingItem(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Edit Item</h3>
            <input placeholder="Item Name" value={editName} onChange={e => setEditName(e.target.value)} />
            <input type="number" placeholder="Price (₨)" value={editPrice} onChange={e => setEditPrice(e.target.value)} />
            <div className="modal-btns">
              <button className="cancel" onClick={() => setEditingItem(null)}>Cancel</button>
              <button className="save" onClick={saveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {orderPlaced && (
        <div className="success-modal">
          <div className="success-box">
            <div className="success-icon">🎉</div>
            <h2>Order Placed!</h2>
            <p>Thank you! Your order has been received. Our team will call you shortly to confirm and arrange delivery.</p>
            <p style={{ color: "var(--gold)", fontWeight: 700, margin: "1rem 0" }}>📞 0332-4187360</p>
            <button className="btn-primary" onClick={() => setOrderPlaced(false)}>Continue</button>
          </div>
        </div>
      )}
    </>
  );
}
