# b-vi.fr — refonte 2026

Même design que b-vi.fr (bureau, dossiers, fenêtres), même contenu, réécrit en HTML/CSS/JS sans dépendances (plus de jQuery ni de Hugo) avec des animations.

## Fichiers
- `index.html` — la page
- `data.js` — **tout le contenu** (dossiers, images, titres, textes) : c'est le seul fichier à modifier pour ajouter un projet
- `style.css` — le design
- `app.js` — fenêtres, visionneuse, animations
- `assets/` — icônes d'origine + police Px Grotesk Screen

## Mise en ligne
Copier le dossier à la racine de b-vi.fr, à côté du dossier `images/` existant. Les images sont prises sur `/images/...` quand le site tourne sur b-vi.fr, et sur `https://www.b-vi.fr/images/...` ailleurs (aperçu local).

## Animations
Écran de démarrage, icônes qui arrivent en cascade, fenêtres qui s'ouvrent depuis l'icône et se réduisent dans la barre des tâches, inclinaison pendant le glisser, plein écran animé, miniatures en cascade, texte tapé à la machine, visionneuse avec glissement, swipe et compteur, halo qui suit la souris, grain animé, économiseur d'écran B6 après 90 s, Konami code. Tout est coupé si l'utilisateur a demandé moins d'animations.
