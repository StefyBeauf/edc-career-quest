'use client'

import { useState } from 'react'

const offre = {
  poste: 'Assistant(e) Commercial(e) — Stage 6 mois',
  entreprise: 'TechSolutions SAS',
  localisation: 'Lyon (69) — Présentiel',
  duree: '6 mois à partir de janvier 2025',
  remuneration: 'Gratification légale + tickets restaurant',
  presentation: `TechSolutions SAS est une PME innovante spécialisée dans les solutions logicielles B2B pour les PME industrielles. Fondée en 2012, elle compte aujourd'hui 85 collaborateurs et réalise un chiffre d'affaires de 12 M€. Dans le cadre de notre développement commercial, nous recherchons un(e) assistant(e) commercial(e) dynamique et organisé(e).`,
  missions: [
    'Soutenir l\'équipe commerciale dans le suivi des prospects et clients (CRM Salesforce)',
    'Préparer les devis, offres commerciales et présentations clients',
    'Réaliser une veille concurrentielle mensuelle',
    'Participer aux rendez-vous clients en accompagnement des commerciaux',
    'Mettre à jour les tableaux de bord commerciaux (Excel)',
    'Contribuer à l\'animation des réseaux sociaux professionnels (LinkedIn)',
  ],
  profil: [
    'Étudiant(e) en Bac+2/3 en commerce, gestion ou marketing',
    'Maîtrise du Pack Office (Excel niveau intermédiaire requis)',
    'Première expérience en stage ou alternance appréciée',
    'Anglais niveau B1 minimum (contacts clients occasionnels)',
    'Autonome, rigoureux(se), avec un bon sens du relationnel',
    'Connaissance d\'un CRM (Salesforce ou HubSpot) est un plus',
  ],
}

const annotations = [
  {
    cible: 'solutions logicielles B2B',
    titre: 'Modèle BtoB identifié',
    explication: 'L\'entreprise vend à d\'autres entreprises. En stage, vos clients seront des professionnels, pas des particuliers. Adaptez votre posture en conséquence.',
    categorie: 'contexte',
  },
  {
    cible: 'CRM Salesforce',
    titre: 'Compétence technique nommée',
    explication: 'Salesforce est un logiciel de gestion de la relation client. Même si vous ne le maîtrisez pas, le mentionner dans votre lettre montre que vous avez bien lu l\'offre.',
    categorie: 'competence',
  },
  {
    cible: 'veille concurrentielle mensuelle',
    titre: 'Mission récurrente',
    explication: 'La veille est une mission autonome et régulière. Elle montre que vous devrez être pro-actif(ve) sans qu\'on vous rappelle de le faire.',
    categorie: 'mission',
  },
  {
    cible: 'Excel niveau intermédiaire requis',
    titre: 'Compétence impérative',
    explication: '"Requis" signifie que c\'est non-négociable. Si vous ne maîtrisez pas Excel, formez-vous avant l\'entretien. C\'est un filtre d\'entrée.',
    categorie: 'competence',
  },
  {
    cible: 'Anglais niveau B1 minimum',
    titre: 'Niveau de langue précis',
    explication: 'B1 = niveau intermédiaire (peut tenir une conversation simple). Soyez honnête sur votre niveau dans le CV et en entretien. "Contacts occasionnels" = vous ne serez pas immergé(e) en permanence.',
    categorie: 'competence',
  },
  {
    cible: 'Autonome, rigoureux(se)',
    titre: 'Qualités attendues',
    explication: 'En PME (85 personnes), vous aurez moins d\'encadrement qu\'en grande entreprise. L\'autonomie n\'est pas un bonus : c\'est une exigence. Préparez des exemples concrets d\'autonomie pour l\'entretien.',
    categorie: 'profil',
  },
]

const erreursFrequentes = [
  {
    titre: 'Candidater sans lire l\'offre en entier',
    explication: 'Beaucoup d\'étudiants postulent sur le titre seul. Or l\'offre contient des indices essentiels : secteur, outils, niveau de langue attendu. Une candidature mal ciblée se voit immédiatement.',
  },
  {
    titre: 'Ignorer le profil de l\'entreprise',
    explication: 'Ici : PME de 85 personnes en B2B. Ce contexte change tout : polyvalence attendue, moins de process formalisés, contact direct avec la direction possible. Mentionnez-le dans votre lettre.',
  },
  {
    titre: 'Confondre "apprécié" et "requis"',
    explication: '"Première expérience appréciée" signifie que ce n\'est pas bloquant. "Excel niveau intermédiaire requis" est un filtre. Ne postulez pas si vous ne maîtrisez vraiment pas Excel, ou formez-vous d\'abord.',
  },
  {
    titre: 'Ne pas mentionner les outils cités',
    explication: 'Salesforce, HubSpot, LinkedIn sont nommés. Si vous les connaissez, dites-le dans le CV et la lettre. Si vous ne les connaissez pas, dites que vous êtes prêt(e) à les apprendre rapidement.',
  },
  {
    titre: 'Envoyer le même CV pour toutes les offres',
    explication: 'Le mot-clé "CRM", le secteur "B2B industriel" et la taille "PME" doivent se retrouver dans votre candidature. Un CV générique est reconnu en 5 secondes par un recruteur expérimenté.',
  },
]

const motsCles = ['B2B', 'Salesforce', 'CRM', 'Excel', 'veille concurrentielle', 'LinkedIn', 'autonome', 'rigoureux', 'devis', 'tableau de bord', 'PME', 'commercial']

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
    </div>
  )
}
