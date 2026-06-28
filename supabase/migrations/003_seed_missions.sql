-- Seed des missions — Univers 1 : Passeport vers le Stage

insert into missions (universe, number, title, description, unlocked_for) values
  ('passeport-stage', 1, 'Le Monde de l''Entreprise', 'Découvrir l''écosystème BtoB et BtoC, identifier les types d''entreprises et comprendre leur fonctionnement.', '{"b1-groupe-a","b1-groupe-b","pge1-groupe-a"}'),
  ('passeport-stage', 2, 'Mon CV, Mon Ambassadeur', 'Maîtriser les fondamentaux d''un CV percutant : structure, formulations, erreurs à éviter.', '{"b1-groupe-a","b1-groupe-b","pge1-groupe-a"}'),
  ('passeport-stage', 3, 'Rédiger et Envoyer', 'Passer à l''action : rédiger son CV, son accroche, sa lettre de motivation et vérifier avant envoi.', '{"b1-groupe-a","b1-groupe-b","pge1-groupe-a"}'),
  ('passeport-stage', 4, 'Décrypter une Offre', 'Apprendre à lire une offre de stage : décoder les missions, identifier les compétences requises, repérer les pièges.', '{"b1-groupe-a","b1-groupe-b","pge1-groupe-a"}'),
  ('passeport-stage', 5, 'Situations Professionnelles', 'S''entraîner sur 50+ situations réelles : que feriez-vous si… ? Développer ses réflexes professionnels.', '{"b1-groupe-a","b1-groupe-b","pge1-groupe-a"}'),
  ('passeport-stage', 6, 'La Roue des Entretiens', 'Préparer et maîtriser les 100+ questions d''entretien les plus fréquentes avec méthode.', '{"b1-groupe-a","b1-groupe-b","pge1-groupe-a"}');

-- Seed des missions — Univers 2 : Expédition Professionnelle

insert into missions (universe, number, title, description, unlocked_for) values
  ('expedition-professionnelle', 1, 'Identité Professionnelle', 'Clarifier ses valeurs, compétences et positionnement professionnel.', '{"bachelor2","pge2"}'),
  ('expedition-professionnelle', 2, 'Réseau & Personal Branding', 'Construire et activer son réseau professionnel, soigner son image en ligne.', '{"bachelor2","pge2"}'),
  ('expedition-professionnelle', 3, 'Stratégie de Recherche', 'Définir sa stratégie de recherche de stage ou d''alternance et l''exécuter.', '{"bachelor2","pge2"}'),
  ('expedition-professionnelle', 4, 'Négociation & Closing', 'Maîtriser la négociation : offre d''emploi, salaire, conditions, contrat.', '{"pge2"}'),
  ('expedition-professionnelle', 5, 'Leadership & Management', 'Développer ses soft skills de leadership pour évoluer dans l''entreprise.', '{"pge2"}'),
  ('expedition-professionnelle', 6, 'Vision Long Terme', 'Construire sa trajectoire professionnelle sur 3-5 ans et anticiper les évolutions.', '{"pge2"}');

-- Seed des missions — Univers 3 : Mission Horizon

insert into missions (universe, number, title, description, unlocked_for) values
  ('mission-horizon', 1, 'Lancement de Produit', 'Piloter le lancement d''un nouveau produit/service dans un environnement sous pression.', '{"marketing","negociation","finance"}'),
  ('mission-horizon', 2, 'Crise & Gestion d''Urgence', 'Gérer une crise imprévue qui menace l''activité : décisions rapides et communication de crise.', '{"marketing","negociation","finance"}'),
  ('mission-horizon', 3, 'Négociation Stratégique', 'Conduire une négociation à fort enjeu avec plusieurs parties prenantes.', '{"marketing","negociation","finance"}'),
  ('mission-horizon', 4, 'Transformation Digitale', 'Piloter un projet de transformation numérique avec résistances internes.', '{"marketing","negociation","finance"}'),
  ('mission-horizon', 5, 'Fusion & Acquisition', 'Accompagner une opération de croissance externe et gérer l''intégration.', '{"marketing","negociation","finance"}'),
  ('mission-horizon', 6, 'Mission Internationale', 'Développer un marché à l''international avec contraintes culturelles et réglementaires.', '{"marketing","negociation","finance"}');
