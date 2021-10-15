import { useContext } from "react";
import { Container } from "./styles";
import { TransactionsContext } from "../../TransactionsContext";
import removeImg from "../../assets/remove.svg";
import editImg from "../../assets/edit.svg";
import { ModalContext } from "../../ModalContext";
//import { NewTransactionModal } from "../NewTransactionModal";

export function TransactionTable() {
  const { transactions, setTransactions } = useContext(TransactionsContext);

  const { setIsNewTransactionModalOpen } = useContext(ModalContext);

  //const { createTransaction } = useContext(TransactionsContext);

  function handleRemoveTransaction(id: Number) {
    const filterTransaction = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(filterTransaction);
  }

  function handleEditTransaction(id: Number) {
    setIsNewTransactionModalOpen(true);
    const editTransaction = transactions.map((transaction) =>
      transaction.id === id
        ? {
            ...transaction,
            title: "Teste",
          }
        : transaction
    );
    // eslint-disable-next-line no-lone-blocks
    {
      /* <NewTransactionModal
      isOpen={isNewTransactionModalOpen}
      onRequestClose={() => setIsNewTransactionModalOpen}
    />; */
    }

    setTransactions(editTransaction);
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
