import React from 'react';
import ReactDOM from 'react-dom';
import { App } from "./App";
import { createServer, Model } from "miragejs";
import { ModalProvider } from "./ModalContext";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance de website",
          type: "deposit",
          value: 6000,
          category: "Dev",
          createdAt: new Date("2021-01-13 09:00:00"),
        },
        {
          id: 2,
          title: "Aluguel",
          type: "withdraw",
          value: 1100,
          category: "Casa",
          createdAt: new Date("2021-01-25 09:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

