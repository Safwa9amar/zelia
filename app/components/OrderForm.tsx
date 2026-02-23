"use client";
import { useState } from "react";
import { ecotrack } from "@/lib/ecotrack";
import { LocationSelector } from "./LocationSelector";
import {
  MdShoppingCartCheckout,
  MdHome,
  MdBusinessCenter,
} from "react-icons/md";

interface OrderFormProps {
  productName: string;
  basePrice: number;
}

export default function OrderForm({ productName, basePrice }: OrderFormProps) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    wilayaId: 0 as number | string,
    wilayaName: "",
    commune: "",
    address: "",
    deliveryType: "home",
    quantity: "قطعة واحدة",
  });
  const [loading, setLoading] = useState(false);

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
      await fetch(process.env.NEXT_PUBLIC_PRODUCT_FORM_URI || "", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          paymentMethod: "الدفع عند الاستلام",
        }),
      });

      const wilayaCode = Number(form.wilayaId);
      let montant = basePrice;
      if (form.quantity === "قطعتين (وفر 5%)") {
        montant = basePrice * 2 * 0.95;
      } else if (form.quantity === "3 قطع (وفر 10%)") {
        montant = basePrice * 3 * 0.9;
      }

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
          quantite: form.quantity,
          remarque: `الكمية: ${form.quantity}`,
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
        quantity: "قطعة واحدة",
      });
    } catch (error) {
      console.error(error);
      alert("❌ حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-form-wrap">
      <h3 className="order-title">
        <MdShoppingCartCheckout className="order-icon" />
        نموذج الطلب السريع
      </h3>

      <form className="order-fields" onSubmit={handleSubmit}>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="أدخلي اسمك الكامل"
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

        <div className="delivery-grid">
          <button
            type="button"
            onClick={() => setForm({ ...form, deliveryType: "home" })}
            className={`delivery-btn ${form.deliveryType === "home" ? "active" : ""}`}
          >
            <MdHome className="delivery-icon" />
            <span>للمنزل</span>
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, deliveryType: "office" })}
            className={`delivery-btn ${form.deliveryType === "office" ? "active" : ""}`}
          >
            <MdBusinessCenter className="delivery-icon" />
            <span>للمكتب</span>
          </button>
        </div>

        {form.deliveryType === "home" && (
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="أدخلي عنوان التوصيل الكامل"
            rows={3}
            className="order-input order-textarea"
            required
            disabled={loading}
          />
        )}

        <select
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="order-input order-select"
          disabled={loading}
        >
          <option>قطعة واحدة</option>
          <option>قطعتين (وفر 5%)</option>
          <option>3 قطع (وفر 10%)</option>
        </select>

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
      </form>

      <style jsx>{`
        .order-form-wrap {
          background: rgba(196, 168, 130, 0.12);
          border: 1.5px solid rgba(196, 168, 130, 0.35);
          border-radius: 20px;
          padding: 28px;
          margin-top: 32px;
        }
        .order-title {
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 700;
          color: var(--dark);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
        }
        :global(.order-icon) {
          color: var(--mauve);
          font-size: 22px;
        }
        .order-fields {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .order-input {
          width: 100%;
          background: white;
          border: 1.5px solid var(--gray-light);
          border-radius: 12px;
          padding: 12px 14px;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--dark);
          outline: none;
          transition: border-color 0.2s;
          text-align: right;
        }
        .order-input:focus {
          border-color: var(--mauve);
        }
        .order-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .order-input::placeholder {
          color: var(--gray-warm);
        }
        .order-textarea {
          resize: vertical;
          min-height: 80px;
        }
        .order-select {
          appearance: auto;
          cursor: pointer;
        }
        .delivery-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .delivery-btn {
          padding: 14px;
          border-radius: 12px;
          border: 2px solid var(--gray-light);
          background: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 700;
          color: var(--dark-medium);
          cursor: pointer;
          transition: all 0.2s;
        }
        .delivery-btn:hover {
          border-color: var(--mauve);
          color: var(--mauve);
        }
        .delivery-btn.active {
          border-color: var(--mauve);
          background: rgba(107, 68, 83, 0.08);
          color: var(--mauve);
        }
        :global(.delivery-icon) {
          font-size: 22px;
        }
        .order-submit {
          width: 100%;
          padding: 15px;
          background: var(--mauve);
          color: white;
          border: none;
          border-radius: 12px;
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition:
            background 0.2s,
            opacity 0.2s;
          margin-top: 4px;
        }
        .order-submit:hover:not(:disabled) {
          background: var(--mauve-light);
        }
        .order-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        :global(.spin-icon) {
          width: 20px;
          height: 20px;
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
      `}</style>
    </div>
  );
}
