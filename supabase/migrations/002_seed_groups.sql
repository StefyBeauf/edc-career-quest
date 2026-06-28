-- Seed des 9 groupes EDC

insert into groups (name, slug, year, universe, track, specialization, active_mission, locked) values
  ('B1 Groupe A',        'b1-groupe-a',        1, 'passeport-stage',            null,       null,          1, false),
  ('B1 Groupe B',        'b1-groupe-b',        1, 'passeport-stage',            null,       null,          1, false),
  ('PGE1 Groupe A',      'pge1-groupe-a',      1, 'passeport-stage',            null,       null,          1, false),
  ('B2 Groupe A',        'b2-groupe-a',        2, 'expedition-professionnelle', 'bachelor2', null,          1, false),
  ('B2 Groupe B',        'b2-groupe-b',        2, 'expedition-professionnelle', 'bachelor2', null,          1, false),
  ('PGE2 Groupe A',      'pge2-groupe-a',      2, 'expedition-professionnelle', 'pge2',     null,          1, false),
  ('B3 Marketing Digital','b3-marketing-digital',3,'mission-horizon',           null,       'marketing',   1, false),
  ('B3 Négociation',     'b3-negociation',     3, 'mission-horizon',            null,       'negociation', 1, false),
  ('B3 Finance',         'b3-finance',         3, 'mission-horizon',            null,       'finance',     1, false)
on conflict (slug) do nothing;
