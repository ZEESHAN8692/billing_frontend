import React, { useState } from "react";
import {
  HomeIcon,
  ShoppingCartIcon,
  BarChart2Icon,
  PackageIcon,
  UsersIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
// import logo from "logo/logo.png";
// import logoSmall from "../assets/image/PharmaNex_small.png";

const menuItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: <HomeIcon size={20} />,
  },
  {
    label: "Inventory",
    icon: <PackageIcon size={20} />,
    subMenu: [
      { label: "Product", path: "/product" },
      { label: "Groups", path: "/group" },
      { label: "Adjustments", path: "/inventory-adjustment" },
    ],
  },
  {
    label: "Sales",
    icon: <ShoppingCartIcon size={20} />,
    subMenu: [
      { label: "Customers", path: "/customers" },
      { label: "Doctors", path: "/doctors" },
      { label: "Invoices", path: "/invoices" },
      { label: "Payments Received", path: "/payments-received" },
      { label: "Sales Return", path: "/sales-return" },
      { label: "Credit Notes", path: "/credit-notes" },
    ],
  },
  {
    label: "Purchases",
    icon: <UsersIcon size={20} />,
    subMenu: [
      { label: "Vendors", path: "/vendor" },
      { label: "Purchase Orders", path: "/purchases-order" },
      { label: "Purchase Receive", path: "/purchases-receive" },
      { label: "Purchase Bills", path: "/purchases-bills" },
      { label: "Payment Made", path: "/payment-made" },
      { label: "Credit Note", path: "/credit-note" },
    ],
  },
  {
    label: "Reports",
    icon: <BarChart2Icon size={20} />,
    subMenu: [
      { label: "Reports1", path: "/reports1" },
      { label: "Reports2", path: "/reports2" },
    ],
  },
];

export default function Sidebar({ className }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState([]);
  const location = useLocation();

  const toggleMenu = (label) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <aside
      className={`bg-[#2E3345] text-white h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } ${className}`}
    >
      <div
        className="flex justify-center items-center h-20 cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <img
          src={collapsed ? "/logo/logo.png" : "/logo/logo.png"}
          alt="Logo"
          className="h-12 transition-all duration-300"
        />
      </div>

      <nav className="px-2 space-y-2">
        {menuItems.map((item, idx) => (
          <div key={idx}>
            {item.subMenu ? (
              <div>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full flex items-center gap-3 py-2 px-3 rounded hover:bg-[#3B58FF] ${
                    location.pathname.includes(item.path) && "bg-[#47549A]"
                  }`}
                >
                  {item.icon}
                  {!collapsed && (
                    <span className="flex-1 text-left">{item.label}</span>
                  )}
                  {!collapsed &&
                    (openMenus.includes(item.label) ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </button>
                {openMenus.includes(item.label) && !collapsed && (
                  <div className="ml-8 space-y-1">
                    {item.subMenu.map((sub, subIdx) => (
                      <Link
                        key={subIdx}
                        to={sub.path}
                        className={`block py-1 px-3 text-sm rounded hover:bg-[#3a4163] ${
                          location.pathname.includes(sub.path)
                            ? "bg-[#3a4163]"
                            : ""
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center gap-3 py-2 px-3 rounded hover:bg-[#2f3654] ${
                  location.pathname.includes(item.path) && "bg-[#2f3654]"
                }`}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
