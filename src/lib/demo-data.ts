// Demo data for the POC - Sample Tunisian legal documents

export const demoDocuments = [
  {
    id: "doc-constitution-2022",
    type: "constitution" as const,
    numero: "2022",
    titreAr: "دستور الجمهورية التونسية 2022",
    titreFr: "Constitution de la République Tunisienne 2022",
    titreEn: "Constitution of the Tunisian Republic 2022",
    datePublication: new Date("2022-08-17"),
    dateApplication: new Date("2022-08-17"),
    jortNumero: "100",
    jortAnnee: 2022,
    jortPage: 2413,
    domaines: ["droit_constitutionnel"],
    ministere: null,
    contenuAr: `الباب الأول: أحكام عامة
الفصل الأول: تونس دولة حرة، مستقلة، ذات سيادة، الإسلام دينها، والعربية لغتها، والجمهورية نظامها.
الفصل الثاني: تونس دولة مدنية، تقوم على المواطنة وإرادة الشعب وعلوية القانون.
الفصل الثالث: الشعب هو صاحب السيادة، يمارسها عبر ممثليه المنتخبين أو عبر الاستفتاء.
الفصل الرابع: علم الجمهورية التونسية أحمر، تتوسطه دائرة بيضاء بها نجم ذو خمسة أشعة يحيط به هلال أحمر.
الفصل الخامس: الجمهورية التونسية جزء من الأمة العربية والإسلامية.

الباب الثاني: الحقوق والحريات
الفصل السادس والعشرون: الحق في الملكية مضمون، ويُمارَس في حدود القانون.
الفصل السابع والعشرون: الحق النقابي، بما في ذلك حق الإضراب، مضمون.`,
    contenuFr: `Titre Premier : Dispositions Générales
Article Premier : La Tunisie est un État libre, indépendant et souverain ; sa religion est l'Islam, sa langue est l'arabe et son régime est la République.
Article 2 : La Tunisie est un État civil, fondé sur la citoyenneté, la volonté du peuple et la primauté du droit.
Article 3 : Le peuple est le détenteur de la souveraineté qu'il exerce par ses représentants élus ou par voie de référendum.
Article 4 : Le drapeau de la République Tunisienne est rouge, il comporte en son milieu un cercle blanc où figure une étoile à cinq branches entourée d'un croissant rouge.
Article 5 : La République Tunisienne fait partie de la Nation arabe et islamique.

Titre II : Des droits et libertés
Article 26 : Le droit de propriété est garanti et s'exerce dans les limites de la loi.
Article 27 : Le droit syndical, y compris le droit de grève, est garanti.`,
    contenuEn: `Title One: General Provisions
Article 1: Tunisia is a free, independent, and sovereign state; Islam is its religion, Arabic is its language, and it is a Republic.
Article 2: Tunisia is a civil state based on citizenship, the will of the people, and the supremacy of law.
Article 3: The people are the holders of sovereignty, which they exercise through their elected representatives or by referendum.
Article 4: The flag of the Tunisian Republic is red and bears in its center a white circle containing a five-pointed star surrounded by a red crescent.
Article 5: The Tunisian Republic is part of the Arab and Islamic Nation.

Title Two: Rights and Freedoms
Article 26: The right to property is guaranteed and is exercised within the limits of the law.
Article 27: The right to unionize, including the right to strike, is guaranteed.`,
    resumeAr: "دستور الجمهورية التونسية الصادر في 2022 يحدد الأسس السياسية والقانونية للدولة التونسية ويضمن الحقوق والحريات الأساسية للمواطنين.",
    resumeFr: "La Constitution de la République Tunisienne de 2022 définit les fondements politiques et juridiques de l'État tunisien et garantit les droits et libertés fondamentaux des citoyens.",
    resumeEn: "The 2022 Constitution of the Tunisian Republic defines the political and legal foundations of the Tunisian state and guarantees the fundamental rights and freedoms of citizens.",
    pdfOriginal: "/documents/constitution-2022.pdf",
    pdfConsolide: null,
    motsCles: ["constitution", "droits fondamentaux", "libertés", "souveraineté", "République"],
    statut: "en_vigueur" as const
  },
  {
    id: "doc-loi-2014-fonction-publique",
    type: "loi" as const,
    numero: "2014-54",
    titreAr: "قانون عدد 54 لسنة 2014 مؤرخ في 19 أوت 2014 يتعلق بالوظيفة العمومية",
    titreFr: "Loi n° 2014-54 du 19 août 2014, relative à la fonction publique",
    titreEn: "Law No. 2014-54 of August 19, 2014, relating to public service",
    datePublication: new Date("2014-08-19"),
    dateApplication: new Date("2014-08-19"),
    jortNumero: "67",
    jortAnnee: 2014,
    jortPage: 2290,
    domaines: ["fonction_publique", "droit_administratif"],
    ministere: "Ministère de la Fonction Publique",
    contenuAr: `الفصل الأول: يخضع لأحكام هذا القانون الأعوان العموميون المنتمون للدولة والجماعات المحلية والمؤسسات العمومية ذات الصبغة الإدارية.

الفصل الثاني: شروط الانتداب
يشترط للانتداب في الوظيفة العمومية:
- أن يكون المترشح تونسي الجنسية
- أن يكون متمتعا بحقوقه المدنية
- أن يكون سليم البنية قادرا على ممارسة وظائفه
- أن يكون محمود السيرة
- ألا يكون قد صدر في شأنه حكم بات بالإدانة من أجل جناية أو جنحة مخلة بالشرف`,
    contenuFr: `Article Premier : Sont soumis aux dispositions de la présente loi les agents publics appartenant à l'État, aux collectivités locales et aux établissements publics à caractère administratif.

Article 2 : Conditions de recrutement
Pour être recruté dans la fonction publique, il faut :
- Être de nationalité tunisienne
- Jouir de ses droits civiques
- Être physiquement apte à exercer ses fonctions
- Être de bonne moralité
- N'avoir pas fait l'objet d'une condamnation définitive pour crime ou délit portant atteinte à l'honneur`,
    contenuEn: `Article 1: The provisions of this law apply to public officials belonging to the State, local authorities, and public establishments of an administrative nature.

Article 2: Recruitment conditions
To be recruited into the public service, one must:
- Be of Tunisian nationality
- Enjoy civic rights
- Be physically fit to perform duties
- Be of good moral character
- Not have been definitively convicted of a crime or offense against honor`,
    resumeAr: "قانون يحدد الإطار العام للوظيفة العمومية في تونس، بما في ذلك شروط الانتداب وحقوق وواجبات الموظفين العموميين.",
    resumeFr: "Loi définissant le cadre général de la fonction publique en Tunisie, y compris les conditions de recrutement et les droits et obligations des agents publics.",
    resumeEn: "Law defining the general framework for the public service in Tunisia, including recruitment conditions and the rights and obligations of public officials.",
    pdfOriginal: "/documents/loi-2014-54.pdf",
    pdfConsolide: null,
    motsCles: ["fonction publique", "recrutement", "agents publics", "droits", "obligations"],
    statut: "en_vigueur" as const
  },
  {
    id: "doc-decret-2020-investissement",
    type: "decret" as const,
    numero: "2020-310",
    titreAr: "مرسوم عدد 310 لسنة 2020 مؤرخ في 15 ماي 2020 يتعلق بتحفيز الاستثمار",
    titreFr: "Décret n° 2020-310 du 15 mai 2020, relatif à l'incitation à l'investissement",
    titreEn: "Decree No. 2020-310 of May 15, 2020, relating to investment incentives",
    datePublication: new Date("2020-05-15"),
    dateApplication: new Date("2020-06-01"),
    jortNumero: "45",
    jortAnnee: 2020,
    jortPage: 1234,
    domaines: ["droit_commercial", "droit_fiscal"],
    ministere: "Ministère de l'Économie et des Finances",
    contenuAr: `الفصل الأول: يهدف هذا المرسوم إلى تحديد إجراءات تحفيز الاستثمار في القطاعات ذات الأولوية.

الفصل الثاني: الامتيازات الجبائية
يمنح المستثمرون في القطاعات ذات الأولوية الامتيازات التالية:
- إعفاء من الضريبة على الشركات لمدة 5 سنوات
- تخفيض بنسبة 50% من المعاليم الديوانية على المعدات
- إعفاء من الأداء على القيمة المضافة على المعدات`,
    contenuFr: `Article Premier : Le présent décret a pour objet de définir les mesures d'incitation à l'investissement dans les secteurs prioritaires.

Article 2 : Avantages fiscaux
Les investisseurs dans les secteurs prioritaires bénéficient des avantages suivants :
- Exonération de l'impôt sur les sociétés pendant 5 ans
- Réduction de 50% des droits de douane sur les équipements
- Exonération de la TVA sur les équipements`,
    contenuEn: `Article 1: This decree aims to define investment incentive measures in priority sectors.

Article 2: Tax advantages
Investors in priority sectors benefit from the following advantages:
- Exemption from corporate tax for 5 years
- 50% reduction in customs duties on equipment
- VAT exemption on equipment`,
    resumeAr: "مرسوم يحدد إجراءات تحفيز الاستثمار والامتيازات الجبائية للمستثمرين في القطاعات ذات الأولوية.",
    resumeFr: "Décret définissant les mesures d'incitation à l'investissement et les avantages fiscaux pour les investisseurs dans les secteurs prioritaires.",
    resumeEn: "Decree defining investment incentive measures and tax benefits for investors in priority sectors.",
    pdfOriginal: "/documents/decret-2020-310.pdf",
    pdfConsolide: null,
    motsCles: ["investissement", "avantages fiscaux", "exonération", "secteurs prioritaires"],
    statut: "en_vigueur" as const
  },
  {
    id: "doc-code-obligations",
    type: "code" as const,
    numero: "1906",
    titreAr: "مجلة الالتزامات والعقود",
    titreFr: "Code des Obligations et des Contrats",
    titreEn: "Code of Obligations and Contracts",
    datePublication: new Date("1906-12-15"),
    dateApplication: new Date("1906-12-15"),
    jortNumero: null,
    jortAnnee: null,
    jortPage: null,
    domaines: ["droit_civil"],
    ministere: "Ministère de la Justice",
    contenuAr: `الكتاب الأول: في الالتزامات بوجه عام
الباب الأول: في مصادر الالتزامات
الفصل الأول: في الاتفاقات والالتزامات التي تنشأ عنها

الفصل 1: الاتفاق هو تراضي شخصين أو أكثر على إنشاء التزام أو تغييره أو إسقاطه.
الفصل 2: العناصر الجوهرية للاتفاق هي:
- أهلية الإلزام
- التعبير الصحيح عن الإرادة
- موضوع معين يمكن أن يكون محلا للالتزام
- سبب مشروع`,
    contenuFr: `Livre Premier : Des obligations en général
Titre Premier : Des sources des obligations
Chapitre Premier : Des conventions et des obligations qui en naissent

Article 1 : La convention est l'accord de deux ou plusieurs personnes pour créer, modifier ou éteindre une obligation.
Article 2 : Les éléments essentiels de la convention sont :
- La capacité de s'obliger
- L'expression valable d'une volonté
- Un objet certain qui puisse former matière d'obligation
- Une cause licite`,
    contenuEn: `Book One: On obligations in general
Title One: On the sources of obligations
Chapter One: On conventions and obligations arising therefrom

Article 1: A convention is the agreement of two or more persons to create, modify, or extinguish an obligation.
Article 2: The essential elements of a convention are:
- The capacity to bind oneself
- The valid expression of a will
- A certain object that can form the subject of an obligation
- A lawful cause`,
    resumeAr: "مجلة الالتزامات والعقود هي الإطار القانوني الأساسي للعلاقات التعاقدية في القانون التونسي.",
    resumeFr: "Le Code des Obligations et des Contrats constitue le cadre juridique fondamental des relations contractuelles en droit tunisien.",
    resumeEn: "The Code of Obligations and Contracts is the fundamental legal framework for contractual relationships in Tunisian law.",
    pdfOriginal: "/documents/code-obligations.pdf",
    pdfConsolide: "/documents/code-obligations-consolide.pdf",
    motsCles: ["obligations", "contrats", "conventions", "droit civil", "responsabilité"],
    statut: "en_vigueur" as const
  },
  {
    id: "doc-code-travail",
    type: "code" as const,
    numero: "1966-27",
    titreAr: "مجلة الشغل",
    titreFr: "Code du Travail",
    titreEn: "Labor Code",
    datePublication: new Date("1966-04-30"),
    dateApplication: new Date("1966-04-30"),
    jortNumero: "23",
    jortAnnee: 1966,
    jortPage: 598,
    domaines: ["droit_travail"],
    ministere: "Ministère des Affaires Sociales",
    contenuAr: `الكتاب الأول: العلاقات الفردية للشغل
الباب الأول: عقد الشغل

الفصل 1: عقد الشغل هو اتفاق يلتزم بمقتضاه أحد الطرفين ويسمى العامل بأن يقوم بعمل لفائدة الطرف الآخر ويسمى المؤجر وتحت إدارته وإشرافه مقابل أجر.

الفصل 6: لا يمكن أن تقل مدة عقد الشغل المحدد المدة عن شهر واحد.

الفصل 14: يجب على المؤجر أن يؤدي للعامل أجره في الآجال وبالمكان المحددين قانونا.`,
    contenuFr: `Livre Premier : Relations individuelles de travail
Titre Premier : Le contrat de travail

Article 1 : Le contrat de travail est une convention par laquelle l'une des parties, appelée travailleur, s'engage à fournir ses services à l'autre partie, appelée employeur, sous sa direction et son contrôle, moyennant rémunération.

Article 6 : La durée du contrat de travail à durée déterminée ne peut être inférieure à un mois.

Article 14 : L'employeur est tenu de payer au travailleur son salaire dans les délais et au lieu fixés par la loi.`,
    contenuEn: `Book One: Individual Employment Relations
Title One: The Employment Contract

Article 1: An employment contract is an agreement by which one party, called the worker, undertakes to provide services to the other party, called the employer, under their direction and control, in exchange for remuneration.

Article 6: The duration of a fixed-term employment contract may not be less than one month.

Article 14: The employer is required to pay the worker their salary within the deadlines and at the place established by law.`,
    resumeAr: "مجلة الشغل تنظم العلاقات الفردية والجماعية للعمل بين العمال وأصحاب العمل.",
    resumeFr: "Le Code du Travail régit les relations individuelles et collectives de travail entre les travailleurs et les employeurs.",
    resumeEn: "The Labor Code governs individual and collective employment relationships between workers and employers.",
    pdfOriginal: "/documents/code-travail.pdf",
    pdfConsolide: "/documents/code-travail-consolide.pdf",
    motsCles: ["travail", "emploi", "salaire", "contrat de travail", "licenciement", "droit syndical"],
    statut: "en_vigueur" as const
  },
  {
    id: "doc-loi-2016-creation-entreprises",
    type: "loi" as const,
    numero: "2016-71",
    titreAr: "قانون عدد 71 لسنة 2016 مؤرخ في 30 سبتمبر 2016 يتعلق بقانون الاستثمار",
    titreFr: "Loi n° 2016-71 du 30 septembre 2016, portant loi de l'investissement",
    titreEn: "Law No. 2016-71 of September 30, 2016, on investment law",
    datePublication: new Date("2016-09-30"),
    dateApplication: new Date("2017-01-01"),
    jortNumero: "82",
    jortAnnee: 2016,
    jortPage: 3095,
    domaines: ["droit_commercial", "droit_fiscal"],
    ministere: "Ministère du Développement et de la Coopération Internationale",
    contenuAr: `الفصل الأول: الهدف والمبادئ العامة
يهدف هذا القانون إلى تشجيع الاستثمار وتحفيزه بما يدعم الاقتصاد الوطني ويسهم في تحقيق التنمية المستدامة.

الفصل 4: حرية الاستثمار
الاستثمار حر، ويمكن لكل شخص طبيعي أو معنوي، تونسي أو أجنبي، القيام باستثمارات في إطار القوانين الجاري بها العمل.

الفصل 18: الحوافز المشتركة
تمنح للمستثمرين الحوافز التالية:
- طرح الأرباح المعاد استثمارها من قاعدة الضريبة على الدخل
- إعفاء المعدات من الأداء على القيمة المضافة`,
    contenuFr: `Article Premier : Objectif et principes généraux
Cette loi vise à encourager et stimuler l'investissement de manière à soutenir l'économie nationale et contribuer au développement durable.

Article 4 : Liberté d'investissement
L'investissement est libre. Toute personne physique ou morale, tunisienne ou étrangère, peut effectuer des investissements dans le cadre de la législation en vigueur.

Article 18 : Incitations communes
Les investisseurs bénéficient des incitations suivantes :
- Déduction des bénéfices réinvestis de la base imposable
- Exonération des équipements de la TVA`,
    contenuEn: `Article 1: Objective and general principles
This law aims to encourage and stimulate investment to support the national economy and contribute to sustainable development.

Article 4: Freedom of investment
Investment is free. Any natural or legal person, Tunisian or foreign, may make investments within the framework of the legislation in force.

Article 18: Common incentives
Investors benefit from the following incentives:
- Deduction of reinvested profits from the tax base
- Exemption of equipment from VAT`,
    resumeAr: "قانون الاستثمار الجديد يحدد الإطار القانوني للاستثمار في تونس والحوافز المقدمة للمستثمرين.",
    resumeFr: "La nouvelle loi sur l'investissement définit le cadre juridique de l'investissement en Tunisie et les incitations accordées aux investisseurs.",
    resumeEn: "The new investment law defines the legal framework for investment in Tunisia and the incentives granted to investors.",
    pdfOriginal: "/documents/loi-2016-71.pdf",
    pdfConsolide: null,
    motsCles: ["investissement", "création d'entreprise", "incitations", "développement économique"],
    statut: "en_vigueur" as const
  },
  {
    id: "doc-circulaire-2023-administration",
    type: "circulaire" as const,
    numero: "2023-15",
    titreAr: "منشور عدد 15 لسنة 2023 حول تبسيط الإجراءات الإدارية",
    titreFr: "Circulaire n° 2023-15 relative à la simplification des procédures administratives",
    titreEn: "Circular No. 2023-15 on the simplification of administrative procedures",
    datePublication: new Date("2023-03-15"),
    dateApplication: new Date("2023-04-01"),
    jortNumero: null,
    jortAnnee: null,
    jortPage: null,
    domaines: ["droit_administratif"],
    ministere: "Présidence du Gouvernement",
    contenuAr: `في إطار تحسين جودة الخدمات الإدارية المسداة للمواطنين والمؤسسات:

1. يتعين على جميع الوزارات والمؤسسات العمومية:
- تقليص آجال معالجة الملفات إلى 15 يوما كحد أقصى
- تفعيل الخدمات الإلكترونية لكافة الإجراءات
- إلغاء طلب الوثائق التي يمكن الحصول عليها من إدارات أخرى

2. إحداث منصة رقمية موحدة لتقديم جميع الطلبات الإدارية

3. تعيين ضابط اتصال في كل إدارة لمتابعة الشكاوى`,
    contenuFr: `Dans le cadre de l'amélioration de la qualité des services administratifs rendus aux citoyens et aux entreprises :

1. Tous les ministères et établissements publics doivent :
- Réduire les délais de traitement des dossiers à 15 jours maximum
- Activer les services électroniques pour toutes les procédures
- Supprimer la demande de documents pouvant être obtenus auprès d'autres administrations

2. Création d'une plateforme numérique unifiée pour soumettre toutes les demandes administratives

3. Désignation d'un correspondant dans chaque administration pour le suivi des réclamations`,
    contenuEn: `In the context of improving the quality of administrative services provided to citizens and businesses:

1. All ministries and public establishments must:
- Reduce processing times for files to a maximum of 15 days
- Activate electronic services for all procedures
- Eliminate requests for documents that can be obtained from other administrations

2. Creation of a unified digital platform for submitting all administrative requests

3. Appointment of a liaison officer in each administration to follow up on complaints`,
    resumeAr: "منشور يحدد إجراءات تبسيط الخدمات الإدارية وتحسين جودتها.",
    resumeFr: "Circulaire définissant les mesures de simplification des services administratifs et d'amélioration de leur qualité.",
    resumeEn: "Circular defining measures for simplifying administrative services and improving their quality.",
    pdfOriginal: "/documents/circulaire-2023-15.pdf",
    pdfConsolide: null,
    motsCles: ["administration", "simplification", "services électroniques", "délais"],
    statut: "en_vigueur" as const
  },
  {
    id: "doc-jurisprudence-ta-2022",
    type: "jurisprudence" as const,
    numero: "TA-2022-1234",
    titreAr: "قرار المحكمة الإدارية عدد 1234 لسنة 2022 - إلغاء قرار إداري",
    titreFr: "Arrêt du Tribunal Administratif n° 1234 de 2022 - Annulation d'une décision administrative",
    titreEn: "Administrative Court Decision No. 1234 of 2022 - Annulment of administrative decision",
    datePublication: new Date("2022-06-15"),
    dateApplication: null,
    jortNumero: null,
    jortAnnee: null,
    jortPage: null,
    domaines: ["droit_administratif"],
    ministere: null,
    contenuAr: `المحكمة الإدارية
الدائرة الاستعجالية

في القضية عدد 1234/2022

بين:
المدعي: السيد أحمد بن محمد
المدعى عليه: وزارة التربية

حيث طعن المدعي في القرار الصادر عن وزارة التربية بتاريخ 15/01/2022 والقاضي برفض ترقيته.

حيث تبين للمحكمة أن القرار المطعون فيه جاء مشوبا بعيب عدم التعليل.

لهذه الأسباب:
قضت المحكمة بإلغاء القرار المطعون فيه.`,
    contenuFr: `Tribunal Administratif
Chambre de référé

Affaire n° 1234/2022

Entre :
Demandeur : M. Ahmed Ben Mohamed
Défendeur : Ministère de l'Éducation

Attendu que le demandeur a contesté la décision du Ministère de l'Éducation en date du 15/01/2022 refusant sa promotion.

Attendu que la Cour a constaté que la décision contestée était entachée d'un défaut de motivation.

Par ces motifs :
Le Tribunal décide d'annuler la décision contestée.`,
    contenuEn: `Administrative Court
Emergency Chamber

Case No. 1234/2022

Between:
Plaintiff: Mr. Ahmed Ben Mohamed
Defendant: Ministry of Education

Whereas the plaintiff contested the decision of the Ministry of Education dated 15/01/2022 refusing his promotion.

Whereas the Court found that the contested decision was vitiated by a lack of reasoning.

For these reasons:
The Court decides to annul the contested decision.`,
    resumeAr: "قرار يتعلق بإلغاء قرار إداري بسبب عدم التعليل.",
    resumeFr: "Décision relative à l'annulation d'une décision administrative pour défaut de motivation.",
    resumeEn: "Decision concerning the annulment of an administrative decision for lack of reasoning.",
    pdfOriginal: "/documents/jurisprudence-ta-2022-1234.pdf",
    pdfConsolide: null,
    motsCles: ["tribunal administratif", "recours", "annulation", "motivation", "promotion"],
    statut: "en_vigueur" as const
  },
  {
    id: "doc-loi-2019-collectivites",
    type: "loi" as const,
    numero: "2018-29",
    titreAr: "القانون الأساسي عدد 29 لسنة 2018 مؤرخ في 9 ماي 2018 يتعلق بمجلة الجماعات المحلية",
    titreFr: "Loi organique n° 2018-29 du 9 mai 2018, relative au code des collectivités locales",
    titreEn: "Organic Law No. 2018-29 of May 9, 2018, on the local authorities code",
    datePublication: new Date("2018-05-09"),
    dateApplication: new Date("2018-05-09"),
    jortNumero: "39",
    jortAnnee: 2018,
    jortPage: 1685,
    domaines: ["droit_administratif"],
    ministere: "Ministère des Affaires Locales",
    contenuAr: `الباب الأول: أحكام عامة
الفصل الأول: تتكون الجماعات المحلية من البلديات والجهات والأقاليم.

الفصل 2: تتمتع الجماعات المحلية بالشخصية القانونية والاستقلالية الإدارية والمالية.

الفصل 3: تدير الجماعات المحلية المصالح المحلية وفقا لمبدأ التدبير الحر.

الباب الثاني: البلديات
الفصل 15: تتولى البلدية في نطاق ترابها:
- تهيئة المدينة وتجميلها
- التصرف في الأملاك البلدية
- إحداث المرافق العمومية المحلية`,
    contenuFr: `Titre Premier : Dispositions générales
Article Premier : Les collectivités locales se composent des communes, des régions et des districts.

Article 2 : Les collectivités locales jouissent de la personnalité juridique et de l'autonomie administrative et financière.

Article 3 : Les collectivités locales gèrent les affaires locales selon le principe de libre administration.

Titre II : Les communes
Article 15 : La commune est chargée, dans son ressort territorial, de :
- L'aménagement et l'embellissement de la ville
- La gestion du patrimoine communal
- La création des services publics locaux`,
    contenuEn: `Title One: General Provisions
Article 1: Local authorities consist of municipalities, regions, and districts.

Article 2: Local authorities enjoy legal personality and administrative and financial autonomy.

Article 3: Local authorities manage local affairs according to the principle of free administration.

Title II: Municipalities
Article 15: The municipality is responsible, within its territory, for:
- Urban planning and beautification
- Management of municipal property
- Creation of local public services`,
    resumeAr: "مجلة الجماعات المحلية تنظم الإطار القانوني للبلديات والجهات والأقاليم.",
    resumeFr: "Le Code des Collectivités Locales organise le cadre juridique des communes, régions et districts.",
    resumeEn: "The Local Authorities Code organizes the legal framework for municipalities, regions, and districts.",
    pdfOriginal: "/documents/loi-2018-29.pdf",
    pdfConsolide: null,
    motsCles: ["collectivités locales", "municipalités", "décentralisation", "autonomie locale"],
    statut: "en_vigueur" as const
  },
  {
    id: "doc-decret-2021-protection-donnees",
    type: "decret" as const,
    numero: "2021-802",
    titreAr: "مرسوم عدد 802 لسنة 2021 مؤرخ في 15 أكتوبر 2021 يتعلق بحماية المعطيات الشخصية",
    titreFr: "Décret n° 2021-802 du 15 octobre 2021, relatif à la protection des données personnelles",
    titreEn: "Decree No. 2021-802 of October 15, 2021, on the protection of personal data",
    datePublication: new Date("2021-10-15"),
    dateApplication: new Date("2021-11-01"),
    jortNumero: "89",
    jortAnnee: 2021,
    jortPage: 3456,
    domaines: ["droit_civil"],
    ministere: "Ministère des Technologies de la Communication",
    contenuAr: `الفصل الأول: يهدف هذا المرسوم إلى تحديد إجراءات حماية المعطيات الشخصية.

الفصل 2: المعطيات الشخصية
يقصد بالمعطيات الشخصية كل المعلومات المتعلقة بشخص طبيعي معرف أو قابل للتعريف.

الفصل 5: حقوق الأشخاص المعنيين
لكل شخص الحق في:
- الإعلام بمعالجة معطياته
- النفاذ إلى معطياته
- تصحيح معطياته
- الاعتراض على معالجة معطياته`,
    contenuFr: `Article Premier : Le présent décret a pour objet de définir les procédures de protection des données personnelles.

Article 2 : Données personnelles
On entend par données personnelles toute information relative à une personne physique identifiée ou identifiable.

Article 5 : Droits des personnes concernées
Toute personne a le droit de :
- Être informée du traitement de ses données
- Accéder à ses données
- Rectifier ses données
- S'opposer au traitement de ses données`,
    contenuEn: `Article 1: This decree aims to define procedures for the protection of personal data.

Article 2: Personal data
Personal data means any information relating to an identified or identifiable natural person.

Article 5: Rights of data subjects
Every person has the right to:
- Be informed about the processing of their data
- Access their data
- Rectify their data
- Object to the processing of their data`,
    resumeAr: "مرسوم يحدد إجراءات حماية المعطيات الشخصية وحقوق الأشخاص المعنيين.",
    resumeFr: "Décret définissant les procédures de protection des données personnelles et les droits des personnes concernées.",
    resumeEn: "Decree defining personal data protection procedures and the rights of data subjects.",
    pdfOriginal: "/documents/decret-2021-802.pdf",
    pdfConsolide: null,
    motsCles: ["données personnelles", "vie privée", "protection", "droits numériques"],
    statut: "en_vigueur" as const
  }
];

