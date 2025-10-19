"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeft, PanelRight, X } from 'lucide-react';

import EditorHeader from './editor-header';
import ComponentLibrary from './component-library';
import StylePanel from './style-panel';
import { Button } from '@/components/ui/button';
import AiTemplateGenerator from './ai-template-generator';

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  const panelVariants = {
    hidden: { width: 0, opacity: 0, transition: { duration: 0.3 } },
    visible: { width: '280px', opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="h-screen w-screen bg-muted flex flex-col overflow-hidden">
      <EditorHeader />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel Toggle */}
        {!leftPanelOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-background"
            onClick={() => setLeftPanelOpen(true)}
          >
            <PanelRight className="h-4 w-4" />
          </Button>
        )}

        {/* Left Panel */}
        <AnimatePresence>
          {leftPanelOpen && (
            <motion.div
              initial="visible"
              animate="visible"
              exit="hidden"
              variants={panelVariants}
              className="bg-background border-r flex-shrink-0"
            >
              <div className="flex items-center justify-between p-2 border-b">
                 <h2 className="font-semibold text-lg px-2">Components</h2>
                 <Button variant="ghost" size="icon" onClick={() => setLeftPanelOpen(false)}>
                    <PanelLeft className="h-4 w-4" />
                </Button>
              </div>
              <ComponentLibrary />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Canvas */}
        <main className="flex-1 flex flex-col bg-background shadow-inner-lg overflow-auto">
            <div className="flex-1 w-full h-full">
                {children}
            </div>
        </main>

        {/* Right Panel Toggle */}
        {!rightPanelOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-background"
            onClick={() => setRightPanelOpen(true)}
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Right Panel */}
        <AnimatePresence>
          {rightPanelOpen && (
            <motion.div
              initial="visible"
              animate="visible"
              exit="hidden"
              variants={panelVariants}
              className="bg-background border-l flex-shrink-0"
            >
              <div className="flex items-center justify-between p-2 border-b">
                 <h2 className="font-semibold text-lg px-2">Styles</h2>
                 <Button variant="ghost" size="icon" onClick={() => setRightPanelOpen(false)}>
                    <PanelRight className="h-4 w-4" />
                </Button>
              </div>
              <StylePanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AiTemplateGenerator />
    </div>
  );
}
