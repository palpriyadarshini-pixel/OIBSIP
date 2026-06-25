import { motion } from "framer-motion";

function HeroSection() {
  return (
   <section className="min-h-screen w-full bg-[#111111] text-white flex items-center overflow-hidden">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">

        <div>

          <p className="text-orange-500 font-bold tracking-widest mb-4">
            PREMIUM PIZZA EXPERIENCE
          </p>

          <h1 className="text-6xl font-black leading-tight mb-6">
            Fix Your Hunger
            <span className="text-orange-500">
              {" "}With Pizza
            </span>
          </h1>

          <p className="text-gray-300 text-lg mb-8">
            Fresh ingredients.
            Premium cheese.
            Unlimited customization.
            Delivered hot.
          </p>

          <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full text-lg font-bold transition">
            Order Now
          </button>

        </div>

        <div className="relative flex justify-center">

          <div className="absolute w-[600px] h-[600px] border border-orange-500 rounded-full opacity-30"></div>

          <div className="absolute w-[700px] h-[700px] border border-orange-500 rounded-full opacity-10"></div>

            <div className="absolute w-[380px] h-[380px] bg-orange-500 blur-[150px] opacity-20 rounded-full">
            </div>
            <motion.div
            className="absolute top-12 left-12 z-20"
            animate={{ y: [0, -12, 0] ,
                rotate: [-2, 2, -2],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
            }}
            >
            <div className="backdrop-blur-md bg-white/5 border border-white/20 text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-500/20 transition-all duration-300">
                🌿 Fresh Basil
            </div>
            </motion.div>

            <motion.div 
                className="absolute top-20 right-8 z-20"
                animate={{ y: [0, -8, 0] }}
            transition={{
                duration: 4,
                repeat: Infinity,
            }}
            >
            <div className="backdrop-blur-md bg-white/5 border border-white/20 text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-500/20 transition-all duration-300">
                🧀 Mozzarella
            </div>
            </motion.div>

            <motion.div 
                className="absolute bottom-28 left-8 z-20"
                animate={{ y: [0, -15, 0],
                    rotate: [0, 3, 0],
                }}
            transition={{
                duration: 3.5,
                repeat: Infinity,
            }}
            >
            <div className="backdrop-blur-md bg-white/5 border border-white/20 text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-500/20 transition-all duration-300">
                🍅 Tomatoes
            </div>
            </motion.div>

            <motion.div 
                className="absolute bottom-12 right-12 z-20"
                animate={{ y: [0, -10, 0],
                    rotate: [-3, 3, -3],
                }}
                transition={{
                duration: 5,
                repeat: Infinity,
            }}>
            <div className="backdrop-blur-md bg-white/5 border border-white/20 text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-500/20 transition-all duration-300 ">
                🫒 Olives
            </div>
            </motion.div>

          <motion.img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
            alt="Pizza"
            className="w-[550px] h-[550px] object-cover rounded-full shadow-2xl z-10"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          />

        </div>

      </div>

    </section>
  );
}

export default HeroSection;