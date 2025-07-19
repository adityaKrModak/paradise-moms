import arrow from "@/assets/arrow.svg";
import Image from "next/image";
import { Sparkles, Leaf, Heart } from "lucide-react";

function Banners() {
  const banners = [
    {
      title: "PICKLE SALE",
      subtitle: "Organic Pickles",
      description: "Traditional flavors, organic ingredients",
      className: "banner",
      icon: Leaf,
      color: "text-white",
    },
    {
      title: "FRESH HARVEST",
      subtitle: "Farm Fresh Vegetables",
      description: "Straight from our organic farms",
      className: "banner",
      icon: Sparkles,
      color: "text-white",
    },
    {
      title: "ORGANIC SOAP",
      subtitle: "Natural Skincare",
      description: "Chemical-free, skin-friendly",
      className: "banner1",
      icon: Heart,
      color: "text-green-800",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Special <span className="text-gradient">Offers</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don&apos;t miss out on our exclusive deals and seasonal offers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`${banner.className} relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group`}
              style={{ minHeight: "280px" }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <banner.icon className={`w-5 h-5 ${banner.color}`} />
                      <span
                        className={`text-sm font-medium ${banner.color} opacity-90`}
                      >
                        {banner.title}
                      </span>
                    </div>
                    <h3
                      className={`text-2xl md:text-3xl font-bold ${banner.color} leading-tight`}
                    >
                      {banner.subtitle}
                    </h3>
                    <p className={`text-sm ${banner.color} opacity-80`}>
                      {banner.description}
                    </p>
                  </div>

                  {/* Discount Badge */}
                  <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    UP TO 30% OFF
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <button className="bg-white/95 backdrop-blur-sm hover:bg-white text-green-700 font-semibold px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    Shop Now
                    <Image
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      src={arrow || "/placeholder.svg"}
                      alt=""
                    />
                  </button>

                  {/* Decorative Element */}
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Sparkles
                      className={`w-8 h-8 ${banner.color} opacity-60`}
                    />
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="btn-primary">
            View All Offers
            <Sparkles className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Banners;