// Demo users
export const demoUsers = [
  {
    id: "user-admin",
    email: "admin@legislation.tn",
    password: "admin123", // In production, this would be hashed
    nom: "Admin",
    prenom: "System",
    role: "admin" as const
  },
  {
    id: "user-contributor",
    email: "contributeur@legislation.tn",
    password: "contrib123",
    nom: "Ben Ali",
    prenom: "Mohamed",
    role: "contributeur" as const
  },
  {
    id: "user-validator",
    email: "validateur@legislation.tn",
    password: "valid123",
    nom: "Trabelsi",
    prenom: "Fatma",
    role: "validateur" as const
  }
];

// Demo synonyms for legal terms
export const demoSynonyms = [
  {
    terms: ["قانون", "تشريع", "نص قانوني"],
    locale: "ar"
  },
  {
    terms: ["loi", "texte législatif", "législation"],
    locale: "fr"
  },
  {
    terms: ["law", "legislation", "statute", "act"],
    locale: "en"
  },
  {
    terms: ["مرسوم", "أمر حكومي", "قرار"],
    locale: "ar"
  },
  {
    terms: ["décret", "arrêté", "ordonnance"],
    locale: "fr"
  },
  {
    terms: ["decree", "order", "ordinance"],
    locale: "en"
  },
  {
    terms: ["محكمة", "قضاء", "عدالة"],
    locale: "ar"
  },
  {
    terms: ["tribunal", "cour", "juridiction", "justice"],
    locale: "fr"
  },
  {
    terms: ["court", "tribunal", "judiciary", "justice"],
    locale: "en"
  },
  {
    terms: ["شغل", "عمل", "توظيف"],
    locale: "ar"
  },
  {
    terms: ["travail", "emploi", "embauche"],
    locale: "fr"
  },
  {
    terms: ["work", "employment", "job", "labor"],
    locale: "en"
  }
];
