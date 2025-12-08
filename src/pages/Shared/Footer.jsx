import React from "react";
import logo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className=" py-10 px-10">

        {/* ================= TOP ROW ================= */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">

          {/* -------- LEFT : LOGO -------- */}
          <div className="w-full lg:w-1/4">
            <img src={logo} alt="Logo" />
          </div>

          {/* -------- MIDDLE : LINKS -------- */}
          <div className="w-full lg:w-2/4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">

            <div>
              <h4 className="mb-4 font-semibold">CATEGORIES</h4>
              <ul className="space-y-2 opacity-80">
                <li>For Men</li>
                <li>For Woman</li>
                <li>Accessories</li>
                <li>Other</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">ACCOUNT</h4>
              <ul className="space-y-2 opacity-80">
                <li>Wishlist</li>
                <li>Compare</li>
                <li>Subscribe</li>
                <li>Log in</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">QUICK LINKS</h4>
              <ul className="space-y-2 opacity-80">
                <li>Shipping & Returns</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>Vacancies</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">COMPANY</h4>
              <ul className="space-y-2 opacity-80">
                <li>About us</li>
                <li>Blog</li>
                <li>FAQs</li>
              </ul>
            </div>

          </div>

          {/* -------- RIGHT : STORE LOCATION -------- */}
          <div className="w-full lg:w-1/4 text-sm opacity-85">
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
