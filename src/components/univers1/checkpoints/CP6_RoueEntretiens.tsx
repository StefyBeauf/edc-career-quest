'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import ModeBadge from '../shared/ModeBadge'

// ─── Thèmes de préparation à la recherche de stage de fin de 1ère année ───
type Theme = 'experiences' | 'formations' | 'disponibilite' | 'personnalite' | 'langues' | 'informatique'

interface CarteTheme {
  question: string
  conseilReponse: string
  aEviter: string
  bonneAmorce: string
}

const themeStyle: Record<Theme, { label: string; hex: string }> = {
  experiences: { label: 'Expériences', hex: '#c9a84c' },
  formations: { label: 'Formations', hex: '#60a5fa' },
  disponibilite: { label: 'Disponibilité', hex: '#fbbf24' },
  personnalite: { label: 'Personnalité', hex: '#34d399' },
  langues: { label: 'Langues', hex: '#f472b6' },
  informatique: { label: 'Informatique', hex: '#a78bfa' },
}

const TOUS_THEMES: Theme[] = ['experiences', 'formations', 'disponibilite', 'personnalite', 'langues', 'informatique']

const cartes: Record<Theme, CarteTheme[]> = {
  experiences: [
    { question: 'Quelle a été votre première expérience professionnelle marquante (job d\'été, stage, bénévolat) ?', conseilReponse: 'Racontez une expérience concrète avec un début, un défi et un apprentissage. La méthode STAR (Situation, Tâche, Action, Résultat) est idéale.', aEviter: 'Choisir une expérience banale ou en parler de façon trop vague, sans exemple précis.', bonneAmorce: 'Lors de mon expérience chez [X], j\'ai dû faire face à [situation] et voici ce que j\'ai appris…' },
    { question: 'Vous n\'avez pas encore d\'expérience professionnelle longue : comment valorisez-vous vos jobs d\'été ou projets associatifs ?', conseilReponse: 'Même une expérience courte se valorise avec des missions concrètes et un résultat, plutôt qu\'une simple mention de dates.', aEviter: '« Je n\'ai pas vraiment d\'expérience » sans rien proposer d\'autre.', bonneAmorce: 'Même si mes expériences sont courtes, j\'ai pu développer [compétence] lors de…' },
    { question: 'Avez-vous des expériences de travail en équipe à mettre en avant ?', conseilReponse: 'Donnez un exemple concret, expliquez votre rôle dans l\'équipe et le résultat obtenu.', aEviter: '« Oui, souvent » sans donner de détails ou d\'exemple précis.', bonneAmorce: 'Lors de [projet], nous étions [nombre] et mon rôle était de… ce qui a permis de…' },
    { question: 'Parlez-moi d\'une réussite dont vous êtes fier(e).', conseilReponse: 'Utilisez la méthode STAR et montrez votre apport personnel, même dans un projet collectif.', aEviter: 'Choisir une réussite collective sans mettre en valeur votre rôle propre.', bonneAmorce: 'Un moment dont je suis fier(e) est lorsque j\'ai [action], ce qui a permis [résultat concret]…' },
    { question: 'Quel a été votre plus grand défi académique jusqu\'ici ?', conseilReponse: 'Choisissez un défi réel, montrez comment vous l\'avez surmonté et ce que vous en avez retenu.', aEviter: 'Un défi trop banal ou présenté sans réflexion sur ce qu\'il vous a appris.', bonneAmorce: 'Le plus grand défi académique a été [situation]. Ce que j\'ai fait pour y faire face, c\'est…' },
  ],
  formations: [
    { question: 'Pourquoi avez-vous choisi cette formation ?', conseilReponse: 'Expliquez votre parcours de façon logique et cohérente. Mettez en avant ce que la formation vous a apporté.', aEviter: '« Par défaut » ou parce que c\'était la formation la plus accessible.', bonneAmorce: 'J\'ai choisi cette formation car elle correspondait à mon projet de… et me permettait de développer…' },
    { question: 'Qu\'avez-vous appris de concret dans votre formation qui sera utile pour ce stage ?', conseilReponse: 'Reliez une compétence précise du programme (cours, projet, méthode) à une mission probable du stage visé.', aEviter: 'Réciter le programme de la formation sans faire le lien avec le poste.', bonneAmorce: 'Ma formation m\'a permis de développer [compétence], que je pourrai mobiliser pour…' },
    { question: 'Pourquoi avoir choisi votre école pour ce parcours ?', conseilReponse: 'Expliquez un choix cohérent avec votre projet (spécialisation, réputation, pédagogie), pas seulement la proximité.', aEviter: '« C\'était l\'école la plus proche » ou « je n\'ai pas eu d\'autre choix ».', bonneAmorce: 'J\'ai choisi cette école parce que son programme met l\'accent sur…' },
    { question: 'En quoi votre première année de formation vous a-t-elle préparé(e) à un premier stage ?', conseilReponse: 'Citez 2 à 3 acquis concrets (méthode de travail, notions clés, travail en groupe) directement transférables en entreprise.', aEviter: 'Une réponse vague du type « j\'ai beaucoup appris » sans rien de concret.', bonneAmorce: 'Cette première année m\'a surtout appris à [compétence], ce qui sera utile pour…' },
  ],
  disponibilite: [
    { question: 'Quelles sont vos disponibilités pour ce stage ?', conseilReponse: 'Indiquez des dates précises (début, fin, durée) cohérentes avec votre calendrier académique. Soyez au clair avant l\'entretien.', aEviter: 'Rester flou : « Je ne sais pas trop encore » sans avoir vérifié son calendrier de cours.', bonneAmorce: 'Je suis disponible du [date] au [date], ce qui correspond à la durée que vous recherchez.' },
    { question: 'Le stage démarre en pleine période d\'examens partiels : comment l\'anticipez-vous ?', conseilReponse: 'Montrez que vous avez déjà réfléchi à l\'organisation possible (revoir le calendrier, en parler tôt avec l\'école ou l\'entreprise).', aEviter: 'Dire que ce ne sera « pas un problème » sans expliquer comment vous comptez vous organiser.', bonneAmorce: 'J\'ai vérifié mon calendrier d\'examens et je peux en parler avec mon école pour organiser…' },
    { question: 'Pouvez-vous vous engager sur la durée complète du stage demandée ?', conseilReponse: 'Confirmez clairement votre engagement, ou soyez honnête tout de suite si une contrainte existe (ex. reprise des cours).', aEviter: 'Vous engager sans vérifier votre calendrier, au risque de devoir écourter le stage plus tard.', bonneAmorce: 'Oui, je peux m\'engager sur toute la durée prévue, mes cours reprenant seulement le [date].' },
    { question: 'Êtes-vous disponible à temps plein ou avez-vous des contraintes (cours, alternance) à signaler ?', conseilReponse: 'Soyez transparent(e) dès l\'entretien sur toute contrainte de temps, plutôt que de la découvrir après signature.', aEviter: 'Cacher une contrainte connue pour ne pas « effrayer » le recruteur.', bonneAmorce: 'Je suis disponible à temps plein, à l\'exception de [contrainte], que je signale dès maintenant.' },
  ],
  personnalite: [
    { question: 'Comment vous décrirait votre meilleur(e) ami(e) en 3 mots ?', conseilReponse: 'Choisissez des qualités cohérentes avec votre profil professionnel et soyez prêt(e) à les illustrer par un exemple.', aEviter: 'Des qualités trop superficielles (« sympa, cool, rigolo ») ou incohérentes avec le poste.', bonneAmorce: 'Il/elle dirait que je suis [mot 1], [mot 2] et [mot 3], ce qui se reflète dans [exemple concret]…' },
    { question: 'Décrivez votre style de communication.', conseilReponse: 'Mentionnez des qualités comme l\'écoute, la clarté ou l\'adaptation au contexte, illustrées par un exemple.', aEviter: '« Je m\'adapte » sans aucun exemple concret pour l\'illustrer.', bonneAmorce: 'Je dirais que je suis [direct / à l\'écoute / structuré] dans ma communication. Par exemple, lors de…' },
    { question: 'Comment réagissez-vous face à un changement inattendu ?', conseilReponse: 'Montrez que vous êtes adaptable sans paraître opportuniste : donnez un exemple vécu.', aEviter: '« Cela m\'angoisse » sans rien de constructif, ou prétendre être parfaitement zen en toutes circonstances.', bonneAmorce: 'Face à un changement inattendu comme [situation], j\'essaie d\'abord de… puis de…' },
    { question: 'Comment réagissez-vous quand vous recevez une critique ?', conseilReponse: 'Montrez que vous écoutez, prenez du recul, et tirez des leçons de la critique reçue.', aEviter: '« Je ne prends pas bien la critique » ou « je suis très sensible » sans rien pour compenser.', bonneAmorce: 'Quand je reçois une critique, je prends d\'abord le temps d\'écouter sans réagir à chaud, puis je…' },
    { question: 'Quels sont vos centres d\'intérêt en dehors des études ?', conseilReponse: 'Choisissez des activités qui reflètent des qualités transférables : leadership, créativité, discipline, esprit d\'équipe.', aEviter: '« Regarder des séries » sans plus de précision, ou ne pas savoir quoi répondre.', bonneAmorce: 'En dehors des études, je pratique [activité], qui m\'apprend [compétence] applicable aussi en entreprise.' },
  ],
  langues: [
    { question: 'Quel est votre niveau dans les langues étrangères que vous parlez ?', conseilReponse: 'Indiquez un niveau réel et vérifiable (scolaire, courant, professionnel) plutôt qu\'une estimation optimiste.', aEviter: 'Annoncer un niveau bilingue sans pouvoir le confirmer si le recruteur bascule la conversation en anglais.', bonneAmorce: 'J\'ai un niveau [scolaire / courant / professionnel] en anglais, que j\'ai pu pratiquer lors de…' },
    { question: 'Avez-vous déjà utilisé une langue étrangère dans un contexte professionnel ou académique ?', conseilReponse: 'Citez un exemple concret : cours en langue étrangère, échange, job avec clientèle internationale.', aEviter: 'Répondre non sans chercher une expérience proche (voyage, projet scolaire en langue étrangère…).', bonneAmorce: 'Oui, lors de [expérience], j\'ai dû échanger en [langue] pour…' },
    { question: 'Comment continuez-vous à progresser dans une langue étrangère en dehors des cours ?', conseilReponse: 'Mentionnez des pratiques concrètes : séries en VO, podcasts, échanges linguistiques, lecture.', aEviter: '« Je ne fais rien de particulier » alors qu\'on vous demande de montrer votre motivation à progresser.', bonneAmorce: 'Je pratique régulièrement en [méthode concrète], ce qui m\'aide à progresser en dehors des cours.' },
  ],
  informatique: [
    { question: 'Quelles sont vos compétences numériques ?', conseilReponse: 'Citez des outils maîtrisés (Excel, PowerPoint, CRM, outils de gestion…) en précisant votre niveau réel.', aEviter: '« Je maîtrise tous les outils » sans précision, ou mentir sur votre niveau réel.', bonneAmorce: 'Je suis à l\'aise avec [outil], que j\'utilise pour [usage], et j\'apprends actuellement…' },
    { question: 'Maîtrisez-vous les outils bureautiques de base (Excel, PowerPoint) ? À quel niveau ?', conseilReponse: 'Donnez un niveau honnête et un exemple d\'usage concret (tableaux, présentation, mise en forme de données).', aEviter: 'Survendre son niveau Excel alors qu\'on ne maîtrise que les bases.', bonneAmorce: 'Je maîtrise les bases d\'Excel (tableaux, formules simples) et je progresse sur [fonction plus avancée].' },
    { question: 'Avez-vous déjà utilisé des outils d\'intelligence artificielle dans vos études ? Lesquels et pour quoi faire ?', conseilReponse: 'Montrez un usage réfléchi et honnête : aide à la recherche, reformulation, brouillon — jamais un rendu final non vérifié.', aEviter: 'Prétendre ne jamais utiliser l\'IA, ou au contraire dire qu\'on lui délègue tout sans relecture.', bonneAmorce: 'J\'utilise [outil IA] pour [usage précis], en vérifiant et en adaptant toujours le résultat moi-même.' },
    { question: 'Êtes-vous à l\'aise avec les chiffres et l\'analyse de données ?', conseilReponse: 'Soyez honnête sur votre niveau et donnez un exemple concret si vous êtes à l\'aise.', aEviter: '« Pas vraiment » sans montrer d\'envie d\'apprendre, ou surestimer ses compétences.', bonneAmorce: 'J\'ai déjà travaillé sur [type de données] avec [outil], ce qui m\'a permis de [résultat].' },
  ],
}

