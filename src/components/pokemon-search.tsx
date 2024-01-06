import { Icons } from "./icons";
import { Label } from "./ui/label";
import { TextField } from "./ui/textfield";

type PokemonSearchProps = {
  query: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function PokemonSearch({ query, onChange }: PokemonSearchProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="search">Search Pokémon</Label>
      <TextField.Root>
        <TextField.Input
          id="search"
          name="search"
          value={query}
          onChange={onChange}
          placeholder="Enter Pokémon name or number"
          autoComplete="off"
        />
        <TextField.Slot>
          <Icons.Search className="h-4 w-4 text-foreground" />
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
}
