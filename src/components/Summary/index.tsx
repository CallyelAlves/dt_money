import { ReactNode, useContext } from "react";
import entradasIcon from "../../assets/entradas.svg";
import saidasIcon from "../../assets/saídas.svg";
import totalIcon from "../../assets/total.svg";
import { TransactionsContext } from "../../TransactionsContext";

import { Container } from "./styles";

function editValues(parms: ReactNode) {
  return(
    <>
      {new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(Number(parms))}
    </>
  )
  
}

export function Summary() {

  const transactions = useContext(TransactionsContext);
  console.log(transactions);

  let deposit = 0;
  let withdraw = 0;
  let arrayDeposit = [];
  let arrayWithdraw = [];

  const expenditure = transactions.map(
    transaction => transaction.type === 'withdraw' && (withdraw += transaction.value))
  for (let i of expenditure){
    if (i !== false){
      arrayWithdraw.push(i)
    }
  }
  const encome = transactions.map(
    transaction => transaction.type === 'deposit' && (deposit += transaction.value))
  for (let i of encome){
    if (i !== false){
      arrayDeposit.push(i)
    }
  }
  
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={entradasIcon} alt="Entradas" />
        </header>
        <strong>{editValues(arrayDeposit)}</strong>
      </div>

      <div>
        <header>
          <p>Saidas</p>
          <img src={saidasIcon} alt="Saídas" />
        </header>
        <strong>- {editValues(arrayWithdraw)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalIcon} alt="Total" />
        </header>
        <strong>{editValues(deposit - withdraw)}</strong>
      </div>
    </Container>
  );
}
