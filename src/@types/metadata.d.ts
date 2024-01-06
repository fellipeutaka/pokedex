import { Metadata } from "next";

export type GenerateMetadata<PageParams extends object> = (
  params: PageParams
) => Metadata | Promise<Metadata>;
