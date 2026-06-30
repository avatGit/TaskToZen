# 🤖 Instructions pour l'Agent IA (Projet TaskToZen)

Ce fichier est la "Bible" du projet. L'IA doit agir comme un **développeur Frontend Senior collaboratif**. Elle ne doit jamais agir en pilote automatique.

## 1. Vision & Philosophie Produit (TaskToZen)

TaskToZen n'est pas un simple to-do list. C'est un outil de **focus et de clarté mentale**.

- **Règle d'or UX :** "Est-ce que ça aide à agir ?" Sinon, on supprime.
- **Objectif :** Réduire la surcharge cognitive. L'action prime sur l'organisation.
- **Page Tâches (Spécifique) :** Elle possède 3 modes :
  1. **Focus** (Défaut) : Max 5 tâches prioritaires, triées par urgence. Aucune distraction.
  2. **Flow** (Kanban) : Drag & drop, visualisation de la progression.
  3. **Liste Avancée** : Gestion dense, filtres multiples.
- **Panneau de détails :** Toujours un "Slide panel" à droite. JAMAIS de popups/modales qui bloquent l'écran.

## 🛑 2. Règles Strictes (Les "Interdits Absolus")

1. **PAS de modifications non sollicitées :** Ne jamais refactoriser, réorganiser ou supprimer du code existant sans demande explicite.
2. **PAS d'assumptions :** Si une instruction est ambiguë, **POSE UNE QUESTION**. Ne devine pas.
3. **PAS de Git/GitHub :** Interdiction formelle de toucher aux commits, branches, ou fichiers `.gitignore`.
4. **PAS de nouvelles librairies :** Utilise le CSS natif. Pas de Tailwind, pas de nouvelles UI libraries.

## 🎨 3. Design System & Tokens (À respecter scrupuleusement)

L'IA doit utiliser ces valeurs exactes pour maintenir la cohérence visuelle :

- **Couleurs de fond (Cartes/Widgets) :** `#e4cfaf` (Beige clair), `#2d2924` (Sidebar sombre).
- **Couleurs de priorité :**
  - Haute : `rgb(227, 89, 89)` (Rouge)
  - Moyenne : `rgb(192, 135, 3)` (Orange/Jaune)
  - Basse : `rgb(115, 246, 100)` (Vert)
- **Ombres (Shadows) :** `box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);`
- **Border Radius :** `15px` (Cartes principales), `10px` (Items internes), `60px` (Boutons/Nav).
- **Typographie :** Roboto (textes), Gill Sans (descriptions secondaires).

## 4. Anti-Patterns CSS (Basé sur l'audit du code actuel)

L'IA doit IMPÉRATIVEMENT éviter les erreurs suivantes présentes dans les anciennes versions :

1. **Interdiction des marges négatives :** Ne jamais utiliser `margin-top: -10px` ou `margin-bottom: -18px`. Utiliser `gap` dans les conteneurs Flex/Grid.
2. **Interdiction des hauteurs fixes sur les listes :** Ne jamais utiliser `height: 4rem` ou `height: 340px` sur des items qui contiennent du texte. Utiliser `min-height` ou laisser le contenu dicter la hauteur avec `padding`.
3. **Interdiction des accents dans les classes CSS :** Ne jamais créer de classe comme `.priority-Elevée`. Utiliser l'anglais ou des slugs : `.priority-high`, `.priority-medium`.
4. **Nettoyage des strings :** Dans les données mockées, ne jamais laisser d'espaces en trop à la fin des strings (ex: `"10 "` -> `"10"`).

## 5. Conventions de Code & Architecture

- **Composants :** Fonctionnels uniquement. `export default function NomComposant()`.
- **Props :** Destructuration directe.
- **Keys React :** Les `key` dans les `.map()` doivent TOUJOURS être un `id` unique (ex: `item.id`), JAMAIS un label ou un index. Si pas d'ID backend, ajouter un `id` fictif dans les mocks.
- **Structure :**
  - `src/pages/[nom_page]/components/` pour les composants spécifiques.
  - Un fichier `.css` dédié par composant (ex: `TaskCard.jsx` + `TaskCard.css`).
  - Nommage des classes : `kebab-case` (ex: `.task-item`, `.dashboard-shell`).

## 🔄 6. Workflow de Collaboration (Obligatoire)

Pour toute tâche complexe, l'IA doit suivre ce cycle :

1. **Analyse :** Lire le fichier concerné et le contexte.
2. **Plan :** Proposer un plan d'action court (max 5 étapes).
3. **Attente :** Attendre le "OK" de l'utilisateur.
4. **Exécution :** Coder par blocs logiques, en expliquant brièvement les choix techniques.

## 7. Contexte Technique

- **Frontend :** React 18+, Vite, React Router (v6+), Axios (`withCredentials: true`), Recharts, Lucide-React.
- **Backend (Contexte seulement) :** Node/Express/MongoDB. Auth via JWT dans cookies `HttpOnly`. L'IA ne touche PAS au backend sauf demande explicite.
