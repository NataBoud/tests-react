import { useState } from "react";

type SearchBarProps = {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {

    const [query, setQuery] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        // prevenir l'envoi du formulaire
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
            onSearch(trimmedQuery);
        }
    };

    // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Enter") {
    //         handleSearch(e);
    //     }
    // };

    const isDisabled = query.trim().length === 0;

    return (
        <div>
            <form onSubmit={handleSearch}>
                <label htmlFor="search-input">Rechercher :</label>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={query}
                    onChange={handleChange}
                    // onKeyDown={handleKeyDown}
                />
                <button type="submit" disabled={isDisabled}>Rechercher</button>
            </form>

        </div>
    )
}
