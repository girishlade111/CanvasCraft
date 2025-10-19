"use client";

import { useState, useMemo, useCallback } from "react";
import type { EditorComponent, ComponentType } from "@/lib/editor-types";
import { EditorContext } from "@/contexts/editor-context";
import EditorLayout from "@/components/editor/editor-layout";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateWebsiteTemplateFromPrompt } from "@/ai/flows/generate-website-template-from-prompt";

function WelcomePlaceholder({ onGenerateFromPrompt }: { onGenerateFromPrompt: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-center">
      <h2 className="text-2xl font-bold text-gray-700">Welcome to CanvasCraft</h2>
      <p className="mt-2 text-gray-500">Your visual web design journey starts here.</p>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <p className="text-sm text-gray-600 self-center">Start by dragging a component from the left panel</p>
        <span className="self-center text-sm text-gray-400">or</span>
        <Button onClick={onGenerateFromPrompt}>
          <Zap className="mr-2 h-4 w-4" />
          Generate with AI
        </Button>
      </div>
    </div>
  );
}

export default function EditorPage() {
  const [components, setComponents] = useState<EditorComponent[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [isAiGeneratorOpen, setIsAiGeneratorOpen] = useState(false);
  const { toast } = useToast();

  const addComponent = (type: ComponentType) => {
    const newComponent: EditorComponent = {
      id: `${type}-${Date.now()}`,
      type,
      props: {},
      styles: {
        padding: "16px",
      },
    };
    if (type === 'Text') newComponent.props.text = "Type something...";
    if (type === 'Button') newComponent.props.text = "Click me";

    setComponents(prev => [...prev, newComponent]);
  };
  
  const updateComponent = useCallback((id: string, newComponent: Partial<EditorComponent>) => {
    setComponents(prev => 
      prev.map(c => c.id === id ? { ...c, ...newComponent, styles: {...c.styles, ...newComponent.styles} } : c)
    );
  }, []);

  const selectedComponent = useMemo(() => {
    return components.find(c => c.id === selectedComponentId) || null;
  }, [selectedComponentId, components]);
  
  const generateWithAi = async (prompt: string) => {
    try {
      const result = await generateWebsiteTemplateFromPrompt({ prompt });
      const newComponent: EditorComponent = {
        id: `ai-gen-${Date.now()}`,
        type: 'RawHTML',
        props: {
          html: result.websiteStructure,
        },
        styles: {},
      };
      setComponents([newComponent]);
      toast({
        title: "AI Template Generated",
        description: "Your new template is ready on the canvas.",
      });
    } catch (error) {
      console.error("AI generation failed:", error);
      toast({
        variant: "destructive",
        title: "AI Generation Failed",
        description: "Could not generate a template. Please try again.",
      });
    }
  };


  const contextValue = {
    components,
    setComponents,
    addComponent,
    selectedComponent,
    setSelectedComponentId,
    updateComponent,
    isAiGeneratorOpen,
    setIsAiGeneratorOpen,
    generateWithAi,
  };
  
  return (
    <EditorContext.Provider value={contextValue}>
      <EditorLayout>
        {components.length === 0 ? (
          <WelcomePlaceholder onGenerateFromPrompt={() => setIsAiGeneratorOpen(true)} />
        ) : (
          <div className="p-4 space-y-4">
            {components.map((component) => (
              <div
                key={component.id}
                style={component.styles}
                onClick={() => setSelectedComponentId(component.id)}
                className={`cursor-pointer transition-all duration-200 ${selectedComponentId === component.id ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-primary/50'}`}
              >
                {component.type === 'Text' && <p>{component.props.text}</p>}
                {component.type === 'Button' && <Button>{component.props.text}</Button>}
                {component.type === 'Section' && <div className="min-h-[100px] border-dashed border-2 border-gray-300 rounded-md p-4">Drop components here</div>}
                {component.type === 'RawHTML' && <div dangerouslySetInnerHTML={{ __html: component.props.html || "" }} />}
              </div>
            ))}
          </div>
        )}
      </EditorLayout>
    </EditorContext.Provider>
  );
}
