export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number;
          name: string;
          description: string;
          name_en: string;
          description_en: string;
          price: number;
          images: string[];
          season: "invierno" | "verano";
          sizes: number[];
          featured: boolean;
          gender: "hombre" | "mujer" | "unisex";
          oferta: boolean;
          discount: number | null;
          model: 100 | 142 | 77 | 110;
          characteristics: string[];
          characteristics_en: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          description: string;
          name_en: string;
          description_en: string;
          price: number;
          images: string[];
          season: "invierno" | "verano";
          sizes: number[];
          featured?: boolean;
          gender: "hombre" | "mujer" | "unisex";
          oferta?: boolean;
          discount?: number | null;
          model: 100 | 142 | 77 | 110;
          characteristics: string[];
          characteristics_en: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string;
          name_en?: string;
          description_en?: string;
          price?: number;
          images?: string[];
          season?: "invierno" | "verano";
          sizes?: number[];
          featured?: boolean;
          gender?: "hombre" | "mujer" | "unisex";
          oferta?: boolean;
          discount?: number | null;
          model?: 100 | 142 | 77 | 110;
          characteristics?: string[];
          characteristics_en?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
