import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
    
    it("appelle onSearch avec la requête trimée lors du clic sur le bouton", async () => {
        const onSearch = vi.fn();
        render(<SearchBar onSearch={onSearch} />);

        const input = screen.getByPlaceholderText(/rechercher/i);
        const button = screen.getByRole("button", { name: /rechercher/i });

        await userEvent.type(input, "   hello world   ");
        await userEvent.click(button);

        expect(onSearch).toHaveBeenCalledTimes(1);
        expect(onSearch).toHaveBeenCalledWith("hello world");
    });

    it("appelle onSearch avec la requête trimée lors de l'appui sur Entrée", async () => {
        const onSearch = vi.fn();
        render(<SearchBar onSearch={onSearch} />);

        const input = screen.getByPlaceholderText(/rechercher/i);

        await userEvent.type(input, "   salut le monde   ");
        await userEvent.keyboard("{Enter}");

        expect(onSearch).toHaveBeenCalledTimes(1);
        expect(onSearch).toHaveBeenCalledWith("salut le monde");
    });

    it("le bouton est désactivé si le champ est vide ou ne contient que des espaces", async () => {
        const onSearch = vi.fn();
        render(<SearchBar onSearch={onSearch} />);

        const input = screen.getByPlaceholderText(/rechercher/i);
        const button = screen.getByRole("button", { name: /rechercher/i });

        // Au départ, champ vide → bouton désactivé
        expect(button).toBeDisabled();

        // Saisie d'espaces → toujours désactivé
        await userEvent.type(input, "   ");
        expect(button).toBeDisabled();

        // Saisie d’un vrai texte → activé
        await userEvent.clear(input);
        await userEvent.type(input, "abc");
        expect(button).toBeEnabled();
    });

    it("n'appelle pas onSearch si la requête est vide après trim", async () => {
        const onSearch = vi.fn();
        render(<SearchBar onSearch={onSearch} />);

        const input = screen.getByPlaceholderText(/rechercher/i);
        const button = screen.getByRole("button", { name: /rechercher/i });

        await userEvent.type(input, "   ");
        await userEvent.click(button);

        expect(onSearch).not.toHaveBeenCalled();
    });

    it("le focus clavier atteint input puis bouton via tabulation", async () => {
        const handleSearch = vi.fn();
        render(<SearchBar onSearch={handleSearch} />);

        const input = screen.getByPlaceholderText(/rechercher/i);
        const button = screen.getByRole("button", { name: /rechercher/i });

        // 1er tab → input
        await userEvent.tab();
        expect(input).toHaveFocus();

        // Tape du texte pour activer le bouton
        await userEvent.type(input, "test");

        // 2e tab → bouton
        await userEvent.tab();
        expect(button).toHaveFocus();
    });
});
