export type BookApiResponse = {
  data: Book[];
};

export type Book = { id: string; title: string; author: string; year: number };

export type Century = { century: string; count: number };
