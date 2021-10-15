import { useContext } from "react";
import entradasIcon from "../../assets/entradas.svg";
import saidasIcon from "../../assets/saídas.svg";
import totalIcon from "../../assets/total.svg";
import { TransactionsContext } from "../../TransactionsContext";

import { Container } from "./styles";

function editValues(parms: Number) {
  return (
    <>
      {new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(parms))}
    </>
  );
}

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  /* const deposit = transactions.reduce((acc, transaction) => {
    if (transaction.type === "deposit") return acc + transaction.value;

    return acc;
  }, 0);

  const withdraw = transactions.reduce((acc, transaction) => {
    if (transaction.type === "withdraw") {
      return acc + transaction.value;
    }

    return acc;
  }, 0); */

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposit += transaction.value;
        acc.total += transaction.value;
      } else {
        acc.withdraw += transaction.value;
        acc.total -= transaction.value;
      }

      return acc;
    },
    {
      deposit: 0,
      withdraw: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={entradasIcon} alt="Entradas" />
        </header>
        <strong>{editValues(summary.deposit)}</strong>
      </div>

      <div>
        <header>
          <p>Saidas</p>
          <img src={saidasIcon} alt="Saídas" />
        </header>
        <strong>- {editValues(summary.withdraw)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalIcon} alt="Total" />
        </header>
        <strong>{editValues(summary.total)}</strong>
      </div>
    </Container>
  );
}
