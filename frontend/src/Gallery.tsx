import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Eye, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FooterDemo } from '@/components/demos/footer-demo'

export default function Gallery() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100"
    >
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pt-20 pb-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            to="/about" 
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-800 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Team</span>
          </Link>
          
          <motion.h1 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl font-bold text-primary-900 mb-2"
          >
            Team Gallery
          </motion.h1>
          <motion.p 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-primary-700"
          >
            Behind the scenes moments from our development journey
          </motion.p>
        </div>
      </motion.header>

      {/* Main Gallery */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Featured Image */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-elegant transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                alt="Team Working"
                className="w-full h-96 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 right-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-xl font-bold mb-2">Development Session</h3>
                <p className="text-white/80 text-sm mb-4">Late night coding session working on the NFT minting platform</p>
                <div className="flex items-center space-x-4">
                  <Button size="sm" variant="secondary" className="text-xs">
                    <Heart className="h-3 w-3 mr-1" />
                    24
                  </Button>
                  <Button size="sm" variant="secondary" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    156
                  </Button>
                  <Button size="sm" variant="secondary" className="text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side Images */}
          {[
            {
              src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
              title: "Team Meeting",
              description: "Planning the roadmap"
            },
            {
              src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
              title: "Code Review",
              description: "Reviewing smart contracts"
            },
            {
              src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
              title: "UI Design",
              description: "Crafting user experience"
            },
            {
              src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
              title: "Testing Phase",
              description: "Quality assurance"
            }
          ].map((image, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl bg-white shadow-soft hover:shadow-elegant transition-all duration-300">
                <img 
                  src={image.src}
                  alt={image.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-white font-semibold text-sm mb-1">{image.title}</h4>
                  <p className="text-white/80 text-xs">{image.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <FooterDemo />
    </motion.div>
  )
}
