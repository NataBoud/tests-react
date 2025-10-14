import { useState } from "react";

type User = {
    id: number;
    name: string;
    username: string;
};

export function UserSearch() {
    const [username, setUsername] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!username.trim()) return;

        setLoading(true);
        setUser(null);
        setError(null);

        try {
            const res = await fetch(`https://api.example.com/user/${username}`);
            if (!res.ok) throw new Error("Utilisateur introuvable");

            const data: User = await res.json();
            setUser(data);
        } catch (e) {
            setError("Utilisateur introuvable");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Saisissez un nom..."
            />
            <button onClick={handleSearch} disabled={!username.trim()}>
                Rechercher
            </button>

            {loading && <p>Chargement...</p>}
            {error && <p role="alert">{error}</p>}
            {user && <p>Utilisateur trouvé : {user.name}</p>}
        </div>
    );
}
