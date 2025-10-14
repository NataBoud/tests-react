import { http, HttpResponse } from "msw";
import type { PathParams } from "msw";

export const handlers = [
    http.get<PathParams<"username">>(
        "https://api.example.com/user/:username",
        ({ params }) => {
            const { username } = params;

            if (username === "toto") {
                return HttpResponse.json(
                    { id: 1, name: "Toto tata", username: "toto" },
                    { status: 200 }
                );
            }

            return HttpResponse.json(
                { message: "Utilisateur introuvable" },
                { status: 404 }
            );
        }
    ),
];

