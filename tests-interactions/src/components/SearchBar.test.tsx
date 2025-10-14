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

    it('n\'appelle pas onSearch si la requête est vide après trim', async () => {
        const onSearch = vi.fn();

        render(<SearchBar onSearch={onSearch} />);

        const input = screen.getByPlaceholderText(/rechercher/i);
        const button = screen.getByRole("button", { name: /rechercher/i });

        await userEvent.type(input, "   ");
        await userEvent.click(button);

        // expect(onSearch).toHaveBeenCalledTimes(0);
        expect(onSearch).not.toHaveBeenCalled();
    });

    it("le focus clavier atteint input puis bouton via tabulation", async () => {
        const handleSearch = vi.fn();
        render(<SearchBar onSearch={handleSearch} />);

        const input = screen.getByPlaceholderText(/rechercher/i);
        const button = screen.getByRole("button", { name: /rechercher/i });

        await userEvent.tab();
        expect(input).toHaveFocus();

        // pour activer le bouton !
        await userEvent.type(input, "test");

        await userEvent.tab();
        expect(button).toHaveFocus();
    });
    
})
