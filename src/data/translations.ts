// Tipos para las traducciones
export interface NavigationTranslations {
  home: string;
  products: string;
  offers: string;
  contact: string;
}

export interface HeroTranslations {
  title: string;
  subtitle: string;
  description: string;
  viewProducts: string;
  specialOffers: string;
  customers: string;
  models: string;
  support: string;
}

export interface FeatureTranslations {
  title: string;
  description: string;
}

export interface FeaturesTranslations {
  title: string;
  subtitle: string;
  comfort: FeatureTranslations;
  quality: FeatureTranslations;
  shipping: FeatureTranslations;
  madeInSpain: FeatureTranslations;
}

export interface ProductsTranslations {
  title: string;
  subtitle: string;
  featured: string;
  viewAll: string;
  addToCart: string;
  featuredBadge: string;
  reviews: string;
}

export interface ProductDetailTranslations {
  addToCart: string;
  size: string;
  color: string;
  quantity: string;
  characteristics: string;
  notFound: string;
  backToProducts: string;
}

export interface CartTranslations {
  title: string;
  empty: string;
  emptyMessage: string;
  viewProducts: string;
  summary: string;
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  free: string;
  checkout: string;
  continueShopping: string;
}

export interface ContactTranslations {
  title: string;
  subtitle: string;
  sendMessage: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  send: string;
  contactInfo: string;
  schedule: string;
  phone: string;
  address: string;
  mondayFriday: string;
  saturday: string;
  sunday: string;
  closed: string;
}

export interface FooterTranslations {
  description: string;
  quickLinks: string;
  categories: string;
  contact: string;
  copyright: string;
}

export interface CommonTranslations {
  cart: string;
}

export interface LanguageTranslations {
  nav: NavigationTranslations;
  hero: HeroTranslations;
  features: FeaturesTranslations;
  products: ProductsTranslations;
  productDetail: ProductDetailTranslations;
  cart: CartTranslations;
  contact: ContactTranslations;
  footer: FooterTranslations;
  common: CommonTranslations;
}

export interface Translations {
  es: LanguageTranslations;
  en: LanguageTranslations;
}

