/* =========================================================
   B-VI — contenu du site
   Tout le contenu est ici : dossiers, images, titres, textes.
   - img(chemin) : chemin relatif à /images/ sur b-vi.fr
   - desc : texte du panneau de droite de la fenêtre
   - items : images de la fenêtre { src, title, desc }
   - children : sous-dossiers
   ========================================================= */

// En ligne sur b-vi.fr → chemins relatifs. Ailleurs (aperçu local) → images chargées depuis b-vi.fr.
const IMG_BASE = /(^|\.)b-vi\.fr$/.test(location.hostname) ? "/images/" : "https://www.b-vi.fr/images/";
const img = (p) => IMG_BASE + encodeURI(p);

const S = "signalétique/";
const LDF = S + "Musée Louis de Funès/";

const SITE = [
  {
    name: "expos & musées",
    desc: "Signalétique, scénographie, identité visuelle, édition et illustration pour différents musées. 2019 – 2025",
    children: [
      {
        name: "Centre Pompidou",
        desc: "Signalétique d'exposition, mise en page des titres et des cartels, textes muraux pour le Centre Pompidou, pour le compte d'Œil de Lynx. 2022 – aujourd'hui",
        items: Array.from({ length: 11 }, (_, i) => ({
          src: img(`${S}Centre Pompidou/Sign_Pompidou_${String(i + 1).padStart(2, "0")}.jpg`),
          title: "",
        })),
      },
      {
        name: "Collection automobile du Prince de Monaco",
        desc: "Panneaux et bandeaux de cartels le long du parcours de visite de la Collection automobile du Prince de Monaco, pour le compte de Téra-création. 2022",
        items: Array.from({ length: 5 }, (_, i) => ({
          src: img(`${S}Collec auto Monaco/Signaletique_Monaco_0${i + 1}.jpg`),
          title: "",
        })),
      },
      {
        name: "Musée d'Amiens",
        desc: "Affiches, plan-guide, brochures et cartels pour le Musée de Picardie à Amiens, pour le compte de Téra-création. 2020",
        items: [
          { src: img(`${S}Musée d_Amiens/Affiche-reouverture.jpg`), title: "affiche 1" },
          { src: img(`${S}Musée d_Amiens/Affiche-reouverture2.jpg`), title: "affiche 2" },
          { src: img(`${S}Musée d_Amiens/DSC_0381.jpg`), title: "éditions" },
          { src: img(`${S}Musée d_Amiens/MdP 8.jpg`), title: "brochures" },
          { src: img(`${S}Musée d_Amiens/MdP 6.jpg`), title: "plan-guide" },
          { src: img(`${S}Musée d_Amiens/MdP 7.jpg`), title: "plan-guide" },
          { src: img(`${S}Musée d_Amiens/DSC_0172.JPG`), title: "cartels" },
          { src: img(`${S}Musée d_Amiens/IMG_6550.JPG`), title: "cartels" },
          { src: img(`${S}Musée d_Amiens/MdP 13.JPG`), title: "cartels", desc: "Moi, avec les cartels." },
          { src: img(`${S}Musée d_Amiens/MdP 14 (1).jpg`), title: "cartels" },
        ],
      },
      {
        name: "Musée d'Épernay",
        desc: "Illustrations d'une mascotte et parcours de questions-réponses sur le champagne et l'histoire de la région pour le musée d'Épernay, pour le compte de Téra-création. 2019",
        items: [
          { src: img(`${S}Musée d_Epernay/IMG_0430.JPG`), title: "QR fermé" },
          { src: img(`${S}Musée d_Epernay/IMG_0429.JPG`), title: "QR ouvert" },
          { src: img(`${S}Musée d_Epernay/IMG_6668.jpg`), title: "plaques" },
          { src: img(`${S}Musée d_Epernay/Plan de travail 1 copie 9.png`), title: "romains" },
          { src: img(`${S}Musée d_Epernay/Plan de travail 1 copie 11.png`), title: "bain" },
          { src: img(`${S}Musée d_Epernay/Plan de travail 1v copie 15.png`), title: "bulles" },
          { src: img(`${S}Musée d_Epernay/Plan de travail 1v.png`), title: "silex" },
          { src: img(`${S}Musée d_Epernay/QR-planche.png`), title: "tout" },
          { src: img(`${S}Musée d_Epernay/epernay-cartels-planche.jpg`), title: "cartels" },
        ],
      },
      {
        name: "Musée de La Poste",
        desc: "Affiches de la campagne de réouverture du Musée de La Poste à Paris, pour le compte de Téra-création. 2019",
        items: [
          { src: img(`${S}Musée de La Poste/affiche-reouverture.jpg`), title: "affiche 1" },
          { src: img(`${S}Musée de La Poste/affiche-reouverture-totem.jpg`), title: "affiche 2" },
          { src: img(`${S}Musée de La Poste/20191119_190749.jpg`), title: "métro" },
          { src: img(`${S}Musée de La Poste/IMG_0025.JPG`), title: "papèterie" },
        ],
      },
      {
        name: "Musée des égouts de Paris",
        desc: "Signalétique, panneaux et schémas techniques pour le Musée des égouts de Paris, pour le compte de Téra-création. 2019 – 2021",
        items: ["20210924_141654", "20210924_142857", "20210924_142936", "20210924_143513", "IMG_9248", "IMG_9257"].map((f) => ({
          src: img(`${S}Musée des égouts de Paris/${f}`),
          title: "",
        })),
      },
      {
        name: "Musée Louis de Funès",
        desc: "Signalétique, scénographie, graphisme et éditions pour quatre expositions du Musée Louis de Funès à Saint-Raphaël : la gastronomie (2022), Chaplin (2023), La Grande Vadrouille (2024) et Les mondes fantastiques (2025).",
        children: [
          {
            name: "Expo Gastro",
            desc: "Exposition sur la gastronomie. 2022",
            items: [
              { src: img(LDF + "Sign_LDF_02.jpg"), title: "Expo Gastro" },
              { src: img(LDF + "Sign_LDF_03.jpg"), title: "Expo Gastro" },
              { src: img(LDF + "Sign_LDF_04.jpg"), title: "Expo Gastro" },
              { src: img(LDF + "recettes-vrac.jpg"), title: "recettes" },
              { src: img(LDF + "LDF_Glaude_1080px"), title: "Le Glaude" },
              { src: img(LDF + "LDF_Denree_1080px"), title: "La Denrée" },
            ],
          },
          {
            name: "Expo Chaplin",
            desc: "Exposition Louis de Funès et Chaplin. 2023",
            items: [
              { src: img(LDF + "Sign_LDF_05.jpg"), title: "Expo Chaplin" },
              { src: img(LDF + "Sign_LDF_06.jpg"), title: "Expo Chaplin" },
              { src: img(LDF + "Sign_LDF_07.jpg"), title: "Expo Chaplin" },
              { src: img(LDF + "Sign_LDF_08.jpg"), title: "Expo Chaplin" },
              { src: img(LDF + "LDFCHAP_silhouettes_1080px.png"), title: "silhouettes" },
              { src: img(LDF + "LDFCHAP_fresque_foule_1080px.png"), title: "foules" },
              { src: img(LDF + "LDFCHAP-livret-spreads.jpg"), title: "parcours enfants" },
            ],
          },
          {
            name: "Expo Grande Vadrouille",
            desc: "Exposition La Grande Vadrouille. 2024",
            items: [
              { src: img(LDF + "Sign_LDF_09.jpg"), title: "Expo Grande Vadrouille" },
              { src: img(LDF + "Sign_LDF_10.jpg"), title: "Expo Grande Vadrouille" },
              { src: img(LDF + "Sign_LDF_11.jpg"), title: "Expo Grande Vadrouille" },
              { src: img(LDF + "Sign_LDF_12.jpg"), title: "fresque" },
              { src: img(LDF + "Sign_LDF_13.jpg"), title: "parcours enfants" },
            ],
          },
          {
            name: "Expo Les mondes fantastiques",
            desc: "Exposition Les mondes fantastiques. 2025",
            items: [
              { src: img(LDF + "Sign_LDF_14.jpg"), title: "Les mondes fantastiques" },
              { src: img(LDF + "Sign_LDF_15.jpg"), title: "Les mondes fantastiques" },
              { src: img(LDF + "Sign_LDF_16.jpg"), title: "Les mondes fantastiques" },
            ],
          },
        ],
      },
      {
        name: "Notre-Dame du Raincy",
        desc: "Graphisme de l'exposition du centenaire de l'église Notre-Dame du Raincy. 2023",
        items: Array.from({ length: 7 }, (_, i) => ({
          src: img(`${S}Notre-Dame du Raincy/Sign_NDR_0${i + 1}.jpg`),
          title: "",
        })),
      },
    ],
  },

  {
    name: "identité",
    children: [
      {
        name: "kewb",
        desc: "KEWB est une police développée pour moi-même depuis plusieurs années, mais que j’ai eu par la suite l’occasion d’utiliser dans le cadre de projets. Très caractéristique, elle est basée sur une simple grille de 3 par 3. Le concept fondamental est l’aspect ludique de la police. Chaque lettre est conçue comme un module, elles sont faites pour s’empiler, s’imbriquer, se construire les unes avec les autres, pour remplir l’espace en deux ou en trois dimensions. 2014 – 2016",
        items: [
          { src: img("identité/kewb/KEWB.png"), title: "KEWB" },
          { src: img("identité/kewb/specimen.png"), title: "specimen" },
          { src: img("identité/kewb/affiche 3.jpg"), title: "ToysRUs", desc: "2016" },
          { src: img("identité/kewb/affiche 2.jpg"), title: "ToysRUs", desc: "2016" },
          { src: img("identité/kewb/alphabyrinthe.jpg"), title: "alphabyrinthe", desc: "Affiche de l'alphabet disposé en labyrinthe. 2014" },
        ],
      },
      {
        name: "kosmos",
        desc: "Projet de diplôme de M2 Design à Intuit Lab Paris. Refonte de l'identité de Roscosmos, qui devient Kosmos, en gardant un K cyrillique en clin d'œil à son héritage. 2019",
        items: [
          { src: img("identité/kosmos/20190624_135435.jpg"), title: "charte", desc: "Charte graphique." },
          { src: img("identité/kosmos/20190624_135630.jpg"), title: "charte", desc: "Page sur la couleur principale de l'identité." },
          { src: img("identité/kosmos/20190624_135728.jpg"), title: "charte", desc: "Page sur la typographie cyrillique (Soyuz Grotesk, par The Temporary State)." },
          { src: img("identité/kosmos/20190624_135842.jpg"), title: "charte", desc: "Page sur les applications textiles." },
          { src: img("identité/kosmos/kosmos-allpages-charte.png"), title: "charte" },
          { src: img("identité/kosmos/affiche.jpg"), title: "affiche Bourget", desc: "Affiche pour la présentation de Kosmos au salon du Bourget 2021." },
          { src: img("identité/kosmos/affiche bus stop.jpg"), title: "affiche Bourget" },
          { src: img("identité/kosmos/stand01.jpg"), title: "stand Bourget", desc: "Le stand Kosmos au salon du Bourget 2021." },
          { src: img("identité/kosmos/depliant-recto-verso.jpg"), title: "flyer" },
          { src: img("identité/kosmos/20190615_175352.jpg"), title: "t-shirt", desc: "Sérigraphie sur t-shirt." },
          { src: img("identité/kosmos/20190615_171429.jpg"), title: "combi", desc: "Sérigraphie sur la combinaison." },
          { src: img("identité/kosmos/20190615_185148.jpg"), title: "combi", desc: "Sérigraphie sur la combinaison." },
          { src: img("identité/kosmos/20190624_165855.jpg"), title: "casquette", desc: "Symbole brodé sur une casquette." },
          { src: img("identité/kosmos/combis.jpg"), title: "moi", desc: "Moi, en cosplay de livreur spatial le jour du jury." },
          { src: img("identité/kosmos/4-slides.jpg"), title: "prez" },
          { src: img("identité/kosmos/kosmos-allpages-prez.jpg"), title: "prez" },
          { src: img("identité/kosmos/anim-kosmos.gif"), title: "anim logo" },
        ],
      },
      {
        name: "tempo",
        desc: "Collaboration avec des étudiants du CELSA Sorbonne autour d'un concept pour faciliter l'attente à l'hôpital : un système de gestion du temps et un espace de détente. Communication : identité, site, dépliant et dossier de presse. 2018",
        items: [
          { src: img("identité/tempo/20180124_185254 - Copie.jpg"), title: "flyer" },
          { src: img("identité/tempo/20180124_185304 - Copie.jpg"), title: "flyer" },
          { src: img("identité/tempo/20180124_185317 - Copie.jpg"), title: "flyer" },
          { src: img("identité/tempo/site1.png"), title: "site" },
          { src: img("identité/tempo/site3.png"), title: "site" },
          { src: img("identité/tempo/site5.png"), title: "site" },
          { src: img("identité/tempo/tempo-06.jpg"), title: "édition" },
          { src: img("identité/tempo/tempo-07.jpg"), title: "édition" },
          { src: img("identité/tempo/tempo-08.jpg"), title: "édition" },
        ],
      },
    ],
  },

  {
    name: "illustration",
    items: [
      { src: img("illustration/actua-illu_4.jpg"), title: "Actua", desc: "Illustration pour le magazine Actua, pour l'agence Mouvement Up (Groupe SOS)." },
      { src: img("illustration/bbmix_mockup.jpg"), title: "BBMIX", desc: "Illustration et affiche pour le festival BBMIX." },
      { src: img("illustration/chatrusse.jpg"), title: "minou", desc: "Carnet de dessins." },
      { src: img("illustration/compo1.jpg"), title: "jurassique", desc: "Workshop pour lequel il était demandé \"d'illustrer sans le montrer\". J'ai fait le choix de parler du changement et donc pour cela de mettre côte à côte l'état \"avant\" et \"après\". Et j'ai pris comme sujets des dinosaures parce que c'est cool. 2015" },
      { src: img("illustration/fille_final2.jpg"), title: "Savanfou - fille", desc: "Extrait d'un jeu des 7 familles sur une famille de savants fous : la fille. 2015" },
      { src: img("illustration/pere_final2.jpg"), title: "Savanfou - père", desc: "Extrait d'un jeu des 7 familles sur une famille de savants fous : le père. 2015" },
      { src: img("illustration/punk.jpg"), title: "Bagarre Molle - Punk", desc: "Mise en image de la chanson \"Bagarre Molle\" de Flavien Berger, un texte cyberpunk parlant de pizza et de néons. 2016" },
    ],
  },

  {
    name: "print",
    children: [
      {
        name: "apesanteur",
        desc: "Anthologie de textes de science-fiction sur l'espace, avec des jeux typographiques. 2016",
        items: [
          { src: img("print/apesanteur/cover.jpg"), title: "couverture" },
          { src: img("print/apesanteur/int 01 (1).jpg"), title: "intérieur" },
          { src: img("print/apesanteur/int 02.jpg"), title: "intérieur" },
        ],
      },
      {
        name: "apocryphe",
        desc: "Livre fait main lors d'un workshop encadré par Kiösk, construit à partir d'images du Rijksmuseum autour des quatre Évangiles. 2018",
        items: [
          { src: img("print/apocryphe/IMG_6228.JPG"), title: "page titre" },
          { src: img("print/apocryphe/IMG_6239.jpg"), title: "" },
          { src: img("print/apocryphe/IMG_6255.jpg"), title: "" },
          { src: img("print/apocryphe/IMG_6264.jpg"), title: "" },
          { src: img("print/apocryphe/SKM_C30818020820390.jpg"), title: "" },
          { src: img("print/apocryphe/SKM_C30818020820410.jpg"), title: "" },
          { src: img("print/apocryphe/SKM_C30818020820411.jpg"), title: "" },
          { src: img("print/apocryphe/SKM_C30818020820420.jpg"), title: "planche" },
        ],
      },
      {
        name: "giga-soirée",
        desc: "Le récit, façon carnet de bord, d'une soirée bien arrosée, reconstitué à partir des messages envoyés après coup. 2018",
        items: [
          { src: img("print/giga-soirée/mockup_couv.jpg"), title: "couv et 4e" },
          { src: img("print/giga-soirée/mockup_interieur.jpg"), title: "intérieur" },
          { src: img("print/giga-soirée/mockup_interieur-2.jpg"), title: "intérieur" },
        ],
      },
      {
        name: "GPNK",
        desc: "GPNK est le consumer magazine pour la marque de Gosha Rubchinskiy, un photographe et créateur de mode russe. L’objectif de ce magazine est de décrire et de comprendre l’intérêt naissant chez les occidentaux pour les pays de l’Est et la Russie en particulier ; de saisir le mode de vie et d’expression si particuliers de cette génération post-soviétique qui tente de s’en sortir. 2016",
        items: ["couv.jpg", "02.jpg", "03.jpg", "04.jpg", "08.jpg", "09.jpg", "4e-couv.jpg"].map((f) => ({ src: img("print/GPNK/" + f), title: "" })),
      },
      {
        name: "poster",
        desc: "Série d'affiches. 2013 – 2019",
        items: [
          { src: img("print/poster/LabPan_SaulBass.jpg"), title: "Pan", desc: "\"Le Labyrinthe de Pan\" à la manière de Saul Bass. 2013" },
          { src: img("print/poster/1969small.jpg"), title: "DéFAKE 1", desc: "Affiche pour une campagne contre les fake news. 2017" },
          { src: img("print/poster/Poster_V2.png"), title: "Synthzilla", desc: "Proposition d'affiche pour le festival Synthzilla." },
          { src: img("print/poster/afficha ultima new.jpg"), title: "Carambolage", desc: "Affiche sur l'évolution de la forme. 2017" },
          { src: img("print/poster/eucalyptus-print-small.jpg"), title: "Valda menthe", desc: "Maquette d'affiche pour les pastilles Valda, réalisée chez SuperCafard. 2019" },
          { src: img("print/poster/poster-infime-volume.jpg"), title: "Infime", desc: "Concept d'affiche pour la gamme de soins Infime, réalisé chez SuperCafard. 2019" },
        ],
      },
    ],
  },

  {
    name: "web",
    children: [
      {
        name: "b-vi.fr",
        desc: "La version précédente de ce site. 2018 – 2021",
        items: [
          { src: img("web/b-vi.fr/b-vi.fr.jpg"), title: "fenêtres" },
          { src: img("web/b-vi.fr/old_01.jpg"), title: "bureau" },
        ],
      },
      {
        name: "havana-club",
        desc: "Webdesign et maquettes du site international de Havana Club, réalisés chez SuperCafard. 2020",
        items: [
          ["01-main", "mainpage"], ["02-menu", "menu"], ["03-cocktails", "cocktails"],
          ["04-event-collab", "events"], ["05-projects", "projects"], ["06-products", "products"],
        ].map(([f, t]) => ({ src: img(`web/havana-club/havanaclub_fin_screen-${f}.jpg`), title: t })),
      },
    ],
  },
];

const CONTACT = {
  name: "contact & cv",
  lines: [
    { big: "Lucas Bessis" },
    { big: "Graphisme — Direction artistique" },
    { big: "Paris, France" },
    { gap: true },
    { big: "mail : ", link: "contact@b-vi.fr", href: "mailto:contact@b-vi.fr" },
    { big: "instagram : ", link: "@l.bvi", href: "https://www.instagram.com/l.bvi/" },
    { big: "CV : ", link: "télécharger", href: IMG_BASE.replace(/images\/$/, "") + "images/CV_Lucas-Bessis_2025_FR-EN-IT" },
    { big: "---" },
    { small: "Webdesign by Lucas Bessis" },
    { small: "Developed by Valentin Rossi : ", links: [["GitHub", "https://github.com/Valar207"], ["Linkedin", "https://www.linkedin.com/in/valentin-rossi-8a5639a6/"]] },
    { small: "Typeface: 'Px Grotesk Screen' by ", links: [["Optimo", "https://optimo.ch/"]] },
  ],
};
