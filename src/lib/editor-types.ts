import type { CSSProperties } from 'react';

export type ComponentType = 'Text' | 'Button' | 'Section' | 'RawHTML' | 'Image' | 'Navbar' | 'Footer' | 'Form' | 'Carousel';

export type ComponentStyle = CSSProperties;

export interface EditorComponent {
  id: string;
  type: ComponentType;
  props: { [key: string]: any };
  styles: ComponentStyle;
}
