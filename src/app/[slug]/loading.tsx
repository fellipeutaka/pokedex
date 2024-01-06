import { Icons } from "~/components/icons";

export default function Loading() {
  return (
    <div className="grid place-content-center">
      <Icons.Pokeball className="h-8 w-8 animate-spin" />
    </div>
  );
}
