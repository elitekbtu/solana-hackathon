import * as React from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
  previewUrl: string | null
  onRemove: () => void
  className?: string
}

export function FileUpload({ 
  onFileSelect, 
  selectedFile, 
  previewUrl, 
  onRemove, 
  className 
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      onFileSelect(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={cn("w-full", className)}>
      <AnimatePresence mode="wait">
        {previewUrl ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onRemove}
                  className="bg-white/90 backdrop-blur-sm text-black rounded-full p-3 hover:bg-white transition-colors shadow-lg"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
            {selectedFile && (
              <div className="mt-4 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4" />
                  <span className="font-medium">{selectedFile.name}</span>
                  <span className="text-gray-400">
                    ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 group hover:shadow-lg",
              isDragOver 
                ? "border-black bg-gray-50 shadow-lg" 
                : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
            )}
          >
            <motion.div
              animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className={cn(
                "rounded-full p-4 transition-all duration-300",
                isDragOver ? "bg-black text-white" : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
              )}>
                <Upload className="h-8 w-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-black">
                  {isDragOver ? "Drop your image here" : "Upload your NFT image"}
                </h3>
                <p className="text-gray-600">
                  Drag and drop or click to select • PNG, JPG, GIF up to 10MB
                </p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                Choose File
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
