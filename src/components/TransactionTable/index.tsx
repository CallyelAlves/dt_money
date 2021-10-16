import { useContext } from "react";
import { Container } from "./styles";
import { TransactionsContext } from "../../TransactionsContext";
import removeImg from "../../assets/remove.svg";
import editImg from "../../assets/edit.svg";
import { ModalContext } from "../../ModalContext";

export function TransactionTable() {
  const { transactions, setTransactions } = useContext(TransactionsContext);

  const { setIsNewTransactionModalOpen, setIsEditTransaction, setId } =
    useContext(ModalContext);

  function handleRemoveTransaction(id: Number) {
    const filterTransaction = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(filterTransaction);
  }

  function handleEditTransaction(idTransaction: number) {
    setIsNewTransactionModalOpen(true);
    setIsEditTransaction(true);
    setId(idTransaction);
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {transaction.type === "withdraw" && "- "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(transaction.value)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(transaction.createdAt)
                )}
              </td>
              <td>
                <button onClick={() => handleEditTransaction(transaction.id)}>
                  <img src={editImg} alt="Editar" />
                </button>
                <button onClick={() => handleRemoveTransaction(transaction.id)}>
                  <img src={removeImg} alt="Remover" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
