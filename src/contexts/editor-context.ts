import { createContext } from 'react';
import type { EditorComponent, ComponentType } from '@/lib/editor-types';

interface EditorContextType {
  components: EditorComponent[];
  setComponents: React.Dispatch<React.SetStateAction<EditorComponent[]>>;
  addComponent: (type: ComponentType) => void;
  selectedComponent: EditorComponent | null;
  setSelectedComponentId: (id: string | null) => void;
  updateComponent: (id: string, newComponent: Partial<EditorComponent>) => void;
  isAiGeneratorOpen: boolean;
  setIsAiGeneratorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  generateWithAi: (prompt: string) => Promise<void>;
}

export const EditorContext = createContext<EditorContextType | null>(null);
