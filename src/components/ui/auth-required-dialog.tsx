"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AuthRequiredDialogProps {
  open: boolean;
  onClose: () => void;
  message?: string;
  redirectPath?: string;
}

export function AuthRequiredDialog({
  open,
  onClose,
  message = "Please sign in to continue.",
  redirectPath,
}: AuthRequiredDialogProps) {
  const router = useRouter();

  function handleSignIn() {
    onClose();
    const loginPath = redirectPath
      ? `/login?redirect=${encodeURIComponent(redirectPath)}`
      : "/login";
    router.push(loginPath);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-headline text-xl">
            Sign In Required
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSignIn}
            className="flex-1 bg-black text-white hover:bg-zinc-800 rounded-full"
          >
            Sign In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
