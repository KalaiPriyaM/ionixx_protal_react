import React, { useRef, forwardRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/utils/cn'
import { Copy, Download, Upload } from 'lucide-react'

interface EditorPaneProps {
  label: string
  content: string
  onChange: (content: string) => void
  onCopy: () => void
  onDownload: () => void
  onFileUpload: (file: File) => void
  placeholder: string
  maxFileSize?: number
  color: 'primary' | 'blue'
  showBorder?: boolean
  className?: string
}

export const EditorPane = forwardRef<HTMLTextAreaElement, EditorPaneProps>(
  ({
    label,
    content,
    onChange,
    onCopy,
    onDownload,
    onFileUpload,
    placeholder,
    maxFileSize,
    color,
    showBorder = false,
    className,
  }, ref) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      if (maxFileSize && file.size > maxFileSize) {
        alert(`File size exceeds ${maxFileSize / 1024 / 1024}MB limit`)
        return
      }

      onFileUpload(file)

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }

    const handlePaste = (event: React.ClipboardEvent) => {
      const items = event.clipboardData.items
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.kind === 'file') {
          const file = item.getAsFile()
          if (file && maxFileSize && file.size > maxFileSize) {
            alert(`File size exceeds ${maxFileSize / 1024 / 1024}MB limit`)
            event.preventDefault()
            return
          }
        }
      }
    }

    const colorClasses = {
      primary: 'border-l-4 border-l-primary-500',
      blue: 'border-l-4 border-l-blue-500',
    }

    const dotColor = {
      primary: 'bg-primary-500',
      blue: 'bg-blue-500',
    }

    return (
      <div className={cn(
        'space-y-2',
        showBorder && 'border border-border rounded-lg p-4',
        className
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={cn('w-2 h-2 rounded-full mr-2', dotColor[color])}></div>
            <Label className="text-sm font-medium">{label}</Label>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCopy}
              className="h-8 px-2"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDownload}
              className="h-8 px-2"
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-8 px-2"
            >
              <Upload className="h-3 w-3 mr-1" />
              Upload
            </Button>
          </div>
        </div>
        
        <div className={cn('relative', colorClasses[color])}>
          <textarea
            ref={ref}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            onPaste={handlePaste}
            className={cn(
              'w-full min-h-[300px] px-3 py-2',
              showBorder ? 'border-0 rounded-md' : 'border border-input rounded-lg',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
              'placeholder:text-muted-foreground text-sm font-mono resize-none',
              'bg-background text-foreground'
            )}
          />
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.xml,.txt,.md"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    )
  }
)

EditorPane.displayName = 'EditorPane'
