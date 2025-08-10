import { BookController } from "$lib/controllers/book.controller";

export async function load() {
  const bookController = new BookController();
  
  try {
    const result = await bookController.getAllBooks();
    
    if (result.success && result.data) {
      return {
        books: result.data
      };
    } else {
      console.error("Failed to load books:", result.error);
      return {
        books: []
      };
    }
  } catch (error) {
    console.error("Error in books page load:", error);
    return {
      books: []
    };
  }
}
