'use client'

import { useState } from 'react'

const offre = {
  poste: 'Conseiller(ère) de Vente — Stage 6 mois',
  entreprise: 'Maison Dorcel & Fils',
  localisation: 'Paris 8ème (75) — Présentiel',
  duree: '6 mois à partir de janvier 2025',
  remuneration: 'Gratification légale + tickets restaurant + 50 % pass Navigo',
  presentation: `Maison Dorcel & Fils est une enseigne parisienne spécialisée dans la vente de prêt-à-porter masculin haut de gamme, implantée depuis 1987 dans le 8ème arrondissement de Paris. Forte d'une clientèle fidèle de professionnels et de particuliers exigeants, nous recherchons un(e) conseiller(ère) de vente passionné(e) pour renforcer notre équipe pendant la saison printemps-été.`,
  missions: [
    'Accueillir et conseiller la clientèle en boutique avec une approche personnalisée',
    'Identifier les besoins du client et proposer des articles adaptés (techniques de vente conseil)',
    'Réaliser les opérations d\'encaissement et de fidélisation (carte client, suivi CRM)',
    'Participer à la mise en valeur des collections et au merchandising visuel',
    'Gérer les stocks, les réassorts et les retours en lien avec le responsable de rayon',
    'Contribuer à l\'atteinte des objectifs de chiffre d\'affaires et de satisfaction client',
  ],
  profil: [
    'Étudiant(e) en Bac+2/3 en commerce, vente ou management de la distribution',
    'Première expérience en vente ou en contact client appréciée',
    'Excellente présentation et aisance relationnelle indispensables',
    'Goût pour la mode masculine et les environnements haut de gamme',
    'Autonome, souriant(e), avec un vrai sens du service client',
    'Anglais conversationnel apprécié (clientèle internationale ponctuelle)',
  ],
}

const annotations = [
  {
    cible: 'approche personnalisée',
    titre: 'La vente conseil, c\'est quoi ?',
    explication: 'En vente haut de gamme, on ne vend pas un produit : on répond à un besoin. "Approche personnalisée" signifie que vous devez écouter avant de proposer. Préparez des exemples de situations où vous avez adapté votre discours à un interlocuteur.',
    categorie: 'mission',
  },
  {
    cible: 'fidélisation (carte client, suivi CRM)',
    titre: 'CRM mentionné dans une offre de vente',
    explication: 'Même en boutique physique, les enseignes utilisent des outils de gestion client (CRM). Ici, c\'est pour enregistrer les achats, les préférences, et relancer les clients. Si vous connaissez un outil CRM, citez-le dans votre candidature.',
    categorie: 'competence',
  },
  {
    cible: 'merchandising visuel',
    titre: 'Compétence souvent sous-estimée',
    explication: 'Le merchandising, c\'est la mise en scène des produits en boutique. Cela inclut : disposition des articles, facing, signalétique, vitrine. C\'est une vraie compétence à valoriser si vous avez déjà fait de la vente.',
    categorie: 'mission',
  },
  {
    cible: 'Excellente présentation',
    titre: 'Critère impératif en haut de gamme',
    explication: '"Excellente présentation" en contexte haut de gamme signifie : tenue soignée, langage soutenu, posture professionnelle. C\'est un filtre d\'entrée non négociable. Votre tenue en entretien sera observée avec la même attention que vos compétences.',
    categorie: 'profil',
  },
  {
    cible: 'objectifs de chiffre d\'affaires',
    titre: 'Vous aurez des objectifs chiffrés',
    explication: 'Même en stage, vous serez associé(e) aux objectifs de vente. Cela signifie : connaître le panier moyen, savoir proposer des articles complémentaires (vente additionnelle), et participer aux rituels d\'équipe (brief du matin, résultats du jour).',
    categorie: 'mission',
  },
  {
    cible: 'Anglais conversationnel apprécié',
    titre: '"Apprécié" ≠ obligatoire',
    explication: '"Apprécié" signifie que c\'est un plus, pas un filtre. Une clientèle internationale ponctuelle = vous aurez peut-être 2 ou 3 clients étrangers par semaine. Un niveau A2/B1 suffit pour les échanges basiques. Soyez honnête sur votre niveau.',
    categorie: 'competence',
  },
]

const erreursFrequentes = [
  {
    titre: 'Postuler sans connaître l\'enseigne',
    explication: 'Pour un poste en boutique haut de gamme, ne pas connaître la marque se voit immédiatement. Avant l\'entretien : visitez la boutique, regardez les collections, comprenez le positionnement prix. Le recruteur vous demandera forcément "Pourquoi nous ?".',
  },
  {
    titre: 'Parler uniquement de soi, pas du client',
    explication: 'En vente, le recruteur attend que vous parliez du client. "J\'aime les gens" ne suffit pas. Préparez des exemples précis : une situation où vous avez identifié un besoin, proposé une solution adaptée, géré une insatisfaction.',
  },
  {
    titre: 'Ignorer la notion de vente additionnelle',
    explication: 'Une des compétences clés du conseiller de vente est de proposer des produits complémentaires (ceinture + chaussures avec une veste). Si vous ne mentionnez jamais ce concept en entretien, le recruteur doutera de votre connaissance du métier.',
  },
  {
    titre: 'Sous-estimer l\'importance de la présentation',
    explication: 'En boutique de prêt-à-porter haut de gamme, votre apparence est un signal professionnel. Venez en entretien avec une tenue soignée et sobre. Évitez les accessoires trop voyants ou les tenues décontractées.',
  },
  {
    titre: 'Oublier de mentionner les horaires décalés',
    explication: 'Un stage en boutique implique : travail le samedi, parfois les dimanches en période de fêtes, horaires en rotation. Si vous n\'êtes pas disponible ces jours-là, dites-le honnêtement avant de signer. C\'est un critère bloquant.',
  },
]

const motsCles = ['conseiller de vente', 'haut de gamme', 'CRM', 'merchandising', 'fidélisation', 'vente additionnelle', 'chiffre d\'affaires', 'présentation', 'service client', 'Paris', 'prêt-à-porter']

const categorieStyle: Record<string, string> = {
  contexte: 'bg-blue-500/20 text-blue-200 border-blue-400/30',
  competence: 'bg-sky-500/20 text-sky-200 border-sky-400/30',
  mission: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/30',
  profil: 'bg-violet-500/20 text-violet-200 border-violet-400/30',
}

export default function CP4_LectureOffre() {
  const [annotationsOuvertes, setAnnotationsOuvertes] = useState<boolean[]>(Array(annotations.length).fill(false))
  const [erreursOuvertes, setErreursOuvertes] = useState<boolean[]>(Array(erreursFrequentes.length).fill(false))
  const [motsClesActifs, setMotsClesActifs] = useState<boolean>(false)

  function toggleAnnotation(i: number) {
    setAnnotationsOuvertes(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  function toggleErreur(i: number) {
    setErreursOuvertes(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  function highlightText(text: string): React.ReactNode {
    if (!motsClesActifs) return text
    let parts: React.ReactNode[] = [text]
    motsCles.forEach(mot => {
      parts = parts.flatMap((part): React.ReactNode[] => {
        if (typeof part !== 'string') return [part]
        const regex = new RegExp(`(${mot})`, 'gi')
        const splits = part.split(regex)
        return splits.map((s, i) =>
          regex.test(s) ? <mark key={i} className="bg-yellow-400/30 text-yellow-200 rounded px-0.5">{s}</mark> : s
        )
      })
    })
    return <>{parts}</>
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-1">Lire une offre de stage</h2>
        <p className="text-sky-200 text-sm">Décrypter ce que le recruteur cherche vraiment</p>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        <div className="bg-sky-900/50 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-white font-bold text-lg">{offre.poste}</h3>
            <p className="text-sky-300 text-sm">{offre.entreprise} — {offre.localisation}</p>
          </div>
          <button
            onClick={() => setMotsClesActifs(v => !v)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              motsClesActifs
                ? 'bg-yellow-400/30 border border-yellow-400/40 text-yellow-200'
                : 'bg-white/10 border border-white/10 text-sky-200 hover:bg-white/20'
            }`}
          >
            {motsClesActifs ? 'Masquer les mots-clés' : 'Surligner les mots-clés'}
          </button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className="flex gap-4 flex-wrap text-sm">
            <span className="text-sky-300"><span className="text-sky-500">Durée :</span> {offre.duree}</span>
            <span className="text-sky-300"><span className="text-sky-500">Rémunération :</span> {offre.remuneration}</span>
          </div>

          <div>
            <p className="text-sky-400 text-xs uppercase tracking-wider font-semibold mb-2">Présentation de l&apos;entreprise</p>
            <p className="text-sky-100 text-sm leading-relaxed">{highlightText(offre.presentation)}</p>
          </div>

          <div>
            <p className="text-sky-400 text-xs uppercase tracking-wider font-semibold mb-2">Missions</p>
            <ul className="space-y-1">
              {offre.missions.map((m, i) => (
                <li key={i} className="text-sky-100 text-sm flex gap-2">
                  <span className="text-sky-500 mt-0.5">›</span>
                  <span>{highlightText(m)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sky-400 text-xs uppercase tracking-wider font-semibold mb-2">Profil recherché</p>
            <ul className="space-y-1">
              {offre.profil.map((p, i) => (
                <li key={i} className="text-sky-100 text-sm flex gap-2">
                  <span className="text-sky-500 mt-0.5">›</span>
                  <span>{highlightText(p)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest mb-4">Décryptage — Clique pour analyser</p>
        <div className="space-y-2">
          {annotations.map((a, i) => (
            <button
              key={i}
              onClick={() => toggleAnnotation(i)}
              className="w-full text-left rounded-xl border border-white/10 overflow-hidden"
            >
              <div className={`px-4 py-3 transition-colors ${annotationsOuvertes[i] ? 'bg-sky-900/40' : 'bg-white/5 hover:bg-white/10'}`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium ${categorieStyle[a.categorie]}`}>
                      {a.categorie}
                    </span>
                    <span className="text-white text-sm font-medium truncate">"{a.cible}"</span>
                  </div>
                  <span className="text-sky-400 text-lg flex-shrink-0">{annotationsOuvertes[i] ? '−' : '+'}</span>
                </div>
                {annotationsOuvertes[i] && (
                  <div className="mt-3">
                    <p className="text-sky-300 text-xs font-semibold uppercase tracking-wider mb-1">{a.titre}</p>
                    <p className="text-sky-100 text-sm leading-relaxed">{a.explication}</p>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
        <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest mb-4">5 erreurs fréquentes à éviter</p>
        <div className="space-y-2">
          {erreursFrequentes.map((e, i) => (
            <button
              key={i}
              onClick={() => toggleErreur(i)}
              className="w-full text-left rounded-xl border border-white/10 overflow-hidden"
            >
              <div className={`px-4 py-3 transition-colors ${erreursOuvertes[i] ? 'bg-red-900/20' : 'bg-white/5 hover:bg-white/10'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-red-300 text-sm font-medium">Erreur #{i + 1} — {e.titre}</span>
                  <span className="text-red-400 text-lg">{erreursOuvertes[i] ? '−' : '+'}</span>
                </div>
                {erreursOuvertes[i] && (
                  <p className="text-sky-100 text-sm mt-2 leading-relaxed">{e.explication}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <QuizOffre />
    </div>
  )
}

const quizQuestions = [
  {
    question: 'Dans l\'offre, "Anglais conversationnel apprécié" signifie :',
    options: [
      'C\'est un critère bloquant, sans anglais inutile de postuler',
      'C\'est un plus, mais ce n\'est pas éliminatoire',
      'Il faut un niveau bilingue obligatoire',
    ],
    bonne: 1,
    explication: '"Apprécié" = un plus qui valorise la candidature, mais ce n\'est jamais un filtre d\'entrée contrairement à "requis" ou "indispensable".',
  },
  {
    question: 'Quel élément de l\'offre est un critère bloquant pour postuler ?',
    options: [
      'Ne pas connaître la marque avant l\'entretien',
      'Ne pas être disponible le samedi',
      'Ne pas savoir utiliser un CRM',
    ],
    bonne: 1,
    explication: 'Le travail en boutique implique des horaires décalés (samedi, dimanches en période de fêtes). Si vous n\'êtes pas disponible, c\'est rédhibitoire — contrairement à la connaissance d\'un CRM, qui peut s\'apprendre.',
  },
  {
    question: 'Qu\'est-ce que la "vente additionnelle" mentionnée dans le décryptage ?',
    options: [
      'Vendre uniquement les articles en promotion',
      'Proposer un article complémentaire à l\'achat principal du client',
      'Augmenter les prix en fin de saison',
    ],
    bonne: 1,
    explication: 'C\'est une compétence clé du conseiller de vente : proposer une ceinture ou des chaussures avec une veste, par exemple. En parler en entretien montre que vous connaissez le métier.',
  },
  {
    question: 'Avant un entretien pour ce poste, la meilleure préparation est de :',
    options: [
      'Apprendre par cœur une présentation générique de soi',
      'Visiter la boutique et comprendre le positionnement de la marque',
      'Préparer uniquement des questions sur le salaire',
    ],
    bonne: 1,
    explication: 'Pour un poste en boutique haut de gamme, ne pas connaître l\'enseigne se voit immédiatement. Le recruteur attend que vous ayez visité le lieu et comprenne le positionnement prix.',
  },
  {
    question: 'Dans votre candidature, quel mot-clé de l\'offre est le plus important à reprendre ?',
    options: [
      'Un mot générique comme "motivé" ou "dynamique"',
      'Un terme précis de l\'offre comme "conseiller de vente" ou "merchandising"',
      'Le nom de votre établissement scolaire',
    ],
    bonne: 1,
    explication: 'Reprendre les mots-clés exacts de l\'offre (conseiller de vente, merchandising, fidélisation) montre que vous avez ciblé votre candidature. Un recruteur expérimenté repère un CV générique en 5 secondes.',
  },
]

function QuizOffre() {
  const [reponses, setReponses] = useState<(number | null)[]>(Array(quizQuestions.length).fill(null))
  const [valide, setValide] = useState(false)

  function choisir(qIndex: number, oIndex: number) {
    if (valide) return
    setReponses(prev => prev.map((v, i) => i === qIndex ? oIndex : v))
  }

  const score = reponses.reduce((acc: number, r, i) => acc + (r === quizQuestions[i].bonne ? 1 : 0), 0)
  const toutesRepondues = reponses.every(r => r !== null)

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
      <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest mb-1">Quiz — As-tu bien compris ?</p>
      <p className="text-sky-200 text-sm mb-4">Vérifie ta compréhension de l&apos;analyse d&apos;une offre de stage.</p>

      <div className="space-y-5">
        {quizQuestions.map((q, qi) => (
          <div key={qi} className="space-y-2">
            <p className="text-white text-sm font-medium">{qi + 1}. {q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const estChoisie = reponses[qi] === oi
                const estBonne = oi === q.bonne
                let style = 'bg-white/5 border-white/10 text-sky-100 hover:bg-white/10'
                if (valide) {
                  if (estBonne) style = 'bg-green-500/15 border-green-400/40 text-green-200'
                  else if (estChoisie) style = 'bg-red-500/15 border-red-400/40 text-red-200'
                  else style = 'bg-white/5 border-white/5 text-sky-100/40'
                } else if (estChoisie) {
                  style = 'bg-sky-500/15 border-sky-400/40 text-white'
                }
                return (
                  <button
                    key={oi}
                    onClick={() => choisir(qi, oi)}
                    className={`w-full text-left rounded-xl border px-4 py-2.5 text-sm transition-all ${style}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
            {valide && (
              <p className="text-sky-300 text-xs mt-1 leading-relaxed">{q.explication}</p>
            )}
          </div>
        ))}
      </div>

      {!valide ? (
        <button
          onClick={() => setValide(true)}
          disabled={!toutesRepondues}
          className="w-full mt-5 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-sky-500 text-white hover:bg-sky-400"
        >
          Valider mes réponses
        </button>
      ) : (
        <div className="mt-5 rounded-xl bg-white/5 border border-white/10 p-4 text-center">
          <p className="text-white font-bold text-lg">{score} / {quizQuestions.length}</p>
          <p className="text-sky-300 text-sm mt-1">
            {score === quizQuestions.length ? 'Parfait, tu maîtrises la lecture d\'offre !' : score >= 3 ? 'Bonne compréhension, relis les explications ci-dessus.' : 'Relis le décryptage de l\'offre puis retente le quiz.'}
          </p>
        </div>
      )}
    </div>
  )
}
