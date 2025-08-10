export type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: "available" | "borrowed" | "reserved";
  category: string;
  published_year: number;
  location: string;
  created_at: string;
};
