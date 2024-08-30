"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

// Interfejs za props koji se prosleđuju komponenti MultiSelect
interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[]; // Lista kolekcija koje se mogu izabrati
  value: string[]; // Lista izabranih ID-eva kolekcija

  //Funkcije za odabiranje i uklanjanje kolekcija
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

// Komponenta za više selekcija
const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState(""); // Drži trenutnu vrednost input polja
  const [open, setOpen] = useState(false); // Da li je dropdown otvoren

  // Lista izabranih kolekcija na osnovu ID-eva
  let selected: CollectionType[]; 

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }

  // Lista kolekcija koje nisu izabrane
  const selectables = collections.filter((collection) => !selected.includes(collection)); 

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
          {/* Prikaz izabranih kolekcija kao badge-ova */}
        {selected.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <button type="button" className="ml-1 hover:text-red-1" onClick={() => onRemove(collection._id)}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
         {/* Input polje za pretragu */}
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)} // Zatvori dropdown kada izgubi fokus
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="relative mt-2">
        {/* Prikaz dropdown menija za pretragu ako je otvoren */}
        {open && (
          <CommandGroup className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md">
            {selectables.map((collection) => (
              <CommandItem
                key={collection._id}
                onMouseDown={(e) => e.preventDefault()} // Sprečava automatsko fokusiranje na element
                onSelect={() => {
                  onChange(collection._id); // Dodaje izabranu kolekciju
                  setInputValue(""); // Očisti input polje
                }}
                className="hover:bg-grey-2 cursor-pointer"
              >
                {collection.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;