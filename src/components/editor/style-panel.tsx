"use client";

import { useContext } from 'react';
import { EditorContext } from '@/contexts/editor-context';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


function SpacingControl({
  value,
  onChange,
}: {
  value: string | number | undefined;
  onChange: (value: string) => void;
}) {
    return (
        <div className="grid grid-cols-4 gap-2">
            {['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].map(side => (
                 <Input key={side} type="text" placeholder="-" className="w-full"
                    // In a real app, you'd handle each side separately
                    onChange={(e) => onChange(e.target.value)}
                 />
            ))}
        </div>
    )
}

export default function StylePanel() {
  const context = useContext(EditorContext);

  if (!context) return null;

  const { selectedComponent, updateComponent } = context;

  if (!selectedComponent) {
    return (
      <div className="p-4 text-sm text-muted-foreground text-center h-full flex items-center justify-center">
        <p>Select a component on the canvas to edit its styles.</p>
      </div>
    );
  }

  const handleStyleChange = (property: string, value: string) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, {
        styles: {
          ...selectedComponent.styles,
          [property]: value,
        },
      });
    }
  };

  const handlePropChange = (property: string, value: string) => {
    if (selectedComponent) {
        updateComponent(selectedComponent.id, {
            props: {
                ...selectedComponent.props,
                [property]: value
            }
        })
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <Label>Component: {selectedComponent.type}</Label>
        <p className="text-xs text-muted-foreground">{selectedComponent.id}</p>
      </div>
      
      <Accordion type="multiple" defaultValue={['content', 'spacing', 'typography', 'background']} className="w-full">
        { (selectedComponent.type === 'Text' || selectedComponent.type === 'Button') && (
            <AccordionItem value="content">
                <AccordionTrigger>Content</AccordionTrigger>
                <AccordionContent className="px-1 space-y-2">
                    <Label>Text</Label>
                    <Input value={selectedComponent.props.text || ""} onChange={(e) => handlePropChange('text', e.target.value)} />
                </AccordionContent>
            </AccordionItem>
        )}

        <AccordionItem value="spacing">
          <AccordionTrigger>Spacing</AccordionTrigger>
          <AccordionContent className="px-1 space-y-2">
            <Label>Padding</Label>
            <Input type="text" value={selectedComponent.styles.padding?.toString() || ""} onChange={e => handleStyleChange('padding', e.target.value)} placeholder="16px" />
          </AccordionContent>
        </AccordionItem>

        { (selectedComponent.type === 'Text' || selectedComponent.type === 'Button') && (
            <AccordionItem value="typography">
                <AccordionTrigger>Typography</AccordionTrigger>
                <AccordionContent className="px-1 space-y-4">
                    <div className='space-y-2'>
                        <Label>Font Size</Label>
                        <Input type="text" value={selectedComponent.styles.fontSize?.toString() || ""} onChange={e => handleStyleChange('fontSize', e.target.value)} placeholder="16px" />
                    </div>
                     <div className='space-y-2'>
                        <Label>Color</Label>
                        <Input type="color" value={selectedComponent.styles.color?.toString() || "#000000"} onChange={e => handleStyleChange('color', e.target.value)} className="p-1 h-10"/>
                    </div>
                </AccordionContent>
            </AccordionItem>
        )}

        <AccordionItem value="background">
          <AccordionTrigger>Background</AccordionTrigger>
          <AccordionContent className="px-1 space-y-2">
             <Label>Color</Label>
             <Input type="color" value={selectedComponent.styles.backgroundColor?.toString() || "#ffffff"} onChange={e => handleStyleChange('backgroundColor', e.target.value)} className="p-1 h-10" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
