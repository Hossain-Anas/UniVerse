import { supabase } from "$lib/supabase";
import type { Book } from "$lib/types/book";

export class BookRepository {
  async getAllBooks(): Promise<Book[]> {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("title");

    if (error) {
      throw new Error(`Failed to fetch books: ${error.message}`);
    }

    return data || [];
  }

  async getBookById(id: string): Promise<Book | null> {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // No rows returned
      }
      throw new Error(`Failed to fetch book: ${error.message}`);
    }

    return data;
  }

  async searchBooks(query: string): Promise<Book[]> {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .or(`title.ilike.%${query}%,author.ilike.%${query}%`)
      .order("title");

    if (error) {
      throw new Error(`Failed to search books: ${error.message}`);
    }

    return data || [];
  }

  async getBooksByStatus(status: Book["status"]): Promise<Book[]> {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("status", status)
      .order("title");

    if (error) {
      throw new Error(`Failed to fetch books by status: ${error.message}`);
    }

    return data || [];
  }
}
