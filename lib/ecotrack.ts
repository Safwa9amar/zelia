/**
 * EcoTrack API Client
 *
 * Documentation highlights:
 * - Base URL: {{url}}/api/v1
 * - Authentication: Bearer Token
 */

const ECOTRACK_API_URL =
  process.env.NEXT_PUBLIC_ECOTRACK_API_URL || "https://swift.ecotrack.dz/api/v1";
const ECOTRACK_API_TOKEN = process.env.NEXT_PUBLIC_ECOTRACK_API_TOKEN;

export interface EcoTrackFee {
  wilaya_id: number;
  tarif: string;
  tarif_stopdesk: string;
}

export interface EcoTrackFeesResponse {
  livraison: EcoTrackFee[];
  pickup: EcoTrackFee[];
  echnage: EcoTrackFee[];
  recouvrement: EcoTrackFee[];
  retours: EcoTrackFee[];
}

export interface EcoTrackWilaya {
  wilaya_id: number;
  wilaya_name: string;
}

export interface EcoTrackCommune {
  commune_id: number;
  commune_name: string;
  wilaya_id: number;
}

export interface EcoTrackTokenResponse {
  success: boolean;
  message: "INVALID_TOKEN" | "TOKEN_NOT_ALLOWED" | "VALID_TOKEN";
}

export interface EcoTrackReturnResponse {
  success: boolean;
  error?: number;
  message: string;
}

export type EcoTrackTrackingStatus =
  | "order_information_received_by_carrier"
  | "picked"
  | "accepted_by_carrier"
  | "dispatched_to_driver"
  | "attempt_delivery"
  | "return_asked"
  | "return_in_transit"
  | "Return_received"
  | "livred"
  | "encaissed"
  | "payed";

export interface EcoTrackTrackingInfo {
  status: EcoTrackTrackingStatus;
  date: string;
  time: string;
  station: string;
  driver: string;
  reason?: string;
  details?: string;
}

export interface EcoTrackStatusActivity {
  reason: string;
  details: string;
  station: string;
  driver: string;
  date: string;
  time: string;
  postponed_to: string | null;
}

export type EcoTrackOrderStatusType =
  | "prete_a_expedier"
  | "en_ramassage"
  | "en_preparation_stock"
  | "vers_hub"
  | "en_hub"
  | "vers_wilaya"
  | "en_preparation"
  | "en_livraison"
  | "suspendu"
  | "livre_non_encaisse"
  | "encaisse_non_paye"
  | "paiements_prets"
  | "paye_et_archive"
  | "retour_chez_livreur"
  | "retour_transit_entrepot"
  | "retour_en_traitement"
  | "retour_recu"
  | "retour_archive"
  | "annule"
  | "all";

export interface EcoTrackOrderStatus {
  status: EcoTrackOrderStatusType;
  order_id: string;
  desk_phone?: string;
  desk_commune?: string;
  desk_map_link?: string;
  desk_address?: string;
  driver_phone?: string;
  estimated_fee?: number;
  activity: EcoTrackStatusActivity[];
}

export interface EcoTrackOrdersStatusResponse {
  data: Record<string, EcoTrackOrderStatus>;
}

export interface EcoTrackOrderItem {
  tracking: string;
  reference: string | null;
  client: string;
  phone: string;
  phone_2: string | null;
  adresse: string;
  commune: string;
  wilaya_id: number;
  montant: string;
  tarif_prestation: string;
  tarif_retour: string;
  type_id: number;
  created_at: string;
  payment_id: number | null;
  return_id: number | null;
  status: string;
  products: string;
}

export interface EcoTrackOrdersResponse {
  current_page: number;
  data: EcoTrackOrderItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface EcoTrackProduct {
  reference: string;
  barcode: string | null;
  title: string;
  is_active: number;
  image: string | null;
  stock_disponible: number;
  stock_reserve: number;
  stock_phisique: number;
}

export interface EcoTrackProductsResponse {
  products: EcoTrackProduct[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}

export interface EcoTrackOrder {
  reference?: string;
  nom_client: string;
  telephone: string;
  telephone_2?: string;
  adresse: string;
  code_postal?: string;
  commune: string;
  code_wilaya: number; // 1-58
  montant: number;
  remarque?: string;
  produit?: string;
  stock: 0 | 1;
  quantite?: string;
  produit_a_recuperer?: string;
  boutique?: string;
  type: 1 | 2 | 3 | 4; // 1 = Livraison, 2 = Echange, 3 = PICKUP, 4 = Recouvrement
  stop_desk?: 0 | 1; // 0 = a domicile, 1 = STOP DESK
  weight?: string;
  fragile?: 0 | 1;
  gps_link?: string;
}

class EcoTrackClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${ECOTRACK_API_URL}${endpoint}`;
    const headers = {
      Authorization: `Bearer ${ECOTRACK_API_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(
        `EcoTrack API error: ${response.status} ${response.statusText}`
      );
      (error as any).data = errorData;
      throw error;
    }

    return response.json();
  }

  async validateToken(): Promise<EcoTrackTokenResponse> {
    return this.request<EcoTrackTokenResponse>(
      `/validate/token?api_token=${ECOTRACK_API_TOKEN}`
    );
  }

  async getFees(): Promise<EcoTrackFeesResponse> {
    return this.request<EcoTrackFeesResponse>("/get/fees");
  }

  async getProductsList(page: number = 1): Promise<EcoTrackProductsResponse> {
    return this.request<EcoTrackProductsResponse>(`/get/products/list?page=${page}`);
  }

  async addOrder(orderData: EcoTrackOrder): Promise<any> {
    return this.request("/create/order", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  async askForReturn(tracking: string): Promise<EcoTrackReturnResponse> {
    return this.request<EcoTrackReturnResponse>(
      `/ask/for/order/return?tracking=${tracking}`,
      { method: "POST" }
    );
  }

  async getTrackingInfo(tracking: string): Promise<EcoTrackTrackingInfo[]> {
    return this.request<EcoTrackTrackingInfo[]>(
      `/get/tracking/info?tracking=${tracking}`
    );
  }

  async getOrdersStatus(
    trackings: string[],
    statuses: (EcoTrackOrderStatusType | string)[]
  ): Promise<EcoTrackOrdersStatusResponse> {
    const trackingsStr = trackings.join(",");
    const statusStr = statuses.join(",");
    return this.request<EcoTrackOrdersStatusResponse>(
      `/get/orders/status?api_token=${ECOTRACK_API_TOKEN}&trackings=${trackingsStr}&status=${statusStr}`
    );
  }

  async getOrders(
    page: number = 1,
    startDate?: string,
    endDate?: string
  ): Promise<EcoTrackOrdersResponse> {
    let endpoint = `/get/orders?page=${page}`;
    if (startDate) endpoint += `&start_date=${startDate}`;
    if (endDate) endpoint += `&end_date=${endDate}`;
    return this.request<EcoTrackOrdersResponse>(endpoint);
  }

  async getWilayas(): Promise<EcoTrackWilaya[]> {
    return this.request<EcoTrackWilaya[]>("/get/wilayas");
  }

  async getCommunes(wilayaId?: number): Promise<EcoTrackCommune[]> {
    const endpoint = wilayaId
      ? `/get/communes?wilaya_id=${wilayaId}`
      : "/get/communes";
    return this.request<EcoTrackCommune[]>(endpoint);
  }
}

export const ecotrack = new EcoTrackClient();
