# Exercice d’intégration — ShoppingList (parent/enfant + contexte)


## sujet
Mettre en pratique des **tests d’intégration** en validant la communication **parent/enfant** et l’usage d’un **contexte** React partagé :
- Ajout d’articles via le parent,
- Rendu d’items enfants avec action de suppression et bascule “acheté”,
- Mise à jour d’un **compteur global** exposé via un **Provider** de contexte.


## Critères d’acceptation (tests)

* **Initial** : `Total : 0` + `Aucun article` + bouton **désactivé** si input vide.
* **Ajout** : après saisie `Lait` puis clic `Ajouter`, la liste contient `Lait`, le champ est vidé, `Total : 1`.
* **Ajouts multiples** : `Lait`, `Pain` -> `Total : 2`.
* **Toggle** : cocher la case du premier item -> le texte comporte `[acheté]`.
* **Suppression** : supprimer le premier item -> il disparaît et le total décrémente.