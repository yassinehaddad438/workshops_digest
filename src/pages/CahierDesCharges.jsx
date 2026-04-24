import { jsPDF } from 'jspdf'

const sections = [
  {
    title: '1. Présentation du projet',
    content: [
      {
        subtitle: '1.1 Nom du projet',
        text: 'Workshop Digest',
      },
      {
        subtitle: '1.2 Description générale',
        text: "Workshop Digest est une application web monopage (SPA) qui agrège automatiquement des ateliers et événements d'apprentissage gratuits provenant de plus de 9 sources reconnues sur internet. Elle envoie chaque matin un digest quotidien par email aux abonnés inscrits, leur permettant de découvrir facilement de nouvelles opportunités de formation.",
      },
      {
        subtitle: '1.3 Objectifs',
        text: [
          "• Centraliser en un seul endroit les workshops et événements gratuits provenant de sources diverses.",
          "• Permettre aux utilisateurs de parcourir, rechercher et filtrer les ateliers disponibles.",
          "• Offrir un service d'abonnement email pour recevoir une sélection quotidienne chaque matin à 07h00.",
          "• Fournir une interface administrative pour gérer les ateliers et visualiser les statistiques.",
        ],
      },
    ],
  },
  {
    title: '2. Contexte et périmètre',
    content: [
      {
        subtitle: '2.1 Contexte',
        text: "Face à la prolifération des ressources d'apprentissage en ligne, il devient difficile pour les apprenants de suivre les nouvelles opportunités de formation. Workshop Digest automatise cette veille pédagogique en agrégeant les contenus de sources de référence et en les présentant de manière claire et accessible.",
      },
      {
        subtitle: '2.2 Périmètre',
        text: [
          "• Frontend : Application React (client uniquement, déployé de façon statique).",
          "• Base de données : Supabase (PostgreSQL hébergé) pour le stockage des ateliers et des abonnés.",
          "• Automatisation : Workflow n8n pour le scraping périodique et l'envoi des emails digest.",
          "• Hors périmètre : Développement d'un backend REST personnalisé, authentification utilisateur avancée.",
        ],
      },
    ],
  },
  {
    title: '3. Fonctionnalités',
    content: [
      {
        subtitle: "3.1 Page d'accueil (Home)",
        text: [
          "• Affichage d'une bannière hero avec les titres et boutons d'action.",
          "• Statistiques en temps réel : nombre total d'ateliers, nombre de sources, ajouts du jour.",
          "• Grille des 6 derniers ateliers ajoutés.",
          "• Lien vers la liste complète et vers la page d'abonnement.",
        ],
      },
      {
        subtitle: '3.2 Liste des ateliers (Dashboard)',
        text: [
          "• Affichage paginé de l'ensemble des ateliers.",
          "• Recherche par titre (insensible à la casse).",
          "• Filtrage par source (UNESCO, Coursera Blog, eLearning Industry, Class Central, World Heritage Centre…).",
          "• Chaque carte présente : source, titre, description courte, date, lieu, lien externe.",
        ],
      },
      {
        subtitle: "3.3 Page d'abonnement (Subscribe)",
        text: [
          "• Formulaire de saisie d'adresse email.",
          "• Insertion de l'abonné dans la table Supabase `subscribers`.",
          "• Confirmation visuelle en cas de succès ; message d'erreur en cas d'échec ou d'email déjà existant.",
          "• Mise en avant des avantages : envoi quotidien à 07h00, 100 % gratuit, sans spam.",
        ],
      },
      {
        subtitle: '3.4 Tableau de bord administrateur (Admin)',
        text: [
          "• Accès réservé (route /admin protégée).",
          "• Visualisation et gestion des ateliers enregistrés.",
          "• Aperçu du template email avant envoi.",
        ],
      },
    ],
  },
  {
    title: '4. Architecture technique',
    content: [
      {
        subtitle: '4.1 Stack frontend',
        text: [
          "• React 19 – bibliothèque d'interface utilisateur.",
          "• Vite 8 – bundler et serveur de développement.",
          "• React Router v7 – routage côté client.",
          "• TanStack Query v5 – gestion du cache et des requêtes asynchrones.",
          "• Zustand v5 – gestion d'état global léger.",
          "• jsPDF – génération de documents PDF côté client.",
        ],
      },
      {
        subtitle: '4.2 Backend & base de données',
        text: [
          "• Supabase (PostgreSQL) – base de données hébergée, accès via le client JS officiel.",
          "• Tables principales : `workshops` (id, title, description, url, source, date, location, created_at) et `subscribers` (id, email, created_at).",
          "• Sécurité : Row Level Security (RLS) activée ; lecture publique autorisée pour `workshops`, insertion publique pour `subscribers`.",
        ],
      },
      {
        subtitle: '4.3 Automatisation (n8n)',
        text: [
          "• Scraping planifié des sources cibles et insertion des nouveaux ateliers dans Supabase.",
          "• Génération et envoi du digest email quotidien à 07h00 vers tous les abonnés actifs.",
        ],
      },
      {
        subtitle: "4.4 Variables d'environnement",
        text: [
          "• VITE_SUPABASE_URL – URL du projet Supabase.",
          "• VITE_SUPABASE_ANON_KEY – clé anonyme publique Supabase.",
        ],
      },
    ],
  },
  {
    title: '5. Sources de données',
    content: [
      {
        subtitle: '5.1 Sources intégrées',
        text: [
          "• UNESCO",
          "• Coursera Blog",
          "• eLearning Industry",
          "• The Report by Class Central",
          "• World Heritage Centre – Coming Events",
          "• Et 4+ sources supplémentaires intégrées au fil du temps.",
        ],
      },
    ],
  },
  {
    title: '6. Exigences non-fonctionnelles',
    content: [
      {
        subtitle: '6.1 Performance',
        text: [
          "• Mise en cache des données via TanStack Query (staleTime : 5 minutes).",
          "• Build de production optimisé via Vite (tree-shaking, code splitting).",
        ],
      },
      {
        subtitle: '6.2 Sécurité',
        text: [
          "• Aucune donnée sensible exposée côté client : seule la clé anonyme Supabase est utilisée.",
          "• Variables d'environnement non versionnées (.env ignoré par git).",
          "• Liens externes ouverts avec rel=\"noreferrer\" pour éviter les fuites de référent.",
        ],
      },
      {
        subtitle: '6.3 Maintenabilité',
        text: [
          "• Code source organisé par fonctionnalité : pages/, components/, hooks/, lib/, store/.",
          "• Linting ESLint configuré avec les plugins react-hooks et react-refresh.",
        ],
      },
    ],
  },
  {
    title: '7. Contraintes & livrables',
    content: [
      {
        subtitle: '7.1 Contraintes',
        text: [
          "• L'application est exclusivement frontend ; toute logique serveur passe par Supabase ou n8n.",
          "• Compatibilité navigateurs modernes (Chrome, Firefox, Edge, Safari).",
          "• Responsive design souhaitable pour une utilisation mobile.",
        ],
      },
      {
        subtitle: '7.2 Livrables',
        text: [
          "• Code source versionné sur GitHub (dépôt yassinehaddad438/workshops_digest).",
          "• Application déployable via `npm run build` (sortie dans dist/).",
          "• Présent cahier des charges (PDF téléchargeable depuis l'application).",
        ],
      },
    ],
  },
]

