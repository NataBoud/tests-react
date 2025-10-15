import { http, HttpResponse } from "msw";

export const handlers = [

    http.get("https://api.example.com/products", () => {
        return HttpResponse.json(
            [
                { id: 1, name: "Clavier" },
                { id: 2, name: "Souris" },
            ],
            { status: 200 }
        );
    }),

];

