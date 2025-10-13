import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ButtonWithCallback from "./ButtonWithCallback";
import userEvent from "@testing-library/user-event";

describe('ButtonWithCallback', () => {
    it('appelle la fonction onClick quand on clique sur le bouton', async () => {
        const mockFn = vi.fn();
        render(<ButtonWithCallback onClick={mockFn}/>);

        const button = screen.getByRole('button', {name: /cLique/i});
        await userEvent.click(button);

        expect(mockFn).toHaveBeenCalledTimes(1)
    });
})