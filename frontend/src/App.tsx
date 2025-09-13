import { useState, useRef } from 'react'
import { Upload, Image as ImageIcon, Zap, Wallet, CheckCircle, AlertCircle } from 'lucide-react'

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
  }
  error?: string
  details?: string
  solutions?: string[]
  walletAddress?: string
}

function App() {
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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleInputChange = (field: keyof NFTData, value: string) => {
    setNftData(prev => ({ ...prev, [field]: value }))
  }

  const handleAttributeChange = (index: number, field: 'trait_type' | 'value', value: string) => {
    setNftData(prev => ({
      ...prev,
      attributes: prev.attributes.map((attr, i) => 
        i === index ? { ...attr, [field]: value } : attr
      )
    }))
  }

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

  const mintNFT = async () => {
    if (!selectedFile) {
      alert('Please select an image file')
      return
    }

    if (!nftData.name || !nftData.description) {
      alert('Please fill in name and description')
      return
    }

    setIsMinting(true)
    setMintResult(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('name', nftData.name)
      formData.append('description', nftData.description)
      formData.append('attributes', JSON.stringify(nftData.attributes))

      const response = await fetch('http://localhost:3000/mint-nft', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      setMintResult(result)
      
      if (result.success) {
        // Refresh wallet balance after successful mint
        checkWalletBalance()
      }
    } catch (error) {
      setMintResult({
        success: false,
        error: 'Network error',
        details: 'Failed to connect to the server'
      })
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-primary-600" />
              <h1 className="text-xl font-bold gradient-text">NFT Minting Studio</h1>
            </div>
            <div className="flex items-center space-x-4">
              {walletAddress && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Wallet className="h-4 w-4" />
                  <span className="font-mono">{walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}</span>
                  {walletBalance !== null && (
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                      {walletBalance.toFixed(4)} SOL
                    </span>
                  )}
                </div>
              )}
              <button
                onClick={checkWalletBalance}
                className="btn-secondary"
              >
                Check Balance
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ImageIcon className="h-5 w-5 mr-2 text-primary-600" />
              Upload Image
            </h2>
            
            <div className="space-y-4">
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    onClick={() => {
                      setSelectedFile(null)
                      setPreviewUrl(null)
                      if (fileInputRef.current) fileInputRef.current.value = ''
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Click to upload an image</p>
                  <p className="text-sm text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* NFT Details Section */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">NFT Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={nftData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="input-field"
                  placeholder="Enter NFT name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={nftData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="input-field h-20 resize-none"
                  placeholder="Enter NFT description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attributes
                </label>
                <div className="space-y-2">
                  {nftData.attributes.map((attr, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={attr.trait_type}
                        onChange={(e) => handleAttributeChange(index, 'trait_type', e.target.value)}
                        className="input-field flex-1"
                        placeholder="Trait type"
                      />
                      <input
                        type="text"
                        value={attr.value}
                        onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                        className="input-field flex-1"
                        placeholder="Value"
                      />
                      {nftData.attributes.length > 1 && (
                        <button
                          onClick={() => removeAttribute(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addAttribute}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    + Add Attribute
                  </button>
                </div>
              </div>

              <button
                onClick={mintNFT}
                disabled={isMinting || !selectedFile || !nftData.name || !nftData.description}
                className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isMinting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Minting NFT...
                  </div>
                ) : (
                  'Mint NFT'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Result Section */}
        {mintResult && (
          <div className="mt-8 card">
            <h2 className="text-xl font-semibold mb-4">Mint Result</h2>
            
            {mintResult.success ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">NFT Minted Successfully!</span>
                </div>
                {mintResult.data && (
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Mint Address:</span>
                      <span className="font-mono ml-2 text-gray-600">{mintResult.data.mintAddress}</span>
                    </div>
                    <div>
                      <span className="font-medium">Transaction Signature:</span>
                      <span className="font-mono ml-2 text-gray-600">{mintResult.data.signature}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-red-800 font-medium">Minting Failed</span>
                </div>
                <p className="text-red-700 mb-2">{mintResult.error}</p>
                {mintResult.details && (
                  <p className="text-sm text-red-600 mb-3">{mintResult.details}</p>
                )}
                {mintResult.solutions && (
                  <div>
                    <p className="text-sm font-medium text-red-800 mb-1">Solutions:</p>
                    <ul className="text-sm text-red-700 list-disc list-inside">
                      {mintResult.solutions.map((solution, index) => (
                        <li key={index}>{solution}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {mintResult.walletAddress && (
                  <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                    <p className="text-sm font-medium text-gray-800 mb-1">Your Wallet Address:</p>
                    <p className="font-mono text-sm text-gray-600">{mintResult.walletAddress}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App