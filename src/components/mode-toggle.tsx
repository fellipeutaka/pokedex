"use client";

import { useTheme } from "next-themes";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import { DropdownMenu } from "./ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.Sun className="size-4 scale-100 dark:scale-0" />
          <Icons.Moon className="absolute size-4 scale-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item onClick={() => setTheme("light")}>
          <Icons.Sun className="mr-2 size-4" />
          <span>Light</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme("dark")}>
          <Icons.Moon className="mr-2 size-4" />
          <span>Dark</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme("system")}>
          <Icons.Laptop className="mr-2 size-4" />
          <span>System</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
