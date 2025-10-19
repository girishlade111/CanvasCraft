"use client";

import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Type, Minus, Square, Image as ImageIcon } from 'lucide-react';
import { EditorContext } from '@/contexts/editor-context';
import type { ComponentType } from '@/lib/editor-types';

const components: { name: ComponentType; icon: React.ReactNode }[] = [
  { name: 'Text', icon: <Type className="h-5 w-5" /> },
  { name: 'Button', icon: <Square className="h-5 w-5" /> },
  { name: 'Section', icon: <Minus className="h-5 w-5" /> },
  // Future components
  // { name: 'Image', icon: <ImageIcon className="h-5 w-5" /> },
];

export default function ComponentLibrary() {
  const context = useContext(EditorContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { addComponent } = context;

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, type: ComponentType) => {
    e.dataTransfer.setData('componentType', type);
  };

  return (
    <div className="p-4 space-y-2">
      {components.map((component) => (
        <Button
          key={component.name}
          variant="outline"
          className="w-full justify-start gap-2 cursor-grab"
          draggable
          onDragStart={(e) => handleDragStart(e, component.name)}
          onClick={() => addComponent(component.name)}
        >
          {component.icon}
          <span>{component.name}</span>
        </Button>
      ))}
    </div>
  );
}
