import type { Product } from "../data/products";
import type { Database } from "../types/supabase";

import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";
import { useLanguage } from "../contexts/useLanguage";

type SupabaseProduct = Database["public"]["Tables"]["products"]["Row"];

/**
 * Convierte un producto de Supabase al tipo Product local
 */
function mapSupabaseProduct(supabaseProduct: SupabaseProduct, language: string = "es"): Product {
  return {
    id: supabaseProduct.id,
    name:
      language === "en" && supabaseProduct.name_en ? supabaseProduct.name_en : supabaseProduct.name,
    description:
      language === "en" && supabaseProduct.description_en
        ? supabaseProduct.description_en
        : supabaseProduct.description,
    price: supabaseProduct.price,
    images: supabaseProduct.images,
    season: supabaseProduct.season,
    sizes: supabaseProduct.sizes as Product["sizes"],
    featured: supabaseProduct.featured,
    gender: supabaseProduct.gender,
    oferta: supabaseProduct.oferta,
    discount: supabaseProduct.discount ?? undefined,
    model: supabaseProduct.model,
    characteristics:
      language === "en" && supabaseProduct.characteristics_en
        ? supabaseProduct.characteristics_en
        : supabaseProduct.characteristics,
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;

        setProducts((data || []).map((product) => mapSupabaseProduct(product, language)));
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [language]);

  return { products, loading, error };
}

export function useProductById(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

        if (error) throw error;

        setProduct(data ? mapSupabaseProduct(data, language) : null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, language]);

  return { product, loading, error };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("featured", true)
          .order("id", { ascending: true });

        if (error) throw error;

        setProducts((data || []).map((product) => mapSupabaseProduct(product, language)));
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, [language]);

  return { products, loading, error };
}

export function useProductsOnSale() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchProductsOnSale() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("oferta", true)
          .order("discount", { ascending: false });

        if (error) throw error;

        setProducts((data || []).map((product) => mapSupabaseProduct(product, language)));
      } catch (err) {
        console.error("Error fetching products on sale:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    fetchProductsOnSale();
  }, [language]);

  return { products, loading, error };
}

export function useWinterProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchWinterProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("season", "invierno")
          .order("id", { ascending: true });

        if (error) throw error;

        setProducts((data || []).map((product) => mapSupabaseProduct(product, language)));
      } catch (err) {
        console.error("Error fetching winter products:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    fetchWinterProducts();
  }, [language]);

  return { products, loading, error };
}

export function useSummerProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchSummerProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("season", "verano")
          .order("id", { ascending: true });

        if (error) throw error;

        setProducts((data || []).map((product) => mapSupabaseProduct(product, language)));
      } catch (err) {
        console.error("Error fetching summer products:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    fetchSummerProducts();
  }, [language]);

  return { products, loading, error };
}
