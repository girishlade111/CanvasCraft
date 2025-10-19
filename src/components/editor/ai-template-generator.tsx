"use client"

import { useContext, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { EditorContext } from "@/contexts/editor-context"
import { Loader2 } from "lucide-react"

export default function AiTemplateGenerator() {
  const context = useContext(EditorContext)
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  if (!context) return null

  const { isAiGeneratorOpen, setIsAiGeneratorOpen, generateWithAi } = context

  const handleSubmit = async () => {
    if (!prompt) return
    setIsLoading(true)
    await generateWithAi(prompt)
    setIsLoading(false)
    setIsAiGeneratorOpen(false)
    setPrompt("")
  }

  return (
    <Dialog open={isAiGeneratorOpen} onOpenChange={setIsAiGeneratorOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate with AI</DialogTitle>
          <DialogDescription>
            Describe the website you want to build. The AI will generate a starting template for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            id="prompt"
            placeholder="e.g., A modern landing page for a SaaS company..."
            className="col-span-3"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading || !prompt}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
