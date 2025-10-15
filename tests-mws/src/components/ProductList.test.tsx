import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../../test/msw/server";
import ProductList from "./ProductList";

describe("ProductList HTTP simulé", () => {
    test("affiche les produits après chargement (succès)", async () => {
        render(<ProductList />);

        // État de chargement
        expect(screen.getByText(/chargement/i)).toBeInTheDocument();

        // Après chargement
        const clavier = await screen.findByText(/clavier/i);
        const souris = screen.getByText(/souris/i);

        expect(clavier).toBeInTheDocument();
        expect(souris).toBeInTheDocument();
    });

    test("affiche un message d'erreur si le serveur renvoie une erreur", async () => {
       
        server.use(
            http.get("https://api.example.com/products", () => {
                return HttpResponse.json({ message: "Erreur" }, { status: 500 });
            })
        );

        render(<ProductList />);
        const alert = await screen.findByRole("alert");
        expect(alert).toHaveTextContent(/Impossible/i);
    });

    test("affiche 'Aucun produit' si la liste est vide", async () => {
        server.use(
            http.get("https://api.example.com/products", () => {
                return HttpResponse.json([], { status: 200 });
            })
        );

        render(<ProductList />);

        const vide = await screen.findByText(/aucun produit/i);
        expect(vide).toBeInTheDocument();
    });
});
