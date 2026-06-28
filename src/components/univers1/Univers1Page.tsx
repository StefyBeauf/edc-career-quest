import { createClient } from '@/lib/supabase/server'
import { Group, Mission, Content } from '@/types'
import CP1_MondeEntreprise from '@/components/univers1/checkpoints/CP1_MondeEntreprise'
import CP2_BasesCV from '@/components/univers1/checkpoints/CP2_BasesCV'
import CP3_RedactionCV from '@/components/univers1/checkpoints/CP3_RedactionCV'
import CP4_LectureOffre from '@/components/univers1/checkpoints/CP4_LectureOffre'
import CP5_Situations from '@/components/univers1/checkpoints/CP5_Situations'
import CP6_RoueEntretiens from '@/components/univers1/checkpoints/CP6_RoueEntretiens'

interface Props {
  group: Group
}

const checkpoints = [
  { numero: 1, titre: 'Le monde de l\'entreprise', description: 'BtoB, BtoC, BtoBtoC' },
  { numero: 2, titre: 'Les bases du CV', description: 'Ce qui fait la différence' },
  { numero: 3, titre: 'Rédiger son CV', description: 'Structure et formulations' },
  { numero: 4, titre: 'Lire une offre', description: 'Décryptage d\'une fiche de poste' },
  { numero: 5, titre: 'Situations pro', description: 'Comment réagir en stage' },
  { numero: 6, titre: 'Roue des entretiens', description: '100+ questions préparées' },
]

function CheckpointNav({ actif, mission }: { actif: number; mission: number }) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
      {checkpoints.map((cp) => {
        const etat = cp.numero < mission ? 'fait' : cp.numero === mission ? 'actif' : 'verrouille'
        return (
          <div
            key={cp.numero}
            className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              etat === 'actif'
                ? 'bg-sky-500/20 border border-sky-400/30'
                : etat === 'fait'
                ? 'bg-green-500/10 border border-green-400/20'
                : 'bg-white/5 border border-white/10 opacity-40'
            }`}
          >
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              etat === 'actif' ? 'bg-sky-500 text-white' :
              etat === 'fait' ? 'bg-green-500 text-white' :
              'bg-white/10 text-white/50'
            }`}>
              {etat === 'fait' ? '✓' : cp.numero}
            </span>
            <span className={`text-xs font-medium whitespace-nowrap ${
              etat === 'actif' ? 'text-sky-200' :
              etat === 'fait' ? 'text-green-300' :
              'text-white/30'
            }`}>
              CP{cp.numero}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default async function Univers1Page({ group }: Props) {
  const supabase = await createClient()

  const { data: missionData } = await supabase
    .from('missions')
    .select('*')
    .eq('universe', 'passeport-stage')
    .eq('number', group.active_mission)
    .single()

  const mission = missionData as Mission | null

  let contenus: Content[] = []
  if (mission) {
    const { data: contenusData } = await supabase
      .from('contents')
      .select('*')
      .eq('mission_id', mission.id)

    contenus = (contenusData as Content[]) ?? []
  }

  const missionNumero = group.active_mission

  const cpActif = checkpoints.find(cp => cp.numero === missionNumero)

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 via-blue-800 to-indigo-900">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="text-center space-y-2 pt-4">
          <p className="text-sky-400 text-xs font-semibold uppercase tracking-widest">Univers 1</p>
          <h1 className="text-2xl font-bold text-white">Passeport vers le Stage</h1>
          <p className="text-sky-300 text-sm">{group.name}</p>
        </div>

        <CheckpointNav actif={missionNumero} mission={missionNumero} />

        {cpActif && (
          <div className="rounded-2xl bg-white/5 border border-sky-400/20 px-5 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold flex-shrink-0">
              {missionNumero}
            </div>
            <div>
              <p className="text-white font-semibold">{cpActif.titre}</p>
              <p className="text-sky-300 text-sm">{cpActif.description}</p>
            </div>
          </div>
        )}

        {mission && (
          <div className="rounded-2xl bg-indigo-900/30 border border-indigo-400/20 px-5 py-4">
            <p className="text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-1">Mission active</p>
            <p className="text-white font-semibold">{mission.title}</p>
            {mission.description && (
              <p className="text-sky-200 text-sm mt-1">{mission.description}</p>
            )}
          </div>
        )}

        {contenus.length > 0 && (
          <div className="space-y-3">
            {contenus.map(contenu => (
              <div key={contenu.id} className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">{contenu.type}</span>
                <p className="text-sky-100 text-sm mt-1">{contenu.content}</p>
                {contenu.feedback && (
                  <p className="text-indigo-300 text-xs mt-2 italic">{contenu.feedback}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div>
          {missionNumero === 1 && <CP1_MondeEntreprise />}
          {missionNumero === 2 && <CP2_BasesCV />}
          {missionNumero === 3 && <CP3_RedactionCV />}
          {missionNumero === 4 && <CP4_LectureOffre />}
          {missionNumero === 5 && <CP5_Situations />}
          {missionNumero === 6 && <CP6_RoueEntretiens />}
          {(missionNumero < 1 || missionNumero > 6) && (
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center">
              <p className="text-sky-200">Ce checkpoint n&apos;est pas encore disponible.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
