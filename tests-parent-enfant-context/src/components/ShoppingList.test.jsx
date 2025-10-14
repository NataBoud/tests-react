import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider } from '../context/CartContext'
import { ShoppingList } from './ShoppingList'

// encapsuler chaque test dans le contexte CartProvider pour partager le compteur global.
function renderWithProvider(ui) {
  return render(<CartProvider>{ui}</CartProvider>)
}

describe("ShoppingList (integration parent/enfant + contexte)", () => {
  test('état initial et accessibilité', () => {

    renderWithProvider(<ShoppingList />)

    // vérifier que le total est à 0 au départ
    expect(screen.getByText(/Total : 0/i)).toBeInTheDocument();

    // Aucun article affiché
    expect(screen.getByText(/Aucun article/i)).toBeInTheDocument();

    //  désactiver le bouton si input vide
    const addButton = screen.getByRole('button', { name: /ajouter/i });
    expect(addButton).toBeDisabled();

  })

  test("ajout d'un article met a jour la liste et le total", async () => {
    renderWithProvider(<ShoppingList />)

    const input = screen.getByPlaceholderText(/Nouvel article/i);
    const addButton = screen.getByRole('button', { name: /ajouter/i });

    await userEvent.type(input, 'Lait');
    expect(addButton).toBeEnabled();

    await userEvent.click(addButton);

    // L'article "Lait" apparaît dans la liste
    expect(screen.getByText(/lait/i)).toBeInTheDocument();
    expect(input.value).toBe('');
    expect(screen.getByText(/total : 1/i)).toBeInTheDocument();

  })

  test("ajouts multiples et toggle acheté", async () => {
    renderWithProvider(<ShoppingList />)

    const input = screen.getByPlaceholderText(/Nouvel article/i);
    const addButton = screen.getByRole('button', { name: /ajouter/i });

    // Ajout 1 article
    await userEvent.type(input, 'Lait');
    await userEvent.click(addButton);

    // Ajout 2 article
    await userEvent.type(input, 'Pain');
    await userEvent.click(addButton);

    // Les deux sont présents
    expect(screen.getByText(/lait/i)).toBeInTheDocument();
    expect(screen.getByText(/pain/i)).toBeInTheDocument();

    // Le total 
    expect(screen.getByText(/Total : 2/i)).toBeInTheDocument();

    // cocher la case du 1 article
    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    await userEvent.click(firstCheckbox);

    // Le texte du 1 article doit inclure [acheté]
    expect(screen.getByText(/Lait \[acheté\]/i)).toBeInTheDocument();

  })

  test("suppression d'un article", async () => {
    renderWithProvider(<ShoppingList />)

    const input = screen.getByPlaceholderText(/nouvel article/i);
    const addButton = screen.getByRole('button', { name: /Ajouter/i });

    // Ajout
    await userEvent.type(input, 'Lait');
    await userEvent.click(addButton);

    await userEvent.type(input, 'Pain');
    await userEvent.click(addButton);

    // Le total 
    expect(screen.getByText(/Total : 2/i)).toBeInTheDocument();

    // Suppression 
    const deleteButtons = screen.getAllByRole('button', { name: /Supprimer/i });
    await userEvent.click(deleteButtons[0]);

    expect(screen.queryByText(/lait/i)).not.toBeInTheDocument();

    // Le total 
    expect(screen.getByText(/Total : 1/i)).toBeInTheDocument();

    expect(screen.getByText(/pain/i)).toBeInTheDocument();

  })
})