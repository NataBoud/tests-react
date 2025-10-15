# Exercice — Bar de recherche (SearchBar) : tests d’interactions utilisateur

## Objectif
Développer un composant `SearchBar` et écrire le code nécessaire pour **faire passer une suite de tests d’interaction** simulant un usage réaliste :
- Saisie d’un texte de requête.
- Déclenchement de la recherche par clic sur le bouton ou touche Entrée.
- Appel d’un callback `onSearch(query)` avec la valeur **trimée**.
- Bouton désactivé quand le champ est vide.


### Description fonctionnelle

Implémenter un composant `SearchBar` qui :

1. Affiche un **champ texte** avec un placeholder explicite (ex. « Rechercher… »).
2. Affiche un **bouton** libellé « Rechercher ».
3. Appelle `onSearch(query)` lorsque :
   * l’utilisateur clique sur le bouton,
   * ou appuie sur **Entrée** dans le champ,
     **si** la requête (après `trim()`) n’est pas vide.
4. **Désactive** le bouton lorsque le champ est vide (ou ne contient que des espaces).
5. **Optionnel** : vider le champ après une recherche réussie.



## tests à faire passer

* Saisie d’une requête puis clic sur le bouton → `onSearch` appelé avec la requête **trimée**.
* Saisie d’une requête puis touche Entrée → `onSearch` appelé avec la requête **trimée**.
* Bouton **désactivé** si le champ est vide ou ne contient que des espaces.
* Aucune recherche lancée si la requête est vide (après trim).
* Le focus clavier permet d’atteindre input puis bouton (tabulation testable).