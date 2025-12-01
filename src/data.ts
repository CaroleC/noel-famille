// src/data.ts

// Liste des adultes / participants Santa Cruz
export type Member = {
  id: string;
  name: string;
};

export type SantaPair = {
  giverId: string;    // celui qui offre
  receiverId: string; // celui qui reçoit
};

export type ChildWishlist = {
  id: string;
  name: string;
  age?: number;
  wishlistLink?: string; // lien vers liste Amazon / Drive / PDF...
  ideas?: string[];      // idées texte si pas de lien
};

export const members: Member[] = [
  { id: "carole", name: "Carole" },
  { id: "isabelle", name: "Isabelle" },
  { id: "virginie", name: "Virginie" },
  { id: "sophie", name: "Sophie" },
  { id: "nanie", name: "Nanie" },
  { id: "nassim", name: "Nassim" },
  { id: "roger", name: "Roger" },
  { id: "luc", name: "Luc" },
  { id: "jimmy", name: "Jimmy" },
];

export const santaPairs: SantaPair[] = [
  { giverId: "carole", receiverId: "virginie" },
  { giverId: "isabelle", receiverId: "sophie" },
  { giverId: "virginie", receiverId: "isabelle" },
  { giverId: "jimmy", receiverId: "carole" },
  { giverId: "nassim", receiverId: "jimmy" },
  { giverId: "luc", receiverId: "nanie" },
  { giverId: "sophie", receiverId: "roger" },
  { giverId: "nanie", receiverId: "nassim" },
];

export const childWishlists: ChildWishlist[] = [
  {
    id: "lila",
    name: "Lila",
    age: 10,
    wishlistLink: "https://exemple.com/liste-lila",
    ideas: [
      "xxxxxxxxx",
      "xxxxxxxxx",
      "xxxxxxxxx"
    ]
  },
  {
    id: "sarah",
    name: "Sarah",
    age: 5,
    wishlistLink: "https://exemple.com/liste-sarah",
    ideas: [
      "xxxxxxxxx",
      "xxxxxxxxx",
      "xxxxxxxxx"
    ]
  },
  {
    id: "rayane",
    name: "Rayane",
    age: 5,
    wishlistLink: "https://exemple.com/liste-rayane",
    ideas: [
      "xxxxxxxxx",
      "xxxxxxxxx",
      "xxxxxxxxx"
    ]
  },
  {
    id: "julien",
    name: "Julien",
    age: 5,
    wishlistLink: "https://exemple.com/liste-julien",
    ideas: [
      "xxxxxxxxx",
      "xxxxxxxxx",
      "xxxxxxxxx"
    ]
  },
  {
    id: "nicolas",
    name: "Nicolas",
    age: 5,
    wishlistLink: "https://exemple.com/liste-nicolas",
    ideas: [
      "xxxxxxxxx",
      "xxxxxxxxx",
      "xxxxxxxxx"
    ]
  },
];
