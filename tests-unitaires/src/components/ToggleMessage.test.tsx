import { describe, expect, it } from "vitest";
import { render, screen } from '@testing-library/react'
import ToggleMessage from "./ToggleMessage";
import user from '@testing-library/user-event'

describe('ToggleMessage', () => {

    it('n’affiche pas le message au départ', () => {
       render(<ToggleMessage />)
       expect(screen.queryByText(/mEssage affiche/i)).toBeNull()
    })

    it('affiche le message après un clic', async () => {
        render(<ToggleMessage />)
        const button = screen.getByRole("button", { name: /aFficher/i });
        await user.click(button)
        expect(screen.getByText(/message affiché/i)).toBeInTheDocument()
    })

    it('cache le message après un second clic', async () => {
        render(<ToggleMessage />)
        const button = screen.getByRole("button", { name: /afficher/i });
        await user.click(button)
        await user.click(button)
        expect(screen.queryByText(/message affiché/i)).not.toBeInTheDocument()
    })

})