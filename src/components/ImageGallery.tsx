import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="relative overflow-hidden rounded-lg">
        <img src={selectedImage} alt={productName} className="h-96 w-full object-cover shadow-lg" />
      </div>

      {/* Miniaturas */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
              selectedImage === image
                ? "border-primary-600 scale-105"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`${productName} - Vista ${index + 1}`}
              className="h-20 w-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
