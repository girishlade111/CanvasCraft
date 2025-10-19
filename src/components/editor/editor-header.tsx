"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { ArrowLeft, Code, Download, Tablet, Smartphone, Monitor } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function EditorHeader() {
  return (
    <header className="flex-shrink-0 bg-background border-b h-14 flex items-center px-4 justify-between z-10">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Home
          </Link>
        </Button>
        <div className="hidden md:flex items-center gap-2">
            <Icons.logo className="h-6 w-6" />
            <span className="font-semibold">CanvasCraft</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon"><Monitor className="h-5 w-5"/></Button>
        <Button variant="ghost" size="icon"><Tablet className="h-5 w-5"/></Button>
        <Button variant="ghost" size="icon"><Smartphone className="h-5 w-5"/></Button>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Code className="h-4 w-4 mr-2"/>
                    Export
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2"/>
                    Download as ZIP
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Button>Publish</Button>
      </div>
    </header>
  );
}
