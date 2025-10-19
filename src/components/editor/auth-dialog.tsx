
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/firebase";
import { initiateEmailSignIn, initiateEmailSignUp } from "@/firebase/non-blocking-login";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Auth, FirebaseError } from "firebase/auth";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getFriendlyErrorMessage = (error: FirebaseError) => {
    switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
            return 'Invalid email or password. Please try again.';
        case 'auth/email-already-in-use':
            return 'An account with this email already exists. Please log in.';
        case 'auth/weak-password':
            return 'The password is too weak. Please use at least 6 characters.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        default:
            return 'An unexpected error occurred. Please try again.';
    }
}


export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const auth = useAuth() as Auth; // Make sure auth is always available when this component is used
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleAuthAction = async (action: (auth: Auth, email: string, password: string) => Promise<any> | void, email: string, pass: string) => {
      if (!email || !pass) {
          toast({ variant: "destructive", title: "Missing fields", description: "Please enter both email and password."});
          return;
      }
      setIsLoading(true);
      try {
        await action(auth, email, pass);
        // The onAuthStateChanged listener in the provider will handle the UI update
        // We can close the dialog optimistically here.
        onOpenChange(false);
      } catch (error) {
          if (error instanceof FirebaseError) {
              toast({ variant: "destructive", title: "Authentication Failed", description: getFriendlyErrorMessage(error)});
          } else {
              toast({ variant: "destructive", title: "Error", description: "An unknown error occurred."});
          }
      } finally {
          setIsLoading(false);
      }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuthAction(initiateEmailSignIn, loginEmail, loginPassword);
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuthAction(initiateEmailSignUp, signupEmail, signupPassword);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to CanvasCraft</DialogTitle>
          <DialogDescription>
            Sign in or create an account to save and manage your projects.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" placeholder="m@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
             <form onSubmit={handleSignup} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="m@example.com" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
