"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import type { EditorComponent, ComponentType } from "@/lib/editor-types";
import { EditorContext } from "@/contexts/editor-context";
import EditorLayout from "@/components/editor/editor-layout";
import { Button } from "@/components/ui/button";
import { Zap, Icons } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateWebsiteTemplateFromPrompt } from "@/ai/flows/generate-website-template-from-prompt";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EditorCarousel from "@/components/editor/editor-carousel";

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

const defaultProps = {
  Text: { text: "Type something..." },
  Button: { text: "Click me" },
  Image: { src: "https://picsum.photos/seed/1/600/400" },
  Navbar: {},
  Footer: {},
  Section: {},
  RawHTML: { html: "<div>Your HTML here</div>" },
  Form: {},
  Carousel: {
    images: [
      { src: "https://picsum.photos/seed/carousel1/600/400", alt: "carousel image 1" },
      { src: "https://picsum.photos/seed/carousel2/600/400", alt: "carousel image 2" },
      { src: "https://picsum.photos/seed/carousel3/600/400", alt: "carousel image 3" },
    ]
  },
};


export default function EditorPage() {
  const [components, setComponents] = useState<EditorComponent[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [isAiGeneratorOpen, setIsAiGeneratorOpen] = useState(false);
  const { toast } = useToast();

  const addComponent = (type: ComponentType) => {
    const newComponent: EditorComponent = {
      id: `${type}-${Date.now()}`,
      type,
      props: defaultProps[type] || {},
      styles: {
        padding: "16px",
      },
    };
    setComponents(prev => [...prev, newComponent]);
  };
  
  const updateComponent = useCallback((id: string, newComponent: Partial<EditorComponent>) => {
    setComponents(prev => 
      prev.map(c => c.id === id ? { ...c, ...newComponent, props: {...c.props, ...newComponent.props}, styles: {...c.styles, ...newComponent.styles} } : c)
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

  const renderComponent = (component: EditorComponent) => {
    switch (component.type) {
      case 'Text':
        return <p>{component.props.text}</p>;
      case 'Button':
        return <Button>{component.props.text}</Button>;
      case 'Section':
        return <div className="min-h-[100px] border-dashed border-2 border-gray-300 rounded-md p-4">Drop components here</div>;
      case 'RawHTML':
        return <div dangerouslySetInnerHTML={{ __html: component.props.html || "" }} />;
      case 'Image':
        return <Image src={component.props.src} alt="placeholder" width={600} height={400} className="w-full h-auto" />;
      case 'Navbar':
        return (
          <nav className="flex items-center justify-between p-4 bg-background border-b">
            <div className="flex items-center gap-2">
              <p className="font-bold">My Site</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm">Home</a>
              <a href="#" className="text-sm">About</a>
              <a href="#" className="text-sm">Contact</a>
            </div>
          </nav>
        );
      case 'Footer':
        return (
          <footer className="p-4 bg-background border-t text-center">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} My Site. All rights reserved.</p>
          </footer>
        );
      case 'Form':
        return (
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        );
      case 'Carousel':
        return <EditorCarousel images={component.props.images} />;
      default:
        return null;
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
                {renderComponent(component)}
              </div>
            ))}
          </div>
        )}
      </EditorLayout>
    </EditorContext.Provider>
  );
}
