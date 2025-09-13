import { Zap, ArrowRight } from 'lucide-react'

const teamMembers = [
  {
    name: "Alibek Anuarbek",
    role: "Product Manager",
    description: "Product manager for the Butaq NFT Studio. Responsible for the overall product strategy and vision."
  },
  {
    name: "Ualikhanuly Beknur",
    role: "Backend Developer",
    description: "Creating beautiful and intuitive user interfaces that make NFT creation accessible to everyone in the gaming community."
  },
  {
    name: "Yermakhan Sultan",
    role: "Backend Developer",
    description: "Building robust backend services and APIs that power our NFT minting platform with seamless transaction processing."
  },
  {
    name: "Satbaldiyev Turarbek",
    role: "Full-Stack Developer",
    description: "Leading the development of our Solana-based NFT minting platform with expertise in blockchain technology and smart contracts. End-to-end development."
  }
]

const teamPhotos = [
  "/team/team.jpg",
  "/team/team2.jpg", 
  "/team/team3.jpg"
]

const features = [
  {
    title: "Gaming NFTs",
    description: "Create NFTs from gaming assets and achievements."
  },
  {
    title: "Easy Upload",
    description: "Simple interface for uploading gaming images."
  },
  {
    title: "Fast Transactions",
    description: "Quick NFT minting powered by Solana."
  }
]

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-6">
            Butaq Team
          </h1>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto">
            Creating NFT solutions for the gaming industry
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            Our Solution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 border border-blue-200 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">{feature.title}</h3>
                <p className="text-blue-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Photos Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            Our Team
          </h2>
          
          {/* Team Photos Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {teamPhotos.map((photo, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
                <img 
                  src={photo} 
                  alt={`Team Photo ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Team Members List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 mb-3 font-medium">{member.role}</p>
                <p className="text-sm text-blue-700">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "React", "TypeScript", "Solana", "Node.js",
              "Anchor", "Tailwind", "Vite", "Rust"
            ].map((tech, index) => (
              <div key={index} className="text-center p-4 border border-blue-200 rounded-lg">
                <span className="text-blue-900 font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Create Gaming NFTs?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Start creating and trading your digital gaming assets today.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Start Minting
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-6 w-6" />
            <span className="text-xl font-bold">Butaq Team</span>
          </div>
          <p className="text-blue-200">
            © 2025 Butaq Team. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
