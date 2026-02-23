import Link from "next/link";
import ZeliaLogo from "./ZeliaLogo";
import {
  IoMailOutline,
  IoCallOutline,
  IoTimeOutline,
  IoHeart,
} from "react-icons/io5";

export default function Footer() {
  const year = 2026;

  return (
    <footer className="footer">
      <div className="footer-inner container">
        {/* Brand Column */}
        <div className="footer-brand">
          <ZeliaLogo size={100} />
          <p className="footer-tagline">
            أناقة في كل تفصيل — نُقدّم لكِ أرقى التصاميم العصرية مع لمسة عربية
            أصيلة.
          </p>
          <div className="social-links">
            {[
              {
                label: "إنستغرام",
                icon: (
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                ),
              },
              {
                label: "تويتر/X",
                icon: (
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
              {
                label: "فيسبوك",
                icon: (
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                ),
              },
            ].map((s) => (
              <button key={s.label} className="social-btn" aria-label={s.label}>
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        <div className="footer-col">
          <h3 className="footer-col-heading">المتجر</h3>
          <ul className="footer-links">
            {["فساتين", "بلوزات", "تنانير", "معاطف", "إكسسوارات", "عبايات"].map(
              (c) => (
                <li key={c}>
                  <Link
                    href={`/catalog?category=${encodeURIComponent(c)}`}
                    className="footer-link"
                  >
                    {c}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-col-heading">خدمة العملاء</h3>
          <ul className="footer-links">
            {[
              "سياسة الإرجاع",
              "دليل المقاسات",
              "تتبع الطلب",
              "الشحن والتوصيل",
              "الأسئلة الشائعة",
            ].map((l) => (
              <li key={l}>
                <Link href="#" className="footer-link">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-col-heading">تواصل معنا</h3>
          <ul className="footer-links">
            <li className="footer-contact">
              <IoMailOutline className="contact-icon" />
              <span>hello@zelia.dz</span>
            </li>
            <li className="footer-contact">
              <IoCallOutline className="contact-icon" />
              <span>+213 000 000 000</span>
            </li>
            <li className="footer-contact">
              <IoTimeOutline className="contact-icon" />
              <span>السبت – الخميس، 9ص – 6م</span>
            </li>
          </ul>
          <div className="newsletter">
            <p className="newsletter-label">اشتركي في نشرتنا</p>
            <form
              className="newsletter-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="بريدكِ الإلكتروني"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                اشتراك
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          © {year} زيليا. جميع الحقوق محفوظة. صُنع بـ{" "}
          <span className="heart-icon">
            <IoHeart />
          </span>{" "}
          في الجزائر
        </p>
      </div>

      <style jsx>{`
        .footer {
          background: var(--dark);
          color: var(--cream);
          margin-top: 80px;
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.4fr;
          gap: 48px;
          padding-top: 64px;
          padding-bottom: 48px;
        }
        .footer-brand {
        }
        .footer-tagline {
          font-size: 14px;
          color: var(--gray-warm);
          line-height: 1.8;
          margin-top: 16px;
          max-width: 240px;
        }
        .social-links {
          display: flex;
          gap: 8px;
          margin-top: 20px;
        }
        .social-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: var(--gray-warm);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            background 0.2s,
            color 0.2s;
        }
        .social-btn:hover {
          background: var(--mauve);
          color: white;
        }
        .footer-col {
        }
        .footer-col-heading {
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 700;
          color: white;
          margin-bottom: 20px;
          letter-spacing: 0.5px;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-link {
          font-size: 14px;
          color: var(--gray-warm);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: var(--warm-tan-light);
        }
        .footer-contact {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--gray-warm);
        }
        .newsletter {
          margin-top: 24px;
        }
        .newsletter-label {
          font-size: 13px;
          color: var(--gray-warm);
          margin-bottom: 10px;
          font-family: var(--font-heading);
          font-weight: 600;
        }
        .newsletter-form {
          display: flex;
          gap: 6px;
        }
        .newsletter-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-full);
          padding: 9px 14px;
          font-family: var(--font-body);
          font-size: 13px;
          color: white;
          outline: none;
          text-align: right;
        }
        .newsletter-input::placeholder {
          color: var(--gray-warm);
        }
        .newsletter-input:focus {
          border-color: var(--warm-tan);
        }
        .newsletter-btn {
          background: var(--mauve);
          color: white;
          border: none;
          border-radius: var(--radius-full);
          padding: 9px 16px;
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .newsletter-btn:hover {
          background: var(--mauve-light);
        }
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 20px 0;
          text-align: center;
        }
        .footer-copy {
          font-size: 13px;
          color: var(--gray-warm);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .heart-icon {
          color: #ff4d4d;
          display: flex;
          align-items: center;
        }
        .contact-icon {
          font-size: 16px;
          color: var(--warm-tan);
        }

        @media (max-width: 1024px) {
          .footer-inner {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }
        @media (max-width: 600px) {
          .footer-inner {
            grid-template-columns: 1fr;
            gap: 32px;
            padding-top: 40px;
          }
          .footer-tagline {
            max-width: 100%;
          }
        }
      `}</style>
    </footer>
  );
}