function buildLines(doc, items, x, maxWidth) {
  const lines = []
  if (Array.isArray(items)) {
    items.forEach(item => {
      const wrapped = doc.splitTextToSize(item, maxWidth)
      wrapped.forEach(l => lines.push({ text: l, x }))
      lines.push({ text: '', x })
    })
  } else {
    const wrapped = doc.splitTextToSize(items, maxWidth)
    wrapped.forEach(l => lines.push({ text: l, x }))
    lines.push({ text: '', x })
  }
  return lines
}

export default function CahierDesCharges() {
  const handleDownload = () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const pageW = doc.internal.pageSize.getWidth()
    const pageH = doc.internal.pageSize.getHeight()
    const marginX = 20
    const contentW = pageW - marginX * 2
    let y = 20

    const checkPage = (needed = 8) => {
      if (y + needed > pageH - 15) {
        doc.addPage()
        y = 20
      }
    }

    // Header bar
    doc.setFillColor(10, 37, 64)
    doc.rect(0, 0, pageW, 28, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('Workshop Digest', marginX, 13)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Cahier des Charges', marginX, 21)
    doc.setFontSize(8)
    doc.text(`Document généré le ${new Date().toLocaleDateString('fr-FR')}`, pageW - marginX, 21, { align: 'right' })

    y = 36

    sections.forEach(section => {
      // Section title
      checkPage(12)
      doc.setFillColor(26, 117, 255)
      doc.rect(marginX, y - 5, contentW, 9, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(section.title, marginX + 3, y + 1)
      y += 9

      section.content.forEach(block => {
        checkPage(10)
        // Subtitle
        doc.setTextColor(10, 37, 64)
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.text(block.subtitle, marginX, y + 4)
        y += 8

        // Body text
        doc.setTextColor(50, 50, 50)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        const lines = buildLines(doc, block.text, marginX + 3, contentW - 3)
        lines.forEach(line => {
          checkPage(6)
          doc.text(line.text, line.x, y)
          y += 5
        })
        y += 2
      })

      y += 4
    })

    // Footer on all pages
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setDrawColor(200, 200, 200)
      doc.line(marginX, pageH - 12, pageW - marginX, pageH - 12)
      doc.setTextColor(150, 150, 150)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.text('Workshop Digest – Cahier des Charges', marginX, pageH - 7)
      doc.text(`Page ${i} / ${totalPages}`, pageW - marginX, pageH - 7, { align: 'right' })
    }

    doc.save('cahier-des-charges-workshop-digest.pdf')
  }

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 32px' }}>
      {/* Title block */}
      <div style={{
        background: 'linear-gradient(160deg, #0a2540 0%, #1a3a6e 100%)',
        borderRadius: '12px',
        padding: '40px',
        color: 'white',
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', margin: '0 0 8px' }}>
            Cahier des Charges
          </h1>
          <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
            Workshop Digest – Spécifications du projet
          </p>
        </div>
        <button
          onClick={handleDownload}
          style={{
            background: '#1a75ff',
            color: 'white',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '8px',
            fontFamily: 'sans-serif',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          ⬇ Télécharger PDF
        </button>
      </div>

      {/* Document body */}
      {sections.map((section, si) => (
        <div key={si} style={{ marginBottom: '32px' }}>
          <div style={{
            background: '#0a2540',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            fontFamily: 'sans-serif',
            fontSize: '15px',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            {section.title}
          </div>

          {section.content.map((block, bi) => (
            <div key={bi} style={{ marginBottom: '16px', paddingLeft: '4px' }}>
              <h3 style={{
                fontFamily: 'sans-serif',
                fontSize: '13px',
                color: '#1a75ff',
                margin: '0 0 6px',
                fontWeight: '600'
              }}>
                {block.subtitle}
              </h3>
              {Array.isArray(block.text) ? (
                <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
                  {block.text.map((item, ii) => (
                    <li key={ii} style={{
                      fontFamily: 'sans-serif',
                      fontSize: '13px',
                      color: '#444',
                      lineHeight: '1.7',
                      listStyle: 'none',
                      paddingLeft: '4px'
                    }}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{
                  fontFamily: 'sans-serif',
                  fontSize: '13px',
                  color: '#444',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  {block.text}
                </p>
              )}
            </div>
          ))}
        </div>
      ))}

      <div style={{
        borderTop: '0.5px solid #e0e0e0',
        paddingTop: '20px',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: '12px',
        color: '#999'
      }}>
        Document généré le {new Date().toLocaleDateString('fr-FR')} · Workshop Digest
      </div>
    </div>
  )
}
