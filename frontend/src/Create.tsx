import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Wallet, CheckCircle, AlertCircle, Sparkles, Zap, Plus, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileUpload } from '@/components/ui/file-upload'
import { FooterDemo } from '@/components/demos/footer-demo'

interface NFTData {
  name: string
  description: string
  attributes: Array<{ trait_type: string; value: string }>
}

interface MintResult {
  success: boolean
  data?: {
    mintAddress: string
    signature: string
    associatedTokenAccount: string
    explorerUrl: string
  }
  error?: string
  details?: string
  solutions?: string[]
  walletAddress?: string
}

export default function Create() {
  const [nftData, setNftData] = useState<NFTData>({
    name: '',
    description: '',
    attributes: [
      { trait_type: 'Color', value: '' },
      { trait_type: 'Rarity', value: '' }
    ]
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isMinting, setIsMinting] = useState(false)
  const [mintResult, setMintResult] = useState<MintResult | null>(null)
  const [walletBalance, setWalletBalance] = useState<number | null>(null)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleFileRemove = () => {
    setSelectedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }

  const checkWalletBalance = async () => {
    try {
      const response = await fetch('http://localhost:3000/wallet/balance')
      const data = await response.json()
      
      if (data.success) {
        setWalletBalance(data.data.balance)
        setWalletAddress(data.data.address)
      }
    } catch (error) {
      console.error('Error checking wallet balance:', error)
    }
  }

  useEffect(() => {
    checkWalletBalance()
  }, [])

  const addAttribute = () => {
    setNftData(prev => ({
      ...prev,
      attributes: [...prev.attributes, { trait_type: '', value: '' }]
    }))
  }

  const removeAttribute = (index: number) => {
    setNftData(prev => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index)
    }))
  }

  const updateAttribute = (index: number, field: 'trait_type' | 'value', value: string) => {
    setNftData(prev => ({
      ...prev,
      attributes: prev.attributes.map((attr, i) => 
        i === index ? { ...attr, [field]: value } : attr
      )
    }))
  }

  const handleMint = async () => {
    if (!selectedFile || !nftData.name || !nftData.description) {
      alert('Please fill in all required fields and select a file')
      return
    }

    setIsMinting(true)
    setMintResult(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('name', nftData.name)
      formData.append('description', nftData.description)
      formData.append('attributes', JSON.stringify(nftData.attributes.filter(attr => attr.trait_type && attr.value)))

      const response = await fetch('http://localhost:3000/mint-nft', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      setMintResult(result)
    } catch (error) {
      setMintResult({
        success: false,
        error: 'Network Error',
        details: 'Failed to connect to the server. Please check your internet connection and try again.'
      })
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100 pt-20"
    >
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pb-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-800 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Studio</span>
          </Link>
          
          <motion.h1 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl font-bold text-primary-900 mb-2"
          >
            Create Your NFT
          </motion.h1>
          <motion.p 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-primary-700"
          >
            Transform your gaming moments into valuable digital assets
          </motion.p>
        </div>
      </motion.header>

      {/* Wallet Info */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 glass rounded-2xl border border-primary-200/50"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 shadow-lg">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-900">Wallet Connection</h3>
              <p className="text-sm text-primary-600">Check your balance and connect wallet</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {walletAddress && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2.5 border border-primary-200 shadow-soft"
              >
                <Wallet className="h-4 w-4 text-primary-600" />
                <span className="font-mono text-sm text-primary-800">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                </span>
                {walletBalance !== null && (
                  <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {walletBalance.toFixed(4)} SOL
                  </span>
                )}
              </motion.div>
            )}
            
            <Button
              onClick={checkWalletBalance}
              variant="secondary"
              className="shadow-soft hover:shadow-elegant"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Check Balance
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-8"
        >
          {/* Image Upload Section */}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-accent-600" />
                <span>Upload Your Artwork</span>
              </CardTitle>
              <CardDescription>
                Upload your gaming asset or achievement image to mint as an NFT
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                previewUrl={previewUrl}
                onRemove={handleFileRemove}
              />
            </CardContent>
          </Card>

          {/* NFT Details Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-accent-600" />
                <span>NFT Details</span>
              </CardTitle>
              <CardDescription>
                Add metadata and attributes to make your NFT unique
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary-900">Name *</label>
                <Input
                  placeholder="Epic Gaming Moment #1"
                  value={nftData.name}
                  onChange={(e) => setNftData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-primary-900">Description *</label>
                <Textarea
                  placeholder="Describe your gaming achievement, the story behind it, or its significance..."
                  value={nftData.description}
                  onChange={(e) => setNftData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full min-h-[100px] resize-none"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-primary-900">Attributes</label>
                  <Button
                    onClick={addAttribute}
                    variant="ghost"
                    size="sm"
                    className="text-accent-600 hover:text-accent-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {nftData.attributes.map((attr, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <Input
                        placeholder="Color"
                        value={attr.trait_type}
                        onChange={(e) => updateAttribute(index, 'trait_type', e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Value (e.g., Legendary)"
                        value={attr.value}
                        onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => removeAttribute(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleMint}
                disabled={isMinting || !selectedFile || !nftData.name || !nftData.description}
                className="w-full h-12 text-lg font-semibold shadow-elegant hover:shadow-xl"
              >
                {isMinting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Minting NFT...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Mint NFT</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Result Section */}
        {mintResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className={`border-2 ${mintResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {mintResult.success ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  )}
                  <span className={mintResult.success ? 'text-green-800' : 'text-red-800'}>
                    {mintResult.success ? 'NFT Minted Successfully!' : 'Minting Failed'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mintResult.success && mintResult.data ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/80 rounded-xl p-4 border border-green-200">
                        <p className="text-sm font-medium text-green-800 mb-1">Mint Address:</p>
                        <p className="font-mono text-sm text-green-700 break-all">{mintResult.data.mintAddress}</p>
                      </div>
                      <div className="bg-white/80 rounded-xl p-4 border border-green-200">
                        <p className="text-sm font-medium text-green-800 mb-1">Transaction:</p>
                        <a href={mintResult.data.explorerUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-green-700 break-all hover:underline">{mintResult.data.signature}</a>
                      </div>
                      <div className="bg-white/80 rounded-xl p-4 border border-green-200">
                        <p className="text-sm font-medium text-green-800 mb-1">Token Account:</p>
                        <p className="font-mono text-sm text-green-700 break-all">{mintResult.data.associatedTokenAccount}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-white/80 rounded-xl p-4 border border-red-200">
                      <p className="text-sm font-medium text-red-800 mb-2">Error: {mintResult.error}</p>
                      {mintResult.details && (
                        <p className="text-sm text-red-700 mb-3">{mintResult.details}</p>
                      )}
                      {mintResult.solutions && (
                        <div>
                          <p className="text-sm font-medium text-red-800 mb-2">Possible Solutions:</p>
                          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                            {mintResult.solutions.map((solution, index) => (
                              <li key={index}>{solution}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {mintResult.walletAddress && (
                        <div className="bg-white/80 rounded-xl p-4 border border-red-200">
                          <p className="text-sm font-medium text-red-800 mb-1">Your Wallet Address:</p>
                          <p className="font-mono text-sm text-red-700 break-all">{mintResult.walletAddress}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <FooterDemo />
    </motion.div>
  )
}