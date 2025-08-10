import type { ColumnDef } from "@tanstack/table-core";

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

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: "Title",
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      const title = row.getValue(id) as string;
      return title.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      const author = row.getValue(id) as string;
      return author.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
];
