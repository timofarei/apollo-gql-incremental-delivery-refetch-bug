import { gql, useQuery } from "@apollo/client";
import "./App.css";
import BookForm from "./BookForm";
import BookList from "./BookList";

const QUERY = gql`
  query Books {
    books {
      id
      title
      author
      ... @defer {
        deferredInfo {
          id
          title
        }
      }
    }
  }
`;

function App() {
  const { data, loading, refetch } = useQuery(QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <BookList books={data.books} onDelete={() => refetch()} />
      <BookForm onCompleted={() => refetch()} />
    </>
  );
}

export default App;
