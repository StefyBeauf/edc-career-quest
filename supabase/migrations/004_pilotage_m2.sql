-- 004 — Pilotage de la Mission 2 B3 Marketing Digital « Marketing Under Pressure »
-- À RELIRE ET EXÉCUTER PAR STÉPHANIE (éditeur SQL Supabase). Non exécuté automatiquement.
--
-- Ces colonnes ne contiennent AUCUNE donnée étudiante : uniquement le pilotage par groupe.
-- Elles ne suppriment ni ne modifient aucune ligne existante (valeurs par défaut neutres).
--   m2_phase2_ouverte : l'intervenante a cliqué sur « Ouvrir la phase 2 ».
--   m2_minutes_bonus  : minutes ajoutées en cumul via « Ajouter du temps » (0 à 60).
--   m2_session        : repère de session ; quand il change (« Fermer la mission »),
--                       chaque navigateur efface sa partie locale.

alter table groups
  add column if not exists m2_phase2_ouverte boolean not null default false,
  add column if not exists m2_minutes_bonus smallint not null default 0
    check (m2_minutes_bonus between 0 and 60),
  add column if not exists m2_session text;
