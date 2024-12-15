import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function SearchBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        onClick={() => setOpen(true)}
        className="glass flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 transition-all duration-200"
      >
        <Search className="w-5 h-5 text-[#9b87f5]" />
        <Input
          type="text"
          placeholder="Rechercher des cours, résumés, ou questions..."
          className="bg-transparent border-none focus-visible:ring-0 placeholder:text-[#9b87f5]/50"
          readOnly
        />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Que recherchez-vous ?" />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Cours PDF">
              <CommandItem>Mathématiques - Seconde</CommandItem>
              <CommandItem>Physique - Première</CommandItem>
              <CommandItem>Informatique - Terminale</CommandItem>
            </CommandGroup>
            <CommandGroup heading="Résumés">
              <CommandItem>Résumé Mathématiques - Seconde</CommandItem>
              <CommandItem>Résumé Physique - Première</CommandItem>
              <CommandItem>Résumé Informatique - Terminale</CommandItem>
            </CommandGroup>
            <CommandGroup heading="Questions">
              <CommandItem>Comment résoudre une équation du second degré ?</CommandItem>
              <CommandItem>Qu'est-ce que la force gravitationnelle ?</CommandItem>
              <CommandItem>Comment fonctionne une boucle while ?</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}