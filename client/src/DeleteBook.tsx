import { gql, useMutation } from "@apollo/client";

interface Props {
  id: number;
  onDelete: () => void;
}

const MUTATION = gql`
  mutation DeleteBook($id: Int!) {
    deleteBook(book: { id: $id })
  }
`;

const DeleteBook = ({ id, onDelete }: Props) => {
  const [deleteBook] = useMutation(MUTATION);

  const handleClick = async () => {
    await deleteBook({ variables: { id } });
    onDelete();
  };
  return <button onClick={handleClick}>Delete</button>;
};

export default DeleteBook;
