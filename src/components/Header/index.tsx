//import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        {/* <img src={logoImg} alt="dt money" /> */}
        <h1 style={{ color: "#fff", fontWeight: 700, fontSize: "2rem" }}>
          Caju Finances
        </h1>
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
}
