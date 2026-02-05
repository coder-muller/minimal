import { Button } from "@/components/ui/button";
import { ArrowRightIcon, TreePalmIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <TreePalmIcon className="size-10 text-primary" />
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">
            minimal
          </h1>
          <p className="text-sm text-muted-foreground">
            uma maneira minimalista de gerenciar seus livros.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">
              entrar
            </Link>
          </Button>
          <Button variant="default" size="sm" className="group" asChild>
            <Link href="/register">
              criar conta
              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
