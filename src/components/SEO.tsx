import React from "react";
import { Helmet } from "react-helmet-async";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  product?: Product;
}

const SEO: React.FC<SEOProps> = ({
  title = "MisPapes | Zapatillas de Casa: Comodidad para tu Hogar",
  description = "Tienda especializada en zapatillas de estar en casa. Descubre nuestras zapatillas cómodas, pantuflas y calzado para hogar con envío gratis 24-48h. Calidad premium.",
  keywords = "zapatillas de casa, pantuflas, calzado para hogar, zapatillas comodas, comprar zapatillas online, calzado estar en casa, zapatillas hogar, pantuflas mujer, zapatillas hombre",
  canonicalUrl = "https://mispapes.com/",
  ogImage = "https://mispapes.com/og-image.jpg",
  ogType = "website",
  noIndex = false,
  product,
}) => {
  const fullTitle = title.includes("MisPapes") ? title : `${title} | MisPapes`;
  const robotsContent = noIndex ? "noindex, nofollow" : "index, follow";

  // Datos estructurados dinámicos según el tipo de página
  const getStructuredData = () => {
    if (product) {
      // Datos estructurados para productos
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.image,
        brand: {
          "@type": "Brand",
          name: product.brand || "MisPapes",
        },
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "EUR",
          availability: `https://schema.org/${product.availability || "InStock"}`,
          seller: {
            "@type": "Organization",
            name: "MisPapes",
            url: "https://mispapes.com/",
          },
        },
        category: product.category,
        url: canonicalUrl,
        // Información específica para zapatillas de casa
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Tipo de calzado",
            value: "Zapatillas de estar en casa",
          },
          {
            "@type": "PropertyValue",
            name: "Uso recomendado",
            value: "Hogar e interior",
          },
        ],
      };
    }

    // Datos estructurados para la organización (páginas generales)
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "MisPapes",
      url: "https://mispapes.com/",
      logo: "https://mispapes.com/logo.png",
      description: description,
      address: {
        "@type": "PostalAddress",
        addressCountry: "ES",
      },
      sameAs: ["https://facebook.com/mispapes", "https://instagram.com/mispapes"],
      // Añadimos información específica para zapatillas de casa
      category: "Zapatillas de casa y calzado para hogar",
      makesOffer: {
        "@type": "Offer",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    };
  };

  const structuredData = getStructuredData();

  return (
    <Helmet>
      {/* Título de la página */}
      <title>{fullTitle}</title>

      {/* Meta tags básicos */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="MisPapes" />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="MisPapes" />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Enlaces canónicos y alternativos */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="es" href={canonicalUrl} />

      {/* Datos estructurados JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default SEO;
