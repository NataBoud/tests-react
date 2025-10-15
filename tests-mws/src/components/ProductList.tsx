import { useEffect, useState } from "react";

type Product = {
    id: number;
    name: string;
};

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("https://api.example.com/products")
            .then((res) => {
                if (!res.ok) throw new Error("Erreur serveur");
                return res.json() as Promise<Product[]>;
            })
            .then((data) => setProducts(data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p role="alert">Impossible de charger</p>;
    if (products.length === 0) return <p>Aucun produit</p>;

    return (
        <ul>
            {products.map((p) => (
                <li key={p.id}>{p.name}</li>
            ))}
        </ul>
    );
}