// ─── Roue canvas — 6 secteurs, un par thème ───
function Roue({ onResultat }: { onResultat: (theme: Theme, carte: CarteTheme) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tourne, setTourne] = useState(false)
  const [angle, setAngle] = useState(0)
  const animRef = useRef<number | null>(null)
  const secteurs = TOUS_THEMES.length
  const angleParSecteur = (2 * Math.PI) / secteurs
  const secteurColors = TOUS_THEMES.map(t => themeStyle[t].hex)

  const drawWheel = useCallback((currentAngle: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const r = cx - 6

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(cx, cy, r + 4, 0, 2 * Math.PI)
    ctx.fillStyle = '#0f1e3d'
    ctx.fill()
    ctx.strokeStyle = 'rgba(201,168,76,0.4)'
    ctx.lineWidth = 2
    ctx.stroke()

    for (let i = 0; i < secteurs; i++) {
      const start = currentAngle + i * angleParSecteur
      const end = start + angleParSecteur
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, start, end)
      ctx.closePath()
      const midAngle = start + angleParSecteur / 2
      const gx = cx + Math.cos(midAngle) * r * 0.5
      const gy = cy + Math.sin(midAngle) * r * 0.5
      const grad = ctx.createRadialGradient(gx, gy, 0, cx, cy, r)
      grad.addColorStop(0, secteurColors[i] + 'cc')
      grad.addColorStop(1, secteurColors[i] + '44')
      ctx.fillStyle = grad
      ctx.fill()
      ctx.strokeStyle = 'rgba(15,30,61,0.8)'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(start + angleParSecteur / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = '#0f1e3d'
      ctx.font = 'bold 10px system-ui'
      ctx.fillText(themeStyle[TOUS_THEMES[i]].label, r - 10, 4)
      ctx.restore()
    }

    ctx.beginPath()
    ctx.arc(cx, cy, 24, 0, 2 * Math.PI)
    const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 24)
    centerGrad.addColorStop(0, '#e8c96a')
    centerGrad.addColorStop(1, '#c9a84c')
    ctx.fillStyle = centerGrad
    ctx.fill()
    ctx.strokeStyle = '#0f1e3d'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = '#0f1e3d'
    ctx.font = 'bold 14px system-ui'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('N', cx, cy)
  }, [secteurs, angleParSecteur, secteurColors])

  useEffect(() => { drawWheel(angle) }, [angle, drawWheel])
  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current) }, [])

  function lancer() {
    if (tourne) return
    setTourne(true)

    const theme = TOUS_THEMES[Math.floor(Math.random() * TOUS_THEMES.length)]
    const pool = cartes[theme]
    const carte = pool[Math.floor(Math.random() * pool.length)]

    const tours = 4 + Math.random() * 3
    const finalAngle = angle + tours * 2 * Math.PI
    const duration = 2200
    const start = performance.now()
    const startAngle = angle

    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startAngle + (finalAngle - startAngle) * eased
      setAngle(current)
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        setAngle(finalAngle % (2 * Math.PI))
        setTourne(false)
        onResultat(theme, carte)
      }
    }
    animRef.current = requestAnimationFrame(animate)
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        <div className="absolute top-1/2 -right-3 z-10" style={{ transform: 'translateY(-50%)', width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: '20px solid #e8c96a', filter: 'drop-shadow(0 0 6px rgba(232,201,106,0.5))' }} />
        <canvas ref={canvasRef} width={260} height={260} className="rounded-full" style={{ display: 'block', boxShadow: '0 0 40px rgba(201,168,76,0.15), 0 8px 32px rgba(0,0,0,0.4)' }} />
      </div>
      <button onClick={lancer} disabled={tourne} className="px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all"
        style={{ backgroundColor: tourne ? 'rgba(201,168,76,0.3)' : '#c9a84c', color: tourne ? 'rgba(245,240,232,0.5)' : '#0f1e3d', cursor: tourne ? 'wait' : 'pointer' }}>
        {tourne ? 'La roue tourne…' : 'Faire tourner la roue'}
      </button>
    </div>
  )
}

