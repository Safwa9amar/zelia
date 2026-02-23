"use client";
import { useState, useEffect } from "react";
import { ecotrack, EcoTrackWilaya, EcoTrackCommune } from "@/lib/ecotrack";
import { MdExpandMore } from "react-icons/md";

interface LocationSelectorProps {
  wilayaId: number | string;
  communeName: string;
  onLocationChange: (data: {
    wilayaId: number;
    wilayaName: string;
    communeName: string;
  }) => void;
  disabled?: boolean;
}

export function LocationSelector({
  wilayaId,
  communeName,
  onLocationChange,
  disabled,
}: LocationSelectorProps) {
  const [wilayas, setWilayas] = useState<EcoTrackWilaya[]>([]);
  const [communes, setCommunes] = useState<EcoTrackCommune[]>([]);
  const [loadingWilayas, setLoadingWilayas] = useState(false);
  const [loadingCommunes, setLoadingCommunes] = useState(false);
  useEffect(() => {
    async function loadWilayas() {
      setLoadingWilayas(true);
      try {
        const data = await ecotrack.getWilayas();
        setWilayas(data);
      } catch (error) {
        console.error("Failed to load wilayas", error);
      } finally {
        setLoadingWilayas(false);
      }
    }
    loadWilayas();
  }, []);

  useEffect(() => {
    if (!wilayaId) {
      setCommunes([]);
      return;
    }
    async function loadCommunes() {
      setLoadingCommunes(true);
      try {
        const data = await ecotrack.getCommunes(Number(wilayaId));
        setCommunes(data);
      } catch (error) {
        console.error("Failed to load communes", error);
      } finally {
        setLoadingCommunes(false);
      }
    }
    loadCommunes();
  }, [wilayaId]);

  const handleWilayaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    const selectedWilaya = wilayas.find((w) => w.wilaya_id === id);
    if (selectedWilaya) {
      onLocationChange({
        wilayaId: id,
        wilayaName: selectedWilaya.wilaya_name,
        communeName: "",
      });
    } else {
      onLocationChange({ wilayaId: 0, wilayaName: "", communeName: "" });
    }
  };

  const handleCommuneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWilaya = wilayas.find(
      (w) => w.wilaya_id === Number(wilayaId),
    );
    onLocationChange({
      wilayaId: Number(wilayaId),
      wilayaName: selectedWilaya?.wilaya_name || "",
      communeName: e.target.value,
    });
  };

  return (
    <div className="loc-wrapper">
      <div className="loc-field">
        <select
          value={wilayaId}
          onChange={handleWilayaChange}
          className="loc-select"
          required
          disabled={disabled || loadingWilayas}
        >
          <option value="">
            {loadingWilayas ? "جاري تحميل الولايات..." : "اختاري الولاية"}
          </option>
          {wilayas.map((w, index) => (
            <option key={w.wilaya_id || index} value={w.wilaya_id}>
              {w.wilaya_id} — {w.wilaya_name}
            </option>
          ))}
        </select>
        <MdExpandMore className="loc-chevron" />
      </div>

      <div className="loc-field">
        <select
          value={communeName}
          onChange={handleCommuneChange}
          className="loc-select"
          required
          disabled={disabled || !wilayaId || loadingCommunes}
        >
          <option value="">
            {loadingCommunes ? "جاري تحميل البلديات..." : "اختاري البلدية"}
          </option>
          {communes.map((c, index) => (
            <option key={c.nom || index} value={c.nom}>
              {c.nom}
            </option>
          ))}
        </select>
        <MdExpandMore className="loc-chevron" />
      </div>

      <style jsx>{`
        .loc-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .loc-field {
          position: relative;
        }
        .loc-select {
          width: 100%;
          background: white;
          border: 1.5px solid var(--gray-light);
          border-radius: 12px;
          padding: 12px 14px;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--dark);
          outline: none;
          appearance: none;
          cursor: pointer;
          transition: border-color 0.2s;
          text-align: right;
        }
        .loc-select:focus {
          border-color: var(--mauve);
        }
        .loc-select:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          background: #f9f6f4;
        }
        :global(.loc-chevron) {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--gray-warm);
          font-size: 20px;
        }
      `}</style>
    </div>
  );
}
