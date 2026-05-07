import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/utils/cn'
import { DiffResult, ValidationResult } from '@/types'
import ReactDiffViewer from 'react-diff-viewer'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface ResultsPanelProps {
  result: DiffResult | ValidationResult | null
  mode: string
  className?: string
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  result,
  mode,
  className,
}) => {
  if (!result) {
    return (
      <Card className={cn('p-6 text-center text-muted-foreground', className)}>
        <p>No results to display. Run a validation or comparison to see results.</p>
      </Card>
    )
  }

  // Handle validation results
  if ('isValid' in result) {
    const validationResult = result as ValidationResult
    
    if (validationResult.isValid) {
      // Success message format
      return (
        <div className={cn('bg-green-50 border border-green-200 rounded-lg p-6 shadow-sm', className)}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-green-800">Validation Successful</h3>
              <p className="mt-1 text-sm text-green-700">Your content is valid and well-formed.</p>
            </div>
          </div>
        </div>
      )
    } else {
      // Error message format
      return (
        <Card className={cn('', className)}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Validation Results</CardTitle>
              <Badge
                variant="destructive"
                className="bg-red-100 text-red-800 hover:bg-red-100"
              >
                <XCircle className="mr-1 h-3 w-3" />
                Invalid
              </Badge>
            </div>
          </CardHeader>

          {validationResult.errors.length > 0 && (
            <CardContent>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Errors:</h4>
                {validationResult.errors.map((error, index) => (
                  <div
                    key={index}
                    className="p-3 bg-destructive/10 border border-destructive/20 rounded-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-destructive">
                        Line {error.line}, Column {error.column}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {error.type}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-destructive">{error.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )
    }
  }

  // Handle comparison results
  const diffResult = result as DiffResult
  
  if (!diffResult.hasChanges) {
    return (
      <Card className={cn('p-6 text-center', className)}>
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Differences Found</h3>
        <p className="text-muted-foreground">The content is identical.</p>
      </Card>
    )
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Comparison Results</CardTitle>
          <div className="flex space-x-2">
            <Badge className="bg-green-500 text-white hover:bg-green-500 border-0 rounded-full px-3 py-1 font-bold">
              +{diffResult.added} added
            </Badge>
            <Badge className="bg-red-500 text-white hover:bg-red-500 border-0 rounded-full px-3 py-1 font-bold">
              -{diffResult.removed} removed
            </Badge>
            <Badge className="bg-orange-500 text-white hover:bg-orange-500 border-0 rounded-full px-3 py-1 font-bold">
              {diffResult.changed} changed
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <ReactDiffViewer
            oldValue={diffResult.leftContent}
            newValue={diffResult.rightContent}
            splitView={true}
            styles={{
              diffContainer: {
                fontSize: '14px',
              },
              diffRemoved: {
                backgroundColor: '#fef2f2',
                color: '#dc2626',
              },
              diffAdded: {
                backgroundColor: '#f0fdf4',
                color: '#16a34a',
              },
              wordDiff: {
                backgroundColor: '#fed7aa',
                color: '#ea580c',
              },
            }}
          />
        </div>

        <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span>Added</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
            <span>Removed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
            <span>Changed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