export const translations: Translations = {
  es: {
    nav: {
      home: "Inicio",
      products: "Productos",
      offers: "Ofertas",
      contact: "Contacto",
    },
    hero: {
      title: "Zapatillas de Casa",
      subtitle: "Comodidad para tu Hogar",
      description:
        "Descubre nuestra colección exclusiva de zapatillas de estar en casa. Diseñadas para ofrecerte el máximo confort sin sacrificar el estilo. Perfectas para relajarte en casa.",
      viewProducts: "Ver Zapatillas",
      specialOffers: "Ofertas Especiales",
      customers: "Clientes Felices",
      models: "Modelos",
      support: "Soporte",
    },
    features: {
      title: "¿Por qué elegir MisPapes?",
      subtitle:
        "Nos especializamos en zapatillas de estar en casa que combinan estilo, comodidad y durabilidad",
      comfort: {
        title: "Comodidad Extrema",
        description:
          "Zapatillas diseñadas para brindarte el máximo confort en tu hogar",
      },
      quality: {
        title: "Calidad Garantizada",
        description:
          "Materiales premium y duraderos para zapatillas de larga vida útil",
      },
      shipping: {
        title: "Envío Rápido",
        description: "Recibe tus zapatillas en 24-48 horas en toda España",
      },
      madeInSpain: {
        title: "Fabricado en España",
        description:
          "Todas nuestras zapatillas son diseñadas y elaboradas en España",
      },
    },
    products: {
      title: "Nuestras Zapatillas",
      subtitle:
        "Explora nuestra completa colección de zapatillas para estar en casa",
      featured: "Zapatillas Destacadas",
      viewAll: "Ver Todos los Productos",
      addToCart: "Añadir",
      featuredBadge: "Destacado",
      reviews: "reseñas",
    },
    productDetail: {
      addToCart: "Añadir al Carrito",
      size: "Talla",
      color: "Color",
      quantity: "Cantidad",
      characteristics: "Características",
      notFound: "Producto no encontrado",
      backToProducts: "Volver a Productos",
    },
    cart: {
      title: "Tu Carrito",
      empty: "Tu carrito está vacío",
      emptyMessage:
        "Parece que aún no has añadido ningún producto a tu carrito.",
      viewProducts: "Ver Productos",
      summary: "Resumen del Pedido",
      subtotal: "Subtotal",
      shipping: "Envío",
      tax: "IVA",
      total: "Total",
      free: "Gratis",
      checkout: "Proceder al Pago",
      continueShopping: "Continuar Comprando",
    },
    contact: {
      title: "Contacto",
      subtitle:
        "Estamos aquí para ayudarte. Contáctanos para cualquier pregunta o sugerencia.",
      sendMessage: "Envíanos un Mensaje",
      name: "Nombre",
      email: "Email",
      subject: "Asunto",
      message: "Mensaje",
      send: "Enviar Mensaje",
      contactInfo: "Información de Contacto",
      schedule: "Horario de Atención",
      phone: "Teléfono",
      address: "Dirección",
      mondayFriday: "Lunes a Viernes",
      saturday: "Sábado",
      sunday: "Domingo",
      closed: "Cerrado",
    },
    footer: {
      description:
        "Tu tienda especializada en zapatillas cómodas y elegantes para estar en casa.",
      quickLinks: "Enlaces Rápidos",
      categories: "Categorías",
      contact: "Contacto",
      copyright: "Todos los derechos reservados.",
    },
    common: {
      cart: "Carrito",
    },
  },
  en: {
    nav: {
      home: "Home",
      products: "Products",
      offers: "Offers",
      contact: "Contact",
    },
    hero: {
      title: "House Slippers",
      subtitle: "Comfort for your Home",
      description:
        "Discover our exclusive collection of house slippers. Designed to offer you maximum comfort without sacrificing style. Perfect for relaxing at home.",
      viewProducts: "View Slippers",
      specialOffers: "Special Offers",
      customers: "Happy Customers",
      models: "Models",
      support: "Support",
    },
    features: {
      title: "Why Choose MisPapes?",
      subtitle:
        "We specialize in home footwear that combines style, comfort and durability",
      comfort: {
        title: "Extreme Comfort",
        description:
          "Slippers designed to provide you with maximum comfort at home",
      },
      quality: {
        title: "Guaranteed Quality",
        description: "Premium and durable materials for long-lasting slippers",
      },
      shipping: {
        title: "Fast Shipping",
        description: "Receive your slippers in 24-48 hours throughout Spain",
      },
      madeInSpain: {
        title: "Made in Spain",
        description: "All our slippers are designed and crafted in Spain",
      },
    },
    products: {
      title: "Our Slippers",
      subtitle: "Explore our complete collection of house slippers",
      featured: "Featured Slippers",
      viewAll: "View All Products",
      addToCart: "Add",
      featuredBadge: "Featured",
      reviews: "reviews",
    },
    productDetail: {
      addToCart: "Add to Cart",
      size: "Size",
      color: "Color",
      quantity: "Quantity",
      characteristics: "Characteristics",
      notFound: "Product not found",
      backToProducts: "Back to Products",
    },
    cart: {
      title: "Your Cart",
      empty: "Your cart is empty",
      emptyMessage: "It seems you haven't added any products to your cart yet.",
      viewProducts: "View Products",
      summary: "Order Summary",
      subtotal: "Subtotal",
      shipping: "Shipping",
      tax: "VAT",
      total: "Total",
      free: "Free",
      checkout: "Proceed to Checkout",
      continueShopping: "Continue Shopping",
    },
    contact: {
      title: "Contact",
      subtitle:
        "We are here to help. Contact us for any questions or suggestions.",
      sendMessage: "Send us a Message",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      contactInfo: "Contact Information",
      schedule: "Opening Hours",
      phone: "Phone",
      address: "Address",
      mondayFriday: "Monday to Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      closed: "Closed",
    },
    footer: {
      description:
        "Your specialized store in comfortable and elegant house slippers.",
      quickLinks: "Quick Links",
      categories: "Categories",
      contact: "Contact",
      copyright: "All rights reserved.",
    },
    common: {
      cart: "Cart",
    },
  },
};
