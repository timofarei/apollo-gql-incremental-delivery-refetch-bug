import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const MUTATION = gql`
  mutation AddBook($book: BookInput!) {
    addBook(book: $book) {
      id
      title
      author
    }
  }
`;

interface Props {
  onCompleted: () => void;
}

const BookForm = ({ onCompleted }: Props) => {
  const [addBook] = useMutation(MUTATION);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook({ variables: { book: { title, author } } });
      setTitle("");
      setAuthor("");
      onCompleted();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
