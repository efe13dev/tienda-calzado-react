import type { Product, ProductGender, ProductSeason } from "../data/products";
import type { Database } from "../types/supabase";

import { supabase } from "../lib/supabase";

type SupabaseProduct = Database["public"]["Tables"]["products"]["Row"];

/**
 * Convierte un producto de Supabase al tipo Product local
 */
function mapSupabaseProduct(supabaseProduct: SupabaseProduct): Product {
  return {
    id: supabaseProduct.id,
    name: supabaseProduct.name,
    description: supabaseProduct.description,
    price: supabaseProduct.price,
    images: supabaseProduct.images,
    season: supabaseProduct.season,
    sizes: supabaseProduct.sizes as Product["sizes"],
    featured: supabaseProduct.featured,
    gender: supabaseProduct.gender,
    oferta: supabaseProduct.oferta,
    discount: supabaseProduct.discount ?? undefined,
    model: supabaseProduct.model,
    characteristics: supabaseProduct.characteristics,
  };
}

export interface ProductFilters {
  gender?: ProductGender;
  season?: ProductSeason;
  featured?: boolean;
  oferta?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Obtiene todos los productos con filtros opcionales
 */
export async function getProducts(filters?: ProductFilters) {
  try {
    let query = supabase.from("products").select("*");

    if (filters?.gender) {
      query = query.eq("gender", filters.gender);
    }

    if (filters?.season) {
      query = query.eq("season", filters.season);
    }

    if (filters?.featured !== undefined) {
      query = query.eq("featured", filters.featured);
    }

    if (filters?.oferta !== undefined) {
      query = query.eq("oferta", filters.oferta);
    }

    if (filters?.minPrice !== undefined) {
      query = query.gte("price", filters.minPrice);
    }

    if (filters?.maxPrice !== undefined) {
      query = query.lte("price", filters.maxPrice);
    }

    query = query.order("id", { ascending: true });

    const { data, error } = await query;

    if (error) throw error;

    return { data: (data || []).map(mapSupabaseProduct), error: null };
  } catch (error) {
    console.error("Error fetching products:", error);

    return {
      data: null,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

/**
 * Obtiene un producto por su ID
 */
export async function getProductById(id: number) {
  try {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

    if (error) throw error;

    return { data: data ? mapSupabaseProduct(data) : null, error: null };
  } catch (error) {
    console.error("Error fetching product:", error);

    return {
      data: null,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

/**
 * Obtiene productos destacados
 */

export async function getFeaturedProducts() {
  return getProducts({ featured: true });
}

/**
 * Obtiene productos en oferta
 */

export async function getProductsOnSale() {
  return getProducts({ oferta: true });
}

/**
 * Busca productos por nombre o descripción
 */

export async function searchProducts(searchTerm: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order("id", { ascending: true });

    if (error) throw error;

    return { data: (data || []).map(mapSupabaseProduct), error: null };
  } catch (error) {
    console.error("Error searching products:", error);

    return {
      data: null,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
