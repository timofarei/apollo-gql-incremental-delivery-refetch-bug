import { Fragment } from "react/jsx-runtime";
import DeleteBook from "./DeleteBook";

interface Book {
  id: number;
  title: string;
  author: string;
  deferredInfo?: DeferredInfo;
}

interface DeferredInfo {
  id: number;
  title: string;
}

interface Props {
  books: Book[];
  onDelete: () => void;
}

const BookList = ({ books, onDelete }: Props) => {
  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map((book: Book) => (
          <Fragment key={book.id}>
            <li>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              {book.deferredInfo && (
                <p>
                  Deferred Info: {book.deferredInfo.id} -{" "}
                  {book.deferredInfo.title}
                </p>
              )}
            </li>
            <DeleteBook id={book.id} onDelete={onDelete} />
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
