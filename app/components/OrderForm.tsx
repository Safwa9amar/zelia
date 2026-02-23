"use client";
import { useState } from "react";
import { ecotrack } from "@/lib/ecotrack";
import { LocationSelector } from "./LocationSelector";
import {
  MdShoppingCartCheckout,
  MdHome,
  MdBusinessCenter,
} from "react-icons/md";

interface Color {
  name: string;
  hex: string;
}

interface OrderFormProps {
  productName: string;
  basePrice: number;
  originalPrice?: number;
  colors?: Color[];
  sizes?: string[];
}

export default function OrderForm({
  productName,
  basePrice,
  originalPrice,
  colors = [],
  sizes = [],
}: OrderFormProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || "");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    wilayaId: 0 as number | string,
    wilayaName: "",
    commune: "",
    address: "",
    deliveryType: "home",
    quantity: "1",
  });
  const [loading, setLoading] = useState(false);

  const discount =
    originalPrice && originalPrice > basePrice
      ? Math.round(((originalPrice - basePrice) / originalPrice) * 100)
      : 0;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const colorName = colors[selectedColor]?.name || "";
      await fetch(process.env.NEXT_PUBLIC_PRODUCT_FORM_URI || "", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          productName,
          color: colorName,
          size: selectedSize,
          paymentMethod: "الدفع عند الاستلام",
        }),
      });

      const wilayaCode = Number(form.wilayaId);
      const quantityNum = Number(form.quantity);
      const montant = basePrice * quantityNum;

      try {
        await ecotrack.addOrder({
          nom_client: form.fullName,
          telephone: form.phone,
          adresse: form.address || `Stop Desk - ${form.commune}`,
          commune: form.commune,
          code_wilaya: wilayaCode,
          montant,
          type: 1,
          stop_desk: form.deliveryType === "office" ? 1 : 0,
          stock: 0,
          quantite: `${form.quantity} قطعة`,
          remarque: `اللون: ${colorName} | المقاس: ${selectedSize} | الكمية: ${form.quantity}`,
          produit: productName,
        });
      } catch (ecoError: any) {
        console.error("EcoTrack submission failed:", ecoError);
        if (ecoError.data?.errors?.stop_desk) {
          alert(
            "⚠️ خدمة 'توصيل للمكتب' غير متوفرة في هذه البلدية. يرجى اختيار 'توصيل للمنزل'.",
          );
          setLoading(false);
          return;
        }
        if (ecoError.data?.errors) {
          const firstError = Object.values(ecoError.data.errors)[0] as string[];
          alert(`❌ ${firstError[0] || "حدث خطأ في طلب EcoTrack"}`);
          setLoading(false);
          return;
        }
      }

      alert("✅ تم إرسال طلبك بنجاح");
      setForm({
        fullName: "",
        phone: "",
        wilayaId: 0,
        wilayaName: "",
        commune: "",
        address: "",
        deliveryType: "home",
        quantity: "1",
      });
      setSelectedColor(0);
      setSelectedSize(sizes[0] || "");
    } catch (error) {
      console.error(error);
      alert("❌ حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="order-form-header">
        <h3 className="order-header-title">اطلبي الآن</h3>
        {discount > 0 && (
          <span className="order-discount-badge">وفري {discount}%</span>
        )}
      </div>

      <div className="order-divider" />

      {/* Color Selection */}
      {colors.length > 0 && (
        <div className="order-section">
          <p className="order-section-label">
            اللون: <strong>{colors[selectedColor]?.name}</strong>
          </p>
          <div className="color-row">
            {colors.map((c, i) => (
              <button
                key={c.hex}
                type="button"
                className={`color-swatch ${selectedColor === i ? "active" : ""}`}
                style={{ backgroundColor: c.hex }}
                onClick={() => setSelectedColor(i)}
                title={c.name}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {sizes.length > 0 && (
        <div className="order-section">
          <p className="order-section-label">المقاس</p>
          <div className="size-row">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                className={`size-chip ${selectedSize === s ? "active" : ""}`}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="order-divider" />

      {/* Contact Info */}
      <div className="order-section">
        <p className="order-section-label">معلومات التوصيل</p>
        <div className="order-fields">
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="الاسم الكامل"
            className="order-input"
            required
            disabled={loading}
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            dir="ltr"
            placeholder="05 00 00 00 00"
            className="order-input"
            required
            disabled={loading}
          />
          <LocationSelector
            wilayaId={form.wilayaId}
            communeName={form.commune}
            onLocationChange={({ wilayaId, wilayaName, communeName }) => {
              setForm((prev) => ({
                ...prev,
                wilayaId,
                wilayaName,
                commune: communeName,
              }));
            }}
            disabled={loading}
          />
        </div>
      </div>

      {/* Delivery Type */}
      <div className="order-section">
        <p className="order-section-label">طريقة التوصيل</p>
        <div className="delivery-row">
          <button
            type="button"
            onClick={() => setForm({ ...form, deliveryType: "home" })}
            className={`delivery-opt ${form.deliveryType === "home" ? "active" : ""}`}
          >
            <MdHome className="delivery-opt-icon" />
            <span>للمنزل</span>
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, deliveryType: "office" })}
            className={`delivery-opt ${form.deliveryType === "office" ? "active" : ""}`}
          >
            <MdBusinessCenter className="delivery-opt-icon" />
            <span>للمكتب</span>
          </button>
        </div>
        {form.deliveryType === "home" && (
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="العنوان الكامل للتوصيل"
            rows={2}
            className="order-input order-textarea"
            required
            disabled={loading}
            style={{ marginTop: "10px" }}
          />
        )}
      </div>

      {/* Quantity */}
      <div className="order-section">
        <p className="order-section-label">الكمية</p>
        <select
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="order-input order-select"
          disabled={loading}
        >
          <option value="1">1 قطعة</option>
          <option value="2">2 قطع</option>
          <option value="3">3 قطع</option>
          <option value="4">4 قطع</option>
          <option value="5">5 قطع</option>
        </select>
      </div>

      {/* Submit */}
      <button type="submit" disabled={loading} className="order-submit">
        {loading ? (
          <>
            <svg
              className="spin-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            جاري الإرسال...
          </>
        ) : (
          "تأكيد الطلب"
        )}
      </button>

      <style jsx>{`
        .order-form {
          background: white;
          border: 1.5px solid var(--gray-light);
          border-radius: 20px;
          overflow: hidden;
          margin-top: 24px;
          box-shadow: 0 4px 24px rgba(107, 68, 83, 0.08);
        }
        .order-form-header {
          background: var(--mauve);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        :global(.order-header-icon) {
          color: rgba(255, 255, 255, 0.85);
          font-size: 22px;
          flex-shrink: 0;
        }
        .order-header-title {
          font-family: var(--font-heading);
          font-size: 17px;
          font-weight: 800;
          color: white;
          flex: 1;
        }
        .order-discount-badge {
          background: var(--warm-tan);
          color: white;
          font-family: var(--font-heading);
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .order-divider {
          height: 1px;
          background: var(--gray-light);
          margin: 0;
        }
        .order-section {
          padding: 16px 20px;
          border-bottom: 1px solid var(--gray-light);
        }
        .order-section:last-of-type {
          border-bottom: none;
        }
        .order-section-label {
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 700;
          color: var(--gray-warm);
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .order-section-label strong {
          color: var(--dark);
          font-size: 14px;
        }
        .color-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .color-swatch {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.15s;
          outline: 2px solid transparent;
          outline-offset: 2px;
        }
        .color-swatch:hover {
          outline-color: var(--mauve);
        }
        .color-swatch.active {
          outline-color: var(--mauve);
          outline-width: 2.5px;
          transform: scale(1.1);
        }
        .size-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .size-chip {
          padding: 8px 16px;
          border: 1.5px solid var(--gray-light);
          border-radius: 10px;
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 700;
          color: var(--dark-medium);
          background: white;
          cursor: pointer;
          transition: all 0.15s;
          min-width: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .size-chip:hover {
          border-color: var(--mauve);
          color: var(--mauve);
        }
        .size-chip.active {
          background: var(--mauve);
          border-color: var(--mauve);
          color: white;
        }
        .order-fields {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .order-input {
          width: 100%;
          background: #f9f6f4;
          border: 1.5px solid var(--gray-light);
          border-radius: 12px;
          padding: 12px 16px;
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--dark);
          outline: none;
          transition:
            border-color 0.2s,
            background 0.2s;
          text-align: right;
        }
        .order-input:focus {
          border-color: var(--mauve);
          background: white;
        }
        .order-input:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }
        .order-input::placeholder {
          color: var(--gray-warm);
        }
        .order-textarea {
          resize: none;
          min-height: 80px;
        }
        .order-select {
          appearance: auto;
          cursor: pointer;
        }
        .delivery-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .delivery-opt {
          padding: 14px;
          border-radius: 12px;
          border: 2px solid var(--gray-light);
          background: #f9f6f4;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 700;
          color: var(--dark-medium);
          cursor: pointer;
          transition: all 0.15s;
        }
        .delivery-opt:hover {
          border-color: var(--mauve);
          color: var(--mauve);
        }
        .delivery-opt.active {
          border-color: var(--mauve);
          background: var(--mauve-pale);
          color: var(--mauve);
        }
        :global(.delivery-opt-icon) {
          font-size: 24px;
        }
        .order-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 18px;
          background: var(--mauve);
          color: white;
          border: none;
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 900;
          cursor: pointer;
          transition: background 0.2s;
          letter-spacing: 0.3px;
        }
        .order-submit:hover:not(:disabled) {
          background: var(--mauve-light);
        }
        .order-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
        :global(.spin-icon) {
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .delivery-row {
            grid-template-columns: 1fr;
          }
          .order-form {
            margin-top: 16px;
          }
          .order-section {
            padding: 14px 16px;
          }
          .order-submit {
            font-size: 16px;
            padding: 16px;
          }
        }
      `}</style>
    </form>
  );
}
