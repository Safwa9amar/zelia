"use client";
import Link from "next/link";
import { useState } from "react";
import ZeliaLogo from "./ZeliaLogo";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/catalog", label: "المتجر" },
    { href: "/catalog?sale=true", label: "العروض" },
    { href: "#about", label: "من نحن" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="header">
      <div className="header-inner container">
        {/* Logo */}
        <Link
          href="/"
          className="header-logo"
          aria-label="زيليا - الصفحة الرئيسية"
        >
          <ZeliaLogo />
        </Link>

        {/* Desktop Nav */}
        <nav className="header-nav" aria-label="التنقل الرئيسي">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="header-nav-link link-underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Search */}
          <div className="search-wrapper">
            {searchOpen && (
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحثي عن منتج..."
                  className="search-input"
                  autoFocus
                  aria-label="حقل البحث"
                />
              </form>
            )}
            <button
              className="icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="بحث"
            >
              {searchOpen ? (
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              )}
            </button>
          </div>

          {/* Wishlist */}
          <button className="icon-btn" aria-label="المفضلة">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Cart */}
          <button className="icon-btn cart-btn" aria-label="عربة التسوق">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-badge">3</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="icon-btn mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="القائمة"
          >
            {mobileMenuOpen ? (
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-menu-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(250, 245, 240, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--gray-light);
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          gap: 24px;
        }
        .header-logo {
          flex-shrink: 0;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        .header-nav {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .header-nav-link {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 15px;
          color: var(--dark-medium);
          text-decoration: none;
          transition: color 0.2s;
        }
        .header-nav-link:hover {
          color: var(--mauve);
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: var(--dark-medium);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            background-color 0.2s,
            color 0.2s;
          position: relative;
        }
        .icon-btn:hover {
          background: var(--mauve-pale);
          color: var(--mauve);
        }
        .cart-btn {
          position: relative;
        }
        .cart-badge {
          position: absolute;
          top: 6px;
          left: 6px;
          background: var(--mauve);
          color: white;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
        }
        .search-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .search-form {
          display: flex;
        }
        .search-input {
          background: var(--cream-dark);
          border: 1.5px solid var(--gray-light);
          border-radius: var(--radius-full);
          padding: 8px 16px;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--dark);
          width: 200px;
          outline: none;
          transition:
            border-color 0.2s,
            width 0.3s;
          text-align: right;
        }
        .search-input:focus {
          border-color: var(--mauve);
        }
        .mobile-menu-btn {
          display: none;
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          padding: 16px 24px 24px;
          gap: 4px;
          border-top: 1px solid var(--gray-light);
        }
        .mobile-menu-link {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 16px;
          color: var(--dark);
          text-decoration: none;
          padding: 12px 0;
          border-bottom: 1px solid var(--gray-light);
          transition: color 0.2s;
        }
        .mobile-menu-link:last-child {
          border-bottom: none;
        }
        .mobile-menu-link:hover {
          color: var(--mauve);
        }

        @media (max-width: 768px) {
          .header-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
          .mobile-menu {
            display: flex;
          }
          .search-input {
            width: 150px;
          }
        }
      `}</style>
    </header>
  );
}
