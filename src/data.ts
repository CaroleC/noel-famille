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
  { id: "nani", name: "Nani" },
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
  { giverId: "luc", receiverId: "roger" },
  { giverId: "sophie", receiverId: "nani" },
  { giverId: "", receiverId: "nassim" },
];

export const childWishlists: ChildWishlist[] = [
  {
    id: "emma",
    name: "Emma",
    age: 8,
    wishlistLink: "https://exemple.com/liste-emma",
    ideas: [
      "Lego Friends",
      "Livre de cheval",
      "Jeu de société pour 2 joueurs"
    ]
  },
  {
    id: "leo",
    name: "Léo",
    age: 5,
    wishlistLink: "https://exemple.com/liste-leo",
    ideas: [
      "Voitures Hot Wheels",
      "Puzzle 50 pièces",
      "Pyjama dinosaure"
    ]
  },
  // ... à compléter
];
