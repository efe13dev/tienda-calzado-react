import { Mail, MapPin, Phone, Send } from "lucide-react";
import React, { useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import SEOHybrid from "../components/SEOHybrid";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/useLanguage";
import { translations } from "../data/translations.ts";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { state } = useCart();
  const { language } = useLanguage();
  const t = translations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Gracias por contactarnos. Te responderemos pronto.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SEOHybrid
        title="Contacto | MisPapes Tienda de Calzado"
        description="Contacta con MisPapes para cualquier consulta sobre nuestros productos de calzado. Atención personalizada y respuesta rápida."
        keywords="contacto tienda calzado, atención cliente, zapatos online, soporte calzado, MisPapes contacto"
        canonicalUrl="https://mispapes.com/contacto"
        ogImage="https://mispapes.com/og-contact.jpg"
      />
      <Header cartCount={state.totalItems} />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">{t.contact.title}</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">{t.contact.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <div className="rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">{t.contact.sendMessage}</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                      {t.contact.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {t.contact.subject}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {t.contact.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="focus:ring-primary-500 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary flex w-full items-center justify-center"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {t.contact.send}
                  </button>
                </form>
              </div>
            </div>

            <div>
              <div className="rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">{t.contact.contactInfo}</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-lg">
                        <Mail className="text-primary-600 h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-900">{t.contact.email}</h3>
                      <p className="text-gray-600">info@mispapes.com</p>
                      <p className="text-gray-600">soporte@mispapes.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-lg">
                        <Phone className="text-primary-600 h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-900">{t.contact.phone}</h3>
                      <p className="text-gray-600">+34 900 123 456</p>
                      <p className="text-gray-600">{t.contact.mondayFriday}: 9:00 - 18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-lg">
                        <MapPin className="text-primary-600 h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-900">{t.contact.address}</h3>
                      <p className="text-gray-600">Calle Principal 123</p>
                      <p className="text-gray-600">28001 Madrid, España</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="mb-4 font-semibold text-gray-900">{t.contact.schedule}</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>{t.contact.mondayFriday}</span>
                      <span>9:00 - 18:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
