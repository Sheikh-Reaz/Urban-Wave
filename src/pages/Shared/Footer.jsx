import React from "react";
import logo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className="py-10 px-10 max-w-7xl mx-auto">

        {/* ================= GRID LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* -------- LEFT : LOGO -------- */}
          <div className="lg:col-span-1">
            <img src={logo} alt="Logo" className="mb-4" />
            <p className="text-sm opacity-80 mt-2">
              Garments Order & Production Tracker System – simplifying order management and production workflow for garment factories.
            </p>
          </div>

          {/* -------- MIDDLE LEFT : CATEGORIES -------- */}
          <div className="lg:col-span-1">
            <h4 className="mb-4 font-semibold">CATEGORIES</h4>
            <ul className="space-y-2 opacity-80 text-sm">
              <li>For Men</li>
              <li>For Women</li>
              <li>Accessories</li>
              <li>Other</li>
            </ul>
          </div>

          {/* -------- MIDDLE RIGHT : COMPANY -------- */}
          <div className="lg:col-span-1">
            <h4 className="mb-4 font-semibold">COMPANY</h4>
            <ul className="space-y-2 opacity-80 text-sm">
              <li>About Us</li>
              <li>Blog</li>
              <li>FAQs</li>
            </ul>
          </div>

          {/* -------- RIGHT : STORE LOCATION -------- */}
          <div className="lg:col-span-1 text-sm opacity-85">
            <h4 className="mb-4 font-semibold">STORE LOCATION</h4>
            <p className="leading-relaxed">
              Box 565, Charlestown, Nevis,<br />
              West Indies, Caribbean
            </p>
            <p className="mt-4 underline">
              contact@example.com
            </p>
          </div>

        </div>

        {/* ================= DIVIDER ================= */}
        <div className="my-10 h-px w-full opacity-20 bg-current" />

        {/* ================= BOTTOM ROW ================= */}
        <div className="text-center text-xs opacity-70">
          Copyright © 2025 Sheikh Reaz. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
