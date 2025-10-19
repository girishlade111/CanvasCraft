
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { ArrowLeft, Code, Download, Tablet, Smartphone, Monitor, LogOut, User as UserIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useAuth, useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AuthDialog from './auth-dialog';
import { useState } from 'react';


export default function EditorHeader() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
  };

  const getInitials = (name: string | null | undefined) => {
    return name?.split(' ').map(n => n[0]).join('') || 'U';
  }

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

      <div className="flex items-center gap-4">
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
        
        <div className="w-px h-6 bg-border" />

        {isUserLoading ? (
            <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.photoURL ?? undefined} />
                <AvatarFallback>{getInitials(user.displayName || user.email)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuItem className="flex flex-col items-start gap-1">
                  <p className="font-medium">{user.displayName || 'User'}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
               </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => setIsAuthDialogOpen(true)}>Login</Button>
        )}
      </div>
      <AuthDialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen} />
    </header>
  );
}
