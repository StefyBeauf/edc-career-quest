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
  { numero: 1, titre: 'Découvrir le monde professionnel', icon: '🌐' },
  { numero: 2, titre: 'Préparer ses bagages', icon: '🧳' },
  { numero: 3, titre: 'Valider son embarquement', icon: '🎫' },
  { numero: 4, titre: 'Choisir son itinéraire', icon: '🗺️' },
  { numero: 5, titre: 'Passer les contrôles', icon: '🪪' },
  { numero: 6, titre: 'Décollage', icon: '✈️' },
]

function CheckpointNav({ missionNumero }: { missionNumero: number }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {checkpoints.map((cp, index) => {
        const etat = cp.numero < missionNumero ? 'fait' : cp.numero === missionNumero ? 'actif' : 'verrouille'
        const isLast = index === checkpoints.length - 1
        return (
          <div key={cp.numero} className="flex items-center gap-1 flex-shrink-0">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all relative ${
                  etat === 'actif'
                    ? 'ring-2 ring-offset-2'
                    : ''
                }`}
                style={{
                  backgroundColor: etat === 'fait' ? '#c9a84c' : etat === 'actif' ? '#e8c96a' : '#1a2744',
                  color: etat === 'verrouille' ? '#4a5568' : '#0f1e3d',
                  boxShadow: etat === 'actif' ? '0 0 16px rgba(232,201,106,0.5)' : 'none',
                  border: etat === 'verrouille' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}
              >
                {etat === 'fait' ? '✓' : etat === 'verrouille' ? '🔒' : cp.icon}
              </div>
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: etat === 'actif' ? '#e8c96a' : etat === 'fait' ? '#c9a84c' : '#4a5568', fontSize: '9px' }}
              >
                CP{cp.numero}
              </span>
            </div>
            {!isLast && (
              <div
                className="w-4 h-px flex-shrink-0 mt-1"
                style={{ backgroundColor: cp.numero < missionNumero ? '#c9a84c' : 'rgba(255,255,255,0.1)' }}
              />
            )}
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
    <div
      className="min-h-screen"
      style={{
        background: 'radial-gradient(ellipse at 30% 10%, rgba(201,168,76,0.08) 0%, transparent 60%), linear-gradient(180deg, #0f1e3d 0%, #1a2744 60%, #0f1e3d 100%)',
      }}
    >
      {/* World map subtle overlay */}
      <div
        className="fixed inset-0 opacity-3 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Ccircle cx='200' cy='100' r='80' fill='none' stroke='%23c9a84c' stroke-width='0.5'/%3E%3Ccircle cx='200' cy='100' r='50' fill='none' stroke='%23c9a84c' stroke-width='0.5'/%3E%3Cline x1='120' y1='100' x2='280' y2='100' stroke='%23c9a84c' stroke-width='0.3'/%3E%3Cline x1='200' y1='20' x2='200' y2='180' stroke='%23c9a84c' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '600px 300px',
          opacity: 0.04,
        }}
      />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 relative">

        {/* Header passeport */}
        <div className="text-center space-y-3 pt-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: '#c9a84c', color: '#0f1e3d' }}
            >
              ✈
            </div>
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: '#c9a84c' }}
            >
              EDC Career Quest
            </span>
          </div>
          <h1
            className="text-3xl font-black uppercase tracking-widest"
            style={{ color: '#e8c96a', letterSpacing: '0.15em' }}
          >
            Votre Itinéraire
          </h1>
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'rgba(201,168,76,0.6)' }}
          >
            6 CHECKPOINTS · 1 DESTINATION : VOTRE PREMIER STAGE
          </p>
          <p className="text-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>
            {group.name}
          </p>
        </div>

        {/* Navigation checkpoints */}
        <div
          className="rounded-2xl px-5 py-4"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(201,168,76,0.15)',
          }}
        >
          <CheckpointNav missionNumero={missionNumero} />
        </div>

        {/* Boarding pass — mission active */}
        {cpActif && (
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #f5f0e8 0%, #ede6d6 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            {/* En-tête boarding pass */}
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{ backgroundColor: '#0f1e3d' }}
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c9a84c' }}>
                  Boarding Pass
                </p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  VOL EDC-{String(missionNumero).padStart(2, '0')} · PASSEPORT STAGE
                </p>
              </div>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xl"
                style={{ backgroundColor: 'rgba(201,168,76,0.15)' }}
              >
                {cpActif.icon}
              </div>
            </div>

            {/* Corps boarding pass */}
            <div className="px-5 py-4 flex gap-4 items-center">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b5a3a' }}>
                  Checkpoint {missionNumero} / 6
                </p>
                <p className="text-lg font-black uppercase" style={{ color: '#0f1e3d', letterSpacing: '0.03em' }}>
                  {cpActif.titre}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0"
                style={{ backgroundColor: '#0f1e3d', color: '#e8c96a' }}
              >
                {missionNumero}
              </div>
            </div>

            {/* Ligne pointillée */}
            <div className="flex items-center px-3">
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#0f1e3d', marginLeft: '-20px' }}
              />
              <div
                className="flex-1 border-t-2 border-dashed mx-1"
                style={{ borderColor: 'rgba(107,90,58,0.3)' }}
              />
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#0f1e3d', marginRight: '-20px' }}
              />
            </div>

            {/* Pied boarding pass */}
            {mission && (
              <div className="px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#6b5a3a' }}>
                  Mission en cours
                </p>
                <p className="font-bold" style={{ color: '#0f1e3d' }}>{mission.title}</p>
                {mission.description && (
                  <p className="text-sm mt-1" style={{ color: '#6b5a3a' }}>{mission.description}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Contenus de la mission */}
        {contenus.length > 0 && (
          <div className="space-y-3">
            {contenus.map(contenu => (
              <div
                key={contenu.id}
                className="rounded-xl px-4 py-3"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,168,76,0.15)',
                }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: '#c9a84c' }}
                >
                  {contenu.type}
                </span>
                <p className="text-sm mt-1" style={{ color: '#f5f0e8' }}>{contenu.content}</p>
                {contenu.feedback && (
                  <p className="text-xs mt-2 italic" style={{ color: 'rgba(201,168,76,0.6)' }}>{contenu.feedback}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Composant checkpoint */}
        <div>
          {missionNumero === 1 && <CP1_MondeEntreprise />}
          {missionNumero === 2 && <CP2_BasesCV />}
          {missionNumero === 3 && <CP3_RedactionCV />}
          {missionNumero === 4 && <CP4_LectureOffre />}
          {missionNumero === 5 && <CP5_Situations />}
          {missionNumero === 6 && <CP6_RoueEntretiens />}
          {(missionNumero < 1 || missionNumero > 6) && (
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p style={{ color: 'rgba(245,240,232,0.5)' }}>Ce checkpoint n&apos;est pas encore disponible.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
