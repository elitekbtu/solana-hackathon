import { motion } from 'framer-motion'
import { Sparkles, Zap, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { GooeyText } from '@/components/ui/gooey-text-morphing'
import { MarqueeDemo } from '@/components/demos/marquee-demo'
import { FooterDemo } from '@/components/demos/footer-demo'

function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100"
    >
      {/* Hero Section */}
      <motion.section 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="py-20 hero-gradient relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-accent-200/30 to-primary-200/30 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-primary-200/30 to-accent-200/30 rounded-full blur-2xl"
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-black/5 backdrop-blur-sm rounded-full px-6 py-3 border border-primary-200/50 mb-8">
              <Sparkles className="h-4 w-4 text-accent-600" />
              <span className="text-sm font-medium text-primary-800">Powered by Solana</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-6"
          >
            <GooeyText
              texts={["Create", "Epic", "Gaming", "NFTs"]}
              morphTime={1.5}
              cooldownTime={1}
              className="h-32"
              textClassName="text-6xl sm:text-7xl font-bold text-primary-900 tracking-tight"
            />
          </motion.div>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl text-primary-700 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Transform your gaming moments into valuable digital assets. 
            Mint, trade, and showcase your achievements on the blockchain.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg shadow-elegant"
              asChild
            >
              <Link to="/create">
                <Zap className="h-5 w-5 mr-2" />
                Start Creating
              </Link>
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="px-8 py-4 text-lg"
              asChild
            >
              <Link to="/gallery">
                <Star className="h-5 w-5 mr-2" />
                View Gallery
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Technology Marquee */}
      <section className="py-8 bg-gradient-to-r from-primary-50 to-accent-50">
        <MarqueeDemo />
      </section>

      {/* Footer */}
      <FooterDemo />
    </motion.div>
  )
}

export default Home