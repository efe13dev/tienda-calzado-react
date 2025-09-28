import React, { useEffect } from "react";
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

interface SEOHybridProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  product?: Product;
}

const SEOHybrid: React.FC<SEOHybridProps> = ({
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

  // Usar useEffect para manejar los meta tags que React Helmet no aplica correctamente
  useEffect(() => {
    const updateMetaTags = () => {
      // Función helper para crear o actualizar meta tags
      const setMetaTag = (
        selector: string,
        content: string,
        attribute = "content",
      ) => {
        let element = document.querySelector(selector) as HTMLMetaElement;

        if (!element) {
          element = document.createElement("meta");
          if (selector.includes("property=")) {
            const property = selector.match(/property="([^"]+)"/)?.[1];

            if (property) element.setAttribute("property", property);
          } else if (selector.includes("name=")) {
            const name = selector.match(/name="([^"]+)"/)?.[1];

            if (name) element.setAttribute("name", name);
          }
          document.head.appendChild(element);
        }
        element.setAttribute(attribute, content);
      };

      // Función helper para crear o actualizar links
      const setLinkTag = (rel: string, href: string, hreflang?: string) => {
        const selector = hreflang
          ? `link[rel="${rel}"][hreflang="${hreflang}"]`
          : `link[rel="${rel}"]`;
        let element = document.querySelector(selector) as HTMLLinkElement;

        if (!element) {
          element = document.createElement("link");
          element.setAttribute("rel", rel);
          if (hreflang) element.setAttribute("hreflang", hreflang);
          document.head.appendChild(element);
        }
        element.setAttribute("href", href);
      };

      // Aplicar meta tags básicos
      setMetaTag('meta[name="keywords"]', keywords);
      setMetaTag('meta[name="author"]', "MisPapes");
      setMetaTag('meta[name="robots"]', robotsContent);
      setMetaTag('meta[name="googlebot"]', robotsContent);

      // Aplicar Open Graph tags
      setMetaTag('meta[property="og:type"]', ogType);
      setMetaTag('meta[property="og:title"]', fullTitle);
      setMetaTag('meta[property="og:description"]', description);
      setMetaTag('meta[property="og:image"]', ogImage);
      setMetaTag('meta[property="og:url"]', canonicalUrl);
      setMetaTag('meta[property="og:site_name"]', "MisPapes");
      setMetaTag('meta[property="og:locale"]', "es_ES");

      // Aplicar Twitter Card tags
      setMetaTag('meta[name="twitter:card"]', "summary_large_image");
      setMetaTag('meta[name="twitter:title"]', fullTitle);
      setMetaTag('meta[name="twitter:description"]', description);
      setMetaTag('meta[name="twitter:image"]', ogImage);

      // Aplicar links
      setLinkTag("canonical", canonicalUrl);
      setLinkTag("alternate", canonicalUrl, "es");

      // Aplicar datos estructurados
      const getStructuredData = () => {
        if (product) {
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
          sameAs: [
            "https://facebook.com/mispapes",
            "https://instagram.com/mispapes",
          ],
          // Añadimos información específica para zapatillas de casa
          category: "Zapatillas de casa y calzado para hogar",
          makesOffer: {
            "@type": "Offer",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
        };
      };

      // Actualizar datos estructurados
      let structuredDataScript = document.querySelector(
        'script[type="application/ld+json"]',
      );

      if (!structuredDataScript) {
        structuredDataScript = document.createElement("script");
        structuredDataScript.setAttribute("type", "application/ld+json");
        document.head.appendChild(structuredDataScript);
      }
      structuredDataScript.textContent = JSON.stringify(getStructuredData());
    };

    // Aplicar después de un pequeño delay para asegurar que React Helmet haya terminado
    const timer = setTimeout(updateMetaTags, 100);

    return () => clearTimeout(timer);
  }, [
    fullTitle,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    ogType,
    noIndex,
    product,
  ]);

  // Usar React Helmet solo para title y description que sabemos que funcionan
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default SEOHybrid;
