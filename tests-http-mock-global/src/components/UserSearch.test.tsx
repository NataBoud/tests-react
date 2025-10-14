import { describe, expect, it, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { UserSearch } from "./UserSearch";


beforeEach(() => {
    // Réinitialiser le mock fetch entre chaque test !!!
    vi.restoreAllMocks();

    global.fetch = vi.fn(async (input: RequestInfo | URL): Promise<Response> => {
        const url = input.toString();

        if (url.toLowerCase().includes("toto")) {
            // délai pour voir "Chargement..."
            await new Promise((r) => setTimeout(r, 150));
            return {
                ok: true,
                json: async () => ({ id: 1, name: "Toto Tata", username: "toto" }),
            } as Response;
        } else {
            await new Promise((r) => setTimeout(r, 150));
            return { ok: false } as Response;
        }
    });
});


describe("UserSearch", () => {
    it("Avant toute action : affiche correctement le composant avant toute action", () => {

        render(<UserSearch />);
        
        // Vérifiez que le composant est rendu correctement
        expect(screen.getByLabelText(/nom d'utilisateur/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /rechercher/i })).toBeInTheDocument();

        // Pas de chargement, pas d'utilisateur trouvé et pas d'alerte d'erreur
        expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/utilisateur trouvé/i)).not.toBeInTheDocument();
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("Après clic sur “Rechercher” : affiche le message 'Chargement...' après clic et le supprime ensuite (succès)", async () => {

        render(<UserSearch />);

        const input = screen.getByLabelText(/nom d'utilisateur/i);
        const button = screen.getByRole("button", { name: /rechercher/i });

        await userEvent.type(input, "Toto");
        await userEvent.click(button);

        // le chargement apparaît brièvement
        await waitFor(() => {
            expect(screen.getByText(/chargement/i)).toBeInTheDocument();
        });

        await waitFor(() => {
            // puis disparaître
            expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument();
            expect(screen.getByText(/utilisateur trouvé : Toto Tata/i)).toBeInTheDocument();
        });

    });

    it("Cas d'échec : affiche le message d'erreur si utilisateur introuvable", async () => {

        render(<UserSearch />);
        const input = screen.getByLabelText(/nom d'utilisateur/i);
        const button = screen.getByRole("button", { name: /rechercher/i });

        await userEvent.type(input, "inconnu");
        await userEvent.click(button);

        // Attendre l'affichage final de l'erreur
        await waitFor(() => {
            expect(screen.getByRole("alert")).toHaveTextContent("Utilisateur introuvable");
            expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/utilisateur trouvé/i)).not.toBeInTheDocument();
        });


    });

});
