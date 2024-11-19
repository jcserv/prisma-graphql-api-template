import { prisma } from "@/db";

export interface Context {
    prisma: typeof prisma;
}

export async function createContext(): Promise<Context> {
  return {
    prisma,
  };
}