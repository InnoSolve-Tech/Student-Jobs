// components/ui/dropdown-menu.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const DropdownMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative inline-block", className)}
    {...props}
  />
));
DropdownMenu.displayName = "DropdownMenu";

interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ asChild = false, children, className, ...props }, ref) => {
  const Component = asChild ? React.Fragment : "button";

  return (
    <Component
      {...(asChild ? {} : { ref })}
      className={cn(
        "px-4 py-2 bg-gray-200 rounded-full focus:outline-none focus:ring",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" }
>(({ className, align = "start", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none",
      align === "end" ? "right-0" : "left-0",
      className,
    )}
    role="menu"
    {...props}
  />
));
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
      className,
    )}
    role="menuitem"
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};