function QuestionCard({ theme, carte }: { theme: Theme; carte: CarteTheme }) {
  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="px-5 py-4" style={{ backgroundColor: '#080f20', borderBottom: `2px solid ${themeStyle[theme].hex}` }}>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: themeStyle[theme].hex }}>{themeStyle[theme].label}</p>
        <p className="text-base font-bold mt-1" style={{ color: '#f5f0e8' }}>{carte.question}</p>
      </div>
    </div>
  )
}

function ConseilPanel({ carte }: { carte: CarteTheme }) {
  return (
    <div className="rounded-2xl overflow-hidden divide-y" style={{ backgroundColor: 'rgba(15,30,61,0.95)', border: '1px solid rgba(255,255,255,0.08)', '--tw-divide-color': 'rgba(255,255,255,0.05)' } as React.CSSProperties}>
      <div className="px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>✈ Conseil de réponse</p>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>{carte.conseilReponse}</p>
      </div>
      <div className="px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#fca5a5' }}>✗ À éviter</p>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>{carte.aEviter}</p>
      </div>
      <div className="px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#6ee7b7' }}>✓ Bonne amorce</p>
        <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(245,240,232,0.75)' }}>{carte.bonneAmorce}</p>
      </div>
    </div>
  )
}

export default function CP6_RoueEntretiens() {
  const [tirages, setTirages] = useState<{ theme: Theme; carte: CarteTheme }[]>([])
  const [reponseTentative, setReponseTentative] = useState('')
  const [reponseRevelee, setReponseRevelee] = useState(false)

  const dernierTirage = tirages[tirages.length - 1] ?? null

  function nouveauTirage(theme: Theme, carte: CarteTheme) {
    setTirages(prev => [...prev, { theme, carte }])
    setReponseTentative('')
    setReponseRevelee(false)
  }

  return (
    <div className="space-y-5">

      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>
          Checkpoint 6 — Décollage
        </p>
        <h2 className="text-xl font-black text-white uppercase tracking-wide">Entretien de stage</h2>
        <p className="text-sm mt-1" style={{ color: 'rgba(245,240,232,0.5)' }}>
          Tour de contrôle — préparez votre recherche de stage de fin de 1ère année
        </p>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-white">Roue de l&apos;entretien</h3>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.45)' }}>
            Faites tourner la roue en équipage, proposez votre réponse, puis découvrez le conseil.
          </p>
        </div>
        <ModeBadge mode="cdb" />
      </div>

      <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <Roue onResultat={nouveauTirage} />
      </div>

      {dernierTirage && (
        <div className="space-y-4">
          <QuestionCard theme={dernierTirage.theme} carte={dernierTirage.carte} />

          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>Votre réponse (à l&apos;oral, résumée ici)</p>
            <textarea
              value={reponseTentative}
              onChange={e => setReponseTentative(e.target.value)}
              disabled={reponseRevelee}
              rows={3}
              placeholder="Un membre de l'équipage répond à voix haute, le reste du groupe résume ici avant de voir le conseil…"
              className="w-full rounded-lg p-2.5 text-sm bg-transparent resize-none outline-none disabled:opacity-60"
              style={{ color: 'rgba(245,240,232,0.85)', border: '1px solid rgba(201,168,76,0.2)' }}
            />
          </div>

          {!reponseRevelee ? (
            <button onClick={() => setReponseRevelee(true)} className="w-full py-3 rounded-xl font-black uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d080)', color: '#0f1e3d' }}>
              Voir le conseil de réponse →
            </button>
          ) : (
            <ConseilPanel carte={dernierTirage.carte} />
          )}
        </div>
      )}
    </div>
  )
}
