import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Greeting from "./Greeting";

describe("Greeting", () => {
    it("affiche 'Bonjour, React' quand une prop name est passée", () => {
        render(<Greeting name="React" />);
        expect(screen.getByText(/bonjour, react/i)).toBeInTheDocument();
    });

    it("affiche 'Bonjour, invité' quand aucune prop n'est fournie", () => {
        render(<Greeting />);
        expect(screen.getByText(/bonjour, invité/i)).toBeInTheDocument();
    });
});
