import { Zap, Users, Rocket, Gamepad2, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { AnimatedTooltipDemo } from '@/components/demos/animated-tooltip-demo'
import { MarqueeDemo } from '@/components/demos/marquee-demo'
import { FooterDemo } from '@/components/demos/footer-demo'


const features = [
  {
    title: "Gaming NFTs",
    description: "Create NFTs from gaming assets and achievements with seamless integration.",
    icon: Gamepad2,
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Easy Upload",
    description: "Intuitive drag-and-drop interface for uploading gaming images and assets.",
    icon: Rocket,
    color: "from-accent-500 to-accent-600"
  },
  {
    title: "Fast Transactions",
    description: "Lightning-fast NFT minting powered by Solana's high-performance blockchain.",
    icon: Zap,
    color: "from-green-500 to-green-600"
  }
]


export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <motion.section 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="py-24 hero-gradient relative overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-16 right-16 w-40 h-40 bg-gradient-to-br from-accent-200/20 to-primary-200/20 rounded-full blur-2xl"
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-black/5 backdrop-blur-sm rounded-full px-6 py-3 border border-primary-200/50 mb-8">
              <Users className="h-4 w-4 text-accent-600" />
              <span className="text-sm font-medium text-primary-800">Meet the Team</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-6xl sm:text-7xl font-bold text-primary-900 mb-6 tracking-tight"
          >
            <span className="gradient-text">Butaq</span> Team
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-primary-700 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Passionate developers and innovators creating the future of gaming NFTs. 
            We're building tomorrow's digital asset platform today.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="px-8 py-4 text-lg shadow-elegant">
              <Link to="/">
                <Rocket className="h-5 w-5 mr-2" />
                Start Building
              </Link>
            </Button>
            <Button variant="secondary" size="lg" className="px-8 py-4 text-lg">
              <Heart className="h-5 w-5 mr-2" />
              Our Mission
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Our <span className="gradient-text">Solution</span>
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto">
              Revolutionary tools that make NFT creation simple, fast, and accessible for gamers everywhere.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="text-center h-full group hover:shadow-elegant transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-primary-900">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-primary-600 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <AnimatedTooltipDemo />
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <MarqueeDemo />
          </motion.div>
        </div>
      </section>



      {/* Footer */}
      <FooterDemo />
    </motion.div>
  )
}
