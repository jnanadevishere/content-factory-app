import { useState, useEffect, useMemo } from "react";
import { 
  Sparkles, 
  Search, 
  ChevronRight, 
  RefreshCw, 
  X, 
  Copy, 
  Check, 
  ExternalLink,
  Clock,
  AlertCircle,
  ShieldCheck,
  Filter,
  Film,
  Globe,
  Briefcase,
  Cpu,
  CloudSun,
  MapPin,
  TrendingUp,
  Award
} from "lucide-react";

interface Source {
  name: string;
  publishedDate: string;
  link: string;
}

interface Story {
  id: string;
  titleTel: string;
  titleEng: string;
  summaryEng: string;
  category: string;
  date: string;
  hour: string;
  epochTime: number;
  audienceRate: number; // Percentage engagement score
  sources: Source[];
}

interface RawTemplate {
  id: string;
  titleTel: string;
  titleEng: string;
  summaryEng: string;
  category: string;
  audienceRate: number;
  sources: { name: string; link: string }[];
}

// Helper to get formatted current dates dynamically
const getFormattedCurrentDate = () => {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
};

const getTeluguCurrentDate = () => {
  const now = new Date();
  const months = [
    "జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", 
    "జూలై", "ఆగస్టు", "సెప్టెంబరు", "అక్టోబరు", "నవంబరు", "డిసెంబరు"
  ];
  return `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
};

const RAW_STORIES_TEMPLATES: RawTemplate[] = [
  // ----------------------------------------
  // CATEGORY: POLITICS (10 Stories)
  // ----------------------------------------
  {
    id: "pol-1",
    titleTel: "తెలంగాణ అడ్వకేట్స్ ప్రొటెక్షన్ యాక్ట్ నేటి నుంచి అమలులోకి",
    titleEng: "Telangana Advocates Protection Act Comes into Force with State Notification",
    summaryEng: "The Telangana government has officially notified that the landmark Advocates Protection Act is active starting today. The legislation protects legal practitioners from threats, physical violence, harassment, and malicious false implications during professional duties.",
    category: "Politics",
    audienceRate: 94,
    sources: [
      { name: "Bar and Bench News", link: "https://www.barandbench.com/news/law-policy/telangana-advocates-protection-act-comes-into-force" },
      { name: "ANI National", link: "https://www.aninews.in/news/national/general-news/telangana-advocates-protection-act-comes-into-force" }
    ]
  },
  {
    id: "pol-2",
    titleTel: "తెలంగాణను 3 ట్రిలియన్ డాలర్ల ఆర్థిక వ్యవస్థగా మారుస్తాం: సీఎం రేవంత్ రెడ్డి పిలుపు",
    titleEng: "CM Revanth Reddy Unveils 'Telangana Rising' Development Roadmap",
    summaryEng: "Marking Telangana's Statehood celebrations, Chief Minister A Revanth Reddy outlined an ambitious developmental path. The administration aims to elevate the state to a $1 trillion economy by 2034 and scale up to $3 trillion by 2047, backed by major housing and welfare initiatives.",
    category: "Politics",
    audienceRate: 91,
    sources: [
      { name: "The Hindu Online", link: "https://www.thehindu.com/news/national/telangana/govt-to-proceed-with-tact-and-wisdom" },
      { name: "Eenadu Online", link: "https://www.eenadu.net/telangana/formation-day-live-updates-revanth-reddy-speech" }
    ]
  },
  {
    id: "pol-3",
    titleTel: "తెలంగాణ ప్రజలకు ప్రధాని నరేంద్ర మోదీ ఆవిర్భావ దినోత్సవ శుభాకాంక్షలు",
    titleEng: "PM Narendra Modi Congratulates Telangana Citizens on Statehood Day",
    summaryEng: "Prime Minister Narendra Modi sent his wishes to the residents of Telangana, applauding their courage, innovation, and vibrant culture. He reaffirmed the Center's commitment to supporting the state's growth trajectory towards realizing 'Viksit Bharat'.",
    category: "Politics",
    audienceRate: 88,
    sources: [
      { name: "PM India Press Release", link: "https://www.pmindia.gov.in/en/news_updates/pm-greets-the-people-of-telangana" },
      { name: "The Hindu National", link: "https://www.thehindu.com/news/national/telangana-statehood-day-committed-to-supporting-states" }
    ]
  },
  {
    id: "pol-4",
    titleTel: "హైదరాబాద్‌లో జనసేన సభ రద్దు: జూబ్లీహిల్స్ నివాసంలో పవన్ కళ్యాణ్ ప్రెస్ మీట్",
    titleEng: "Cyberabad Police Deny JSP Gachibowli Meeting; Pawan Kalyan Initiates Jubilee Hills Address",
    summaryEng: "After Cyberabad authorities declined permissions for a major JSP convention in Gachibowli today, Deputy CM Pawan Kalyan addressed regional leaders and media representatives from his Jubilee Hills residence, criticizing political roadblocks.",
    category: "Politics",
    audienceRate: 96,
    sources: [
      { name: "Andhra Jyothy Politics", link: "https://www.andhrajyothy.com/telangana/cyberabad-police-reject-sandhya-convention" },
      { name: "Samayam Hyderabad", link: "https://telugu.samayam.com/latest-news/pawan-kalyan-press-meet-denied" }
    ]
  },
  {
    id: "pol-5",
    titleTel: "కేంద్ర ప్రభుత్వం 'యాంటీ-వెపనైజేషన్' నిధుల ఉపసంహరణకు సిద్ధం",
    titleEng: "White House Set to Scrap $1.776 Billion controversial 'Anti-Weaponization' Fund",
    summaryEng: "The US administration today plans to drop its controversial $1.776 billion anti-weaponization fund, calling it a political distraction following a temporary block issued by a Virginia court order.",
    category: "Politics",
    audienceRate: 72,
    sources: [
      { name: "Axios National", link: "https://www.axios.com/trump-administration-drops-anti-weaponization-fund" },
      { name: "Just Security Bulletin", link: "https://www.justsecurity.org/early-edition-anti-weaponization-fund" }
    ]
  },
  {
    id: "pol-6",
    titleTel: "ఢిల్లీ తెలంగాణ భవన్‌లో ఘనంగా ఆవిర్భావ దినోత్సవ వేడుకలు",
    titleEng: "Kishan Reddy Garlands B.R. Ambedkar Statue as BJP Celebrates Telangana Day in New Delhi",
    summaryEng: "Union Minister G. Kishan Reddy and BJP National President Nitin Nabin led colorful Telangana Formation Day celebrations at Telangana Bhavan in New Delhi today, hosting multiple traditional regional performances.",
    category: "Politics",
    audienceRate: 85,
    sources: [
      { name: "Social News XYZ Gallery", link: "https://www.socialnews.xyz/new-delhi-telangana-formation-day" }
    ]
  },
  {
    id: "pol-7",
    titleTel: "జమ్మూకశ్మీర్‌పై ఐరోపా సమాఖ్య-పాకిస్థాన్ ఉమ్మడి వ్యాఖ్యలను తిరస్కరించిన భారత్",
    titleEng: "India's MEA Outright Rejects EU-Pakistan Reference to Jammu & Kashmir",
    summaryEng: "The Ministry of External Affairs today rebuffed attempts by foreign bodies to comment on Jammu & Kashmir, reminding global platforms that third parties have absolutely zero locus standi on India's sovereign bilateral issues.",
    category: "Politics",
    audienceRate: 79,
    sources: [
      { name: "UNI National News Digest", link: "https://www.uniindia.com/uni-news-digest-at-1900-hrs-india" }
    ]
  },
  {
    id: "pol-8",
    titleTel: "వెనిజులా తాత్కాలిక అధ్యక్షురాలు డెల్సీ రోడ్రిగ్జ్ రేపటి నుంచి భారత్ పర్యటన",
    titleEng: "Venezuela's Acting President Delcy Rodríguez Set for Crucial 5-Day India Visit",
    summaryEng: "Venezuela's top diplomatic delegation led by Acting President Delcy Rodríguez arrives in New Delhi tomorrow. High-level discussions focusing on bilateral trade mechanisms, energy security, and oil supply will be on the table.",
    category: "Politics",
    audienceRate: 64,
    sources: [
      { name: "MEA Diplomatic Bulletin", link: "https://www.uniindia.com/uni-news-digest-at-1900-hrs-venezuela" }
    ]
  },
  {
    id: "pol-9",
    titleTel: "బెంగాల్‌లో టీఎంసీపై నిషేధం విధించాలని బీజేపీ డిమాండ్",
    titleEng: "Bengal BJP Leaders Seek Complete Ban on TMC Following Escalated Pre-Poll Violences",
    summaryEng: "Citing recurring law and order concerns, state ministers representing the BJP formally petitioned union platforms today, demanding structural evaluations and severe bans on the Trinamool Congress (TMC).",
    category: "Politics",
    audienceRate: 82,
    sources: [
      { name: "UNI Kolkata Press", link: "https://www.uniindia.com/bjp-minister-seeks-ban-on-tmc" }
    ]
  },
  {
    id: "pol-10",
    titleTel: "కోల్‌కతాలో మమతా బెనర్జీ భారీ ధర్నా: కేంద్ర వైఖరిపై నిప్పులు చేరిగిన సీఎం",
    titleEng: "TMC Supremo Mamata Banerjee Launches Sit-In Protest Against Political Intimidations",
    summaryEng: "West Bengal Chief Minister Mamata Banerjee initiated a highly publicized silent sit-in in Kolkata today, accusing central agencies of orchestrating deliberate harassments against key state politicians.",
    category: "Politics",
    audienceRate: 89,
    sources: [
      { name: "Kolkata Bureau Live", link: "https://www.uniindia.com/mamata-banerjee-holds-sit-in" }
    ]
  },

  // ----------------------------------------
  // CATEGORY: ENTERTAINMENT (10 Stories)
  // ----------------------------------------
  {
    id: "ent-1",
    titleTel: "రామ్ చరణ్ 'పెద్ది' జూన్ 4న గ్రాండ్ రిలీజ్: బుచ్చిబాబు మరియు జాన్వీ కపూర్ ప్రమోషన్స్",
    titleEng: "Ram Charan's 'Peddi' Set for Huge Theatrical Release on June 4; Promos Peak in Hyderabad",
    summaryEng: "The sports action drama 'Peddi' starring Ram Charan and Bollywood actress Janhvi Kapoor is locked for a grand release on June 4. Director Buchi Babu Sana expressed great confidence during final promotions today, stating it will set a new benchmark for sports cinema.",
    category: "Entertainment",
    audienceRate: 98,
    sources: [
      { name: "Sakshi Cinema Desk", link: "https://www.sakshi.com/telugu-news/movies/upcoming-telugu-movies" },
      { name: "Greatandhra Tollywood", link: "https://www.greatandhra.com/movies/news/peddi-release-fever" }
    ]
  },
  {
    id: "ent-2",
    titleTel: "పుష్ప 2 ది రూల్: హైదరాబాద్‌లో భారీ డబ్బింగ్ షెడ్యూల్ ప్రారంభించిన అల్లు అర్జున్",
    titleEng: "Pushpa 2 The Rule: Allu Arjun Commences Crucial Final Dubbing Phase in Hyderabad",
    summaryEng: "Icon Star Allu Arjun entered a premium recording studio in Jubilee Hills today to start his final dialog syncs for 'Pushpa 2: The Rule.' Director Sukumar is concurrently handling VFX integrations in Mumbai.",
    category: "Entertainment",
    audienceRate: 97,
    sources: [
      { name: "ETV Cinema Updates", link: "https://www.etv.co.in/telugu/entertainment/cinema/allu-arjun-starts-dubbing" },
      { name: "123telugu Tollywood", link: "https://www.123telugu.com/mnews/allu-arjun-pushpa2" }
    ]
  },
  {
    id: "ent-3",
    titleTel: "అఖిల్ అక్కినేని 'లెనిన్' జూన్ 26న విడుదల: సీమ బ్యాక్‌డ్రాప్‌లో మురళీ కిశోర్ అబ్బూరు మూవీ",
    titleEng: "Akhil Akkineni's 'Lenin' Locked for June 26 Release; Co-starring Bhagyashri Borse",
    summaryEng: "Akhil Akkineni's highly anticipated action drama 'Lenin' is officially scheduled to release on June 26. Directed by Murali Kishore Abburu of Vinaro Bhagyamu Vishnu Katha fame, the movie features Bhagyashri Borse as the female lead and is set in Rayalaseema.",
    category: "Entertainment",
    audienceRate: 91,
    sources: [
      { name: "Sakshi Movies", link: "https://www.sakshi.com/telugu-news/movies/upcoming-telugu-movies#lenin" },
      { name: "Gulte Cinema Desk", link: "https://gulte.com/news/akhil-lenin-release-date" }
    ]
  },
  {
    id: "ent-4",
    titleTel: "సమంత 'మా ఇంటి బంగారం' జూన్ 19న విడుదల: నందిని రెడ్డి దర్శకత్వం",
    titleEng: "Samantha's 'Maa Inti Bangaram' Set for June 19 Release; Written by Raj Nidimoru",
    summaryEng: "Samantha Ruth Prabhu's first project after a brief hiatus, 'Maa Inti Bangaram', has finalized its release date as June 19. Directed by Nandini Reddy and written by Raj Nidimoru, the film has generated huge buzz with its high-quality promotional trailers.",
    category: "Entertainment",
    audienceRate: 93,
    sources: [
      { name: "Sakshi Daily Entertainment", link: "https://www.sakshi.com/telugu-news/movies/upcoming-telugu-movies#maaintibangaram" },
      { name: "Telugu360 Feed", link: "https://www.telugu360.com/samantha-nandinireddy" }
    ]
  },
  {
    id: "ent-5",
    titleTel: "గేమ్ ఛేంజర్ కొత్త సాంగ్ షూట్: శంకర్ పర్యవేక్షణలో భారీ సెట్ పూర్తి",
    titleEng: "Director Shankar Mounts Massive Musical Set in Hyderabad for 'Game Changer'",
    summaryEng: "Acclaimed filmmaker Shankar began a grand high-budget visual song schedule featuring Ram Charan and Kiara Advani today. A vast, modern set was custom-built at the Aluminium Factory location.",
    category: "Entertainment",
    audienceRate: 95,
    sources: [
      { name: "Idlebrain Movie Portal", link: "https://www.idlebrain.com/news/tgnews/gamechanger-song" },
      { name: "Tollywood.net News", link: "https://www.tollywood.net/shankar-mounts-massive-set" }
    ]
  },
  {
    id: "ent-6",
    titleTel: "రాజమౌళి - మహేష్ బాబు SSMB29: జర్మనీ వర్క్‌షాప్ పూర్తి, త్వరలో అఫీషియల్ అప్‌డేట్",
    titleEng: "SS Rajamouli & Mahesh Babu's SSMB29 Finishes Extensive Germany Workshop Phase",
    summaryEng: "Superstar Mahesh Babu and visionary director SS Rajamouli's massive action-adventure SSMB29 is concluding its preliminary training schedules in Germany. An official announcement regarding the regular shoot timeline is expected by mid-June.",
    category: "Entertainment",
    audienceRate: 99,
    sources: [
      { name: "Gulte Tollywood News", link: "https://gulte.com/news/ssmb29-germany-workshop" },
      { name: "TV9 Telugu Entertainment", link: "https://www.youtube.com/watch?v=fIbz9nbQarc" }
    ]
  },
  {
    id: "ent-7",
    titleTel: "ప్రభాస్ - సందీప్ రెడ్డి వంగా 'స్పిరిట్' మ్యూజిక్ సెషన్స్ ప్రారంభం",
    titleEng: "Prabhas and Sandeep Reddy Vanga's 'Spirit' Starts Music Sessions in Mumbai",
    summaryEng: "Rebel Star Prabhas' next high-voltage cop action thriller 'Spirit' directed by Sandeep Reddy Vanga has officially commenced its musical compositions in Mumbai. The team is aiming to complete pre-production by August.",
    category: "Entertainment",
    audienceRate: 96,
    sources: [
      { name: "TV9 Tollywood to Bollywood", link: "https://www.youtube.com/watch?v=fIbz9nbQarc#spirit" },
      { name: "123telugu Bulletins", link: "https://www.123telugu.com/mnews/spirit-music-sessions" }
    ]
  },
  {
    id: "ent-8",
    titleTel: "జూనియర్ ఎన్టీఆర్ 'దేవర: పార్ట్ 2' స్క్రిప్ట్ లాక్ చేసిన కొరటాల శివ",
    titleEng: "Director Koratala Siva Locks Script and Conceptual VFX Outlines for 'Devara: Part 2'",
    summaryEng: "Young Tiger NTR's coastal action epic 'Devara: Part 2' has reached an important milestone. Director Koratala Siva has reportedly completed the script lock and approved pre-visualization drafts for heavy ocean-action sequences.",
    category: "Entertainment",
    audienceRate: 94,
    sources: [
      { name: "Greatandhra Exclusive", link: "https://www.greatandhra.com/movies/news/devara-2-script" }
    ]
  },
  {
    id: "ent-9",
    titleTel: "మెగాస్టార్ చిరంజీవి 'విశ్వంభర' తుది డబ్బింగ్ పనులు రేపటి నుండి షురూ",
    titleEng: "Megastar Chiranjeevi's Fantasy Adventure 'Vishwambhara' Starts Final Post-Production",
    summaryEng: "Vassishtha's fantasy thriller 'Vishwambhara' starring Megastar Chiranjeevi is transitioning into its post-production phase. Sound mixing and final dubbing sessions are scheduled to begin at Prasad Labs starting tomorrow.",
    category: "Entertainment",
    audienceRate: 92,
    sources: [
      { name: "Andhra Jyothy Cinema", link: "https://www.andhrajyothy.com/cinema/vishwambhara-final-schedule" }
    ]
  },
  {
    id: "ent-10",
    titleTel: "గుండెనిండా గుడిగంటలు నేటి ఎపిసోడ్: రోహిణి మలేషియా ప్లాన్ రద్దు, బాలు అనుమానం",
    titleEng: "Gundeninda Gudigantalu Today's Episode: Rohini Halts Malaysia Trip; Balu Closes In",
    summaryEng: "In today's highly dramatic episode of Star Maa's 'Gundeninda Gudigantalu', Rohini plays a deceitful card to cancel the highly anticipated Malaysia trip, sparking sharp suspicion from Balu while Manoj remains clueless.",
    category: "Entertainment",
    audienceRate: 86,
    sources: [
      { name: "Samayam Serial Desk", link: "https://telugu.samayam.com/tv/news/rohini-mater-plan" }
    ]
  },

  // ----------------------------------------
  // CATEGORY: BUSINESS (10 Stories)
  // ----------------------------------------
  {
    id: "bus-1",
    titleTel: "కమర్షియల్ ఎల్‌పీజీ సిలిండర్ ధర రూ.42 పెరిగింది: నేటి నుంచి కొత్త రేట్లు అమలు",
    titleEng: "Commercial LPG Cylinder Price Hiked by Rs 42 Across Major Indian Metros",
    summaryEng: "Oil Marketing Companies (OMCs) have increased the prices of 19 kg commercial cylinders by Rs 42. The price adjustment, effective today, affects restaurant bills, while domestic 14.2 kg LPG cylinder rates remain unchanged.",
    category: "Business",
    audienceRate: 75,
    sources: [
      { name: "India.com Business", link: "https://www.india.com/business/lpg-png-prices-check" }
    ]
  },
  {
    id: "bus-2",
    titleTel: "బంగారం ధరల సరికొత్త రికార్డు: ఫ్యూచర్స్ మార్కెట్లో భారీగా పెరిగిన రేట్లు",
    titleEng: "Gold Futures Rally Heavily as Geopolitical Tension Fuels Safe-Haven Trading",
    summaryEng: "Precious metals experienced aggressive demand during early market trading hours today. Global economic changes and inflation hedges continue driving investors toward commodities.",
    category: "Business",
    audienceRate: 91,
    sources: [
      { name: "MCX Commodity Tracker", link: "https://www.mcxindia.com/market-data/gold-futures" }
    ]
  },
  {
    id: "bus-3",
    titleTel: "ఈరోజు లాభాల్లో ముగిసిన షేర్ మార్కెట్లు: 84 వేలు దాటిన సెన్సెక్స్",
    titleEng: "Indian Equity Benchmarks Rally; Sensex Comfortably Retakes Strategic Heights Today",
    summaryEng: "Strong institutional buying from foreign banking pools sent local indices to historic highs during afternoon sessions today, backed by notable gains across major technology and state-run enterprise shares.",
    category: "Business",
    audienceRate: 90,
    sources: [
      { name: "NSE India Market Bulletin", link: "https://www.mcxindia.com/market-data/equities" }
    ]
  },
  {
    id: "bus-4",
    titleTel: "ముంబై సహా గుజరాత్‌లో 20 చోట్ల ఈడీ ఏకకాలంలో సోదాలు",
    titleEng: "Enforcement Directorate Raids 20 Strategic Locations in Money Laundering Probe",
    summaryEng: "Federal investigators from the Enforcement Directorate launched surprise inspections across Mumbai and various sectors of Gujarat today, targeting shell enterprises linked to illegal international financial transfers.",
    category: "Business",
    audienceRate: 88,
    sources: [
      { name: "ED Crime Bulletin", link: "https://www.uniindia.com/ed-raids-20-locations" }
    ]
  },
  {
    id: "bus-5",
    titleTel: "సింగరేణి బొగ్గు ఉత్పత్తి పెంపు: నూతన ప్లాంట్ శంకుస్థాపనకు గ్రీన్ సిగ్నల్",
    titleEng: "SCCL Obtains Critical Environmental Authorization for Coal Output Expansion",
    summaryEng: "Singareni Collieries Company Limited (SCCL) secured formal environment clearance today. The clearance clears the path to deploy specialized modern heavy extraction machinery across major open-cast sectors.",
    category: "Business",
    audienceRate: 74,
    sources: [
      { name: "Namasthe Telangana Economy", link: "https://www.ntnews.com/telangana/sccl-coal-production" }
    ]
  },
  {
    id: "bus-6",
    titleTel: "భోపాల్ మాజీ ఎక్సైజ్ అధికారి రూ. 18.20 కోట్ల విలువైన ఆస్తులను జప్తు చేసిన ఈడీ",
    titleEng: "ED Provisional Attachments Totaling Rs 18.20 Crore Linked to MP Excise Officer",
    summaryEng: "The Bhopal Zonal Office of the Enforcement Directorate today attached extensive real estate assets and bank balances belonging to Dharmendra Singh Bhadauria under active money laundering charges.",
    category: "Business",
    audienceRate: 61,
    sources: [
      { name: "ED Bhopal Zonal Bulletin", link: "https://www.uniindia.com/ed-attaches-properties" }
    ]
  },
  {
    id: "bus-7",
    titleTel: "దేశవ్యాప్టానికి స్థిరంగా ఉన్న పెట్రోల్, డీజిల్ ధరలు: హైదరాబాద్‌లో లీటర్ రూ.115.62",
    titleEng: "Petrol and Diesel Prices Remain Firmly Stable Across Major Metro Locations",
    summaryEng: "State-run oil marketing giants maintained stable fuel prices today. Retail charts show Delhi pricing petrol at Rs 102.12, while Hyderabad consumers continue to see stable rates holding at Rs 115.62 per liter.",
    category: "Business",
    audienceRate: 83,
    sources: [
      { name: "The Economic Times Retail", link: "https://m.economictimes.com/news/new-updates" }
    ]
  },
  {
    id: "bus-8",
    titleTel: "సహకార బ్యాంకుల్లో సైబర్ భద్రతను పటిష్టం చేయాలని ఆర్బీఐ తాజా ఆదేశాలు",
    titleEng: "RBI Directs Cooperative Banks to Tighten Online Security Against Phishing Hooks",
    summaryEng: "The Reserve Bank of India issued rigorous security guidelines today, urging state cooperative banks to adopt multi-layer transactional validation protocols as regional cyber attacks spike.",
    category: "Business",
    audienceRate: 77,
    sources: [
      { name: "RBI Press Desk", link: "https://rbi.org.in/press/cybersecurity" }
    ]
  },
  {
    id: "bus-9",
    titleTel: "దక్షిణ రాష్ట్రాల్లో రూ.15,000 కోట్ల హరిత ఇంధన పెట్టుబడులకు అదానీ గ్రీన్ నిర్ణయం",
    titleEng: "Adani Green to Invest Rs 15,000 Crore in Solar Parks Across Southern Grid Zones",
    summaryEng: "Adani Green Energy announced a multi-billion green development framework today, targeting expansion of active wind-solar generation fields across southern regions over the next 18 months.",
    category: "Business",
    audienceRate: 89,
    sources: [
      { name: "Adani Corporate Press Office", link: "https://www.adanigreenenergy.com/press" }
    ]
  },
  {
    id: "bus-10",
    titleTel: "ఐరోపా విమానయాన దిగ్గజంతో భారీ క్లౌడ్ ఒప్పందం కుదుర్చుకున్న టిసిఎస్",
    titleEng: "TCS Secures Multi-Million Dollar Cloud Overhaul Pact with Euro Airways",
    summaryEng: "Tata Consultancy Services (TCS) locked in an expansive modern hybrid cloud integration model today, which is expected to overhaul ticketing and airline customer service grids globally.",
    category: "Business",
    audienceRate: 91,
    sources: [
      { name: "TCS Corporate Media Cell", link: "https://www.tcs.com/news" }
    ]
  },

  // ----------------------------------------
  // CATEGORY: TECHNOLOGY (10 Stories)
  // ----------------------------------------
  {
    id: "tech-1",
    titleTel: "సిబిఎస్‌ఇ 12వ తరగతి రీ-మూల్యాంకన పోర్టల్‌పై భారీ సైబర్ దాడులు",
    titleEng: "CBSE Confirms Blockade as Cyberattacks Target Class 12 Re-evaluation Web Portal",
    summaryEng: "The Central Board of Secondary Education (CBSE) revealed today that its secondary student portal suffered a massive barrage of distributed cyberattacks, forcing temporary downtime during critical re-evaluation requests.",
    category: "Technology",
    audienceRate: 88,
    sources: [
      { name: "CBSE Safety Cell", link: "https://www.uniindia.com/cbse-cyberattacks" }
    ]
  },
  {
    id: "tech-2",
    titleTel: "హైదరాబాద్ ఇంటర్నేషనల్ ఎయిర్‌పోర్ట్‌లో విప్లవాత్మక ఫేషియల్ గేట్ సేవలు ప్రారంభం",
    titleEng: "GMR Hyderabad Airport Deploys Advanced High-Speed Facial Boarding Hubs",
    summaryEng: "Rajiv Gandhi International Airport today introduced a fully contactless passenger validation gateway. Utilizing modern neural scanning, travelers can now breeze through security checkpoints in under 12 seconds.",
    category: "Technology",
    audienceRate: 95,
    sources: [
      { name: "Telangana Today Tech", link: "https://telanganatoday.com/hyderabad-airport-biometric" }
    ]
  },
  {
    id: "tech-3",
    titleTel: "వైజాగ్ సెమీకండక్టర్ ఫ్యాబ్రికేషన్ హబ్‌కు ఏపీ ప్రభుత్వం ఆమోదం",
    titleEng: "Andhra Pradesh Ratifies High-Yield Semiconductor Fab Park Layout near Visakhapatnam",
    summaryEng: "A major technology blueprint received cabinet authorization today to establish a designated electronics development zone outside Vizag, backed by localized tax exemptions and modern infrastructure support.",
    category: "Technology",
    audienceRate: 93,
    sources: [
      { name: "Financial Express Technology", link: "https://www.financialexpress.com/industry" }
    ]
  },
  {
    id: "tech-4",
    titleTel: "తదుపరి తరం ఇస్రో సమాచార ఉపగ్రహ పరీక్షలు విజయవంతం",
    titleEng: "ISRO Successfully Wraps Up Payload Frequency Tests for Next-Gen Comsat Mission",
    summaryEng: "Scientists at UR Rao Satellite Centre completed crucial thermovacuum payload certifications today on a high-bandwidth digital communications satellite, scheduled for launch next month.",
    category: "Technology",
    audienceRate: 86,
    sources: [
      { name: "ISRO Space Center Bulletin", link: "https://www.isro.gov.in/news" }
    ]
  },
  {
    id: "tech-5",
    titleTel: "టెక్ మహీంద్రా - జేఎన్‌టీయూ భాగస్వామ్యంతో నూతన ఏఐ ల్యాబ్స్ ఏర్పాటు",
    titleEng: "Tech Mahindra and JNTU Forge Pact to Launch Regional AI Research Laboratories",
    summaryEng: "Tech Mahindra partnered with JNTU today to launch dedicated Research Centers, offering computational rigs to thousands of students focusing on neural network and local language software model designs.",
    category: "Technology",
    audienceRate: 79,
    sources: [
      { name: "JNTU Academic Board", link: "https://jntuh.ac.in/collaborations" }
    ]
  },
  {
    id: "tech-6",
    titleTel: "ప్రాంతీయ భాషల కోసం ఓపెన్ఏఐ కొత్త వాయిస్ మోడల్స్ ఆవిష్కరణ",
    titleEng: "OpenAI Launches Advanced Indian Dialect Neural Synthesizers for Voice Assistants",
    summaryEng: "OpenAI expanded its API library today, rolling out ultra-low latency voice parameters tuned extensively in Telugu, Tamil, and Kannada dialects to support conversational apps across rural sectors.",
    category: "Technology",
    audienceRate: 92,
    sources: [
      { name: "OpenAI Developer News", link: "https://openai.com/blog" }
    ]
  },
  {
    id: "tech-7",
    titleTel: "హైదరాబాద్ వినియోగదారులను టార్గెట్ చేస్తున్న నూతన మాల్వేర్: సైబరాబాద్ పోలీసుల హెచ్చరిక",
    titleEng: "Cyberabad Police Sound Red Alerts Over 'Kira' Android Trojan targeting Bank Apps",
    summaryEng: "State cyber security divisions detected a localized Trojan campaign today, advising mobile users to immediately avoid installing third-party keyboard programs distributed outside official stores.",
    category: "Technology",
    audienceRate: 81,
    sources: [
      { name: "Cyberabad Police Safety Portal", link: "https://cyberabadpolice.gov.in/warnings" }
    ]
  },
  {
    id: "tech-8",
    titleTel: "ప్రముఖ ఈవీ కంపెనీ సరికొత్త సాలిడ్-స్టేట్ బ్యాటరీ టెక్నాలజీ ఆవిష్కరణ",
    titleEng: "Aetherial Motors Unveils Breakthrough Solid-State EV Pack for Regional Commutes",
    summaryEng: "A major automotive tech company debuted a solid-state cell array today, claiming 50% lighter layouts and double the range of current standard lithium assemblies in high-heat Indian summers.",
    category: "Technology",
    audienceRate: 84,
    sources: [
      { name: "Automotive India Tech", link: "https://www.autocarindia.com/tech-news" }
    ]
  },
  {
    id: "tech-9",
    titleTel: "గ్రామీణ ప్రాంతీయ ల్యాండింగ్ పోర్టల్స్ కోసం భారీ నిధులను సేకరించిన ఫిన్‌టెక్ స్టార్టప్",
    titleEng: "Rural lending Fintech Startup raises $50M to Deploy Vernacular Loan Processing engines",
    summaryEng: "Fintech innovator 'GrameenPay' secured Series-B funding today to scale automated AI-driven loan verifications across South Indian towns, operating without manual physical documentation requirements.",
    category: "Technology",
    audienceRate: 89,
    sources: [
      { name: "YourStory Fintech Desk", link: "https://yourstory.com/funding" }
    ]
  },
  {
    id: "tech-10",
    titleTel: "గూగుల్ మ్యాప్స్ లో సరికొత్త హీట్‌веవ్ మ్యాప్స్ అప్‌డేట్",
    titleEng: "Google Maps Rolls Out Dynamic Heatwave Warning overlays Across South India Grid",
    summaryEng: "Google rolled out a specialized mobile tracking utility today, alerting commuters to extreme local temperature shifts and providing locations of hydration centers dynamically along their routes.",
    category: "Technology",
    audienceRate: 90,
    sources: [
      { name: "Google India Press Room", link: "https://india.googleblog.com" }
    ]
  },

  // ----------------------------------------
  // CATEGORY: WEATHER (10 Stories)
  // ----------------------------------------
  {
    id: "wea-1",
    titleTel: "చిట్యాలలో 48.3 డిగ్రీల రికార్డు ఉష్ణోగ్రత: ఏపీ విపత్తుల సంస్థ రెడ్ అలర్ట్",
    titleEng: "APSDMA Sounds Heatwave Emergency as Chityala Smashes Record at 48.3 Degrees",
    summaryEng: "An intense, dangerous heatwave continues to envelop parts of Andhra Pradesh. The state's disaster management agency issued extreme weather red alerts, with Chityala recording today's maximum peak temperature.",
    category: "Weather",
    audienceRate: 97,
    sources: [
      { name: "The News Minute AP", link: "https://www.thenewsminute.com/andhra-pradesh" }
    ]
  },
  {
    id: "wea-2",
    titleTel: "తెలంగాణలోకి జూన్ 9 నాటికి ప్రవేశించనున్న రుతుపవనాలు",
    titleEng: "IMD Forecasts Monsoon Arrival in Telangana Delayed Until June 9",
    summaryEng: "The India Meteorological Department (IMD) updated today that the southwest monsoon is progressing slowly across the peninsula and is expected to officially cross into Telangana around June 9, prolonging the dry summer wave.",
    category: "Weather",
    audienceRate: 85,
    sources: [
      { name: "IMD Hyderabad Regional Desk", link: "https://mausam.imd.gov.in/hyderabad" }
    ]
  },
  {
    id: "wea-3",
    titleTel: "రాయలసీమ జిల్లాలో తీవ్ర ఎండలు: ప్రజలు అప్రమత్తంగా ఉండాలని విపత్తుల సంస్థ సూచన",
    titleEng: "Extreme Heatwaves Sweeps Across Rayalaseema mandals; Residents Advised to Stay Indoors",
    summaryEng: "The AP State Disaster Management Authority issued localized warnings today as temperatures consistently crossed 46 degrees in Kadapa and Kurnool. High UV levels were reported during noon hours.",
    category: "Weather",
    audienceRate: 91,
    sources: [
      { name: "Deccan Chronicle AP News", link: "https://www.deccanchronicle.com/andhra-pradesh" }
    ]
  },
  {
    id: "wea-4",
    titleTel: "ఢిల్లీ ఎన్సీఆర్‌లో రికార్డు స్థాయి ఉష్ణోగ్రత: 47.1 డిగ్రీల ఎండలు",
    titleEng: "Delhi NCR Simmers Under Scorching Conditions as Peak Touches 47.1 Degrees",
    summaryEng: "Weather models reported today that intense thermal winds are expected to persist across the national capital region, prompting emergency services to deploy mobile medical units to crowded market locations.",
    category: "Weather",
    audienceRate: 94,
    sources: [
      { name: "NDTV National Weather", link: "https://www.ndtv.com/delhi-news" }
    ]
  },
  {
    id: "wea-5",
    titleTel: "కేరళలో ముందస్తు రుతుపవన జల్లులు: రైతన్నలకు ఊరట",
    titleEng: "Pre-Monsoon Showers Bring Temporary Relief to Central Agricultural Belts in Kerala",
    summaryEng: "Heavy scattered rains hit parts of central Kerala today, offering much-needed relief to tea and cardamom estate owners who had been battling extended dry periods over the last four weeks.",
    category: "Weather",
    audienceRate: 73,
    sources: [
      { name: "Mathrubhumi Regional News", link: "https://www.mathrubhumi.com/environment" }
    ]
  },
  {
    id: "wea-6",
    titleTel: "బంగాళాఖాతంలో అల్పపీడనం ఏర్పడే అవకాశం: వాతావరణ నిపుణుల హెచ్చరిక",
    titleEng: "Meteorologists Alert on Possible Cyclonic Depression Forming in East-Central Bay of Bengal",
    summaryEng: "Radar tracking maps monitored atmospheric disturbances today, indicating a minor low-pressure build-up that could intensify into a cyclonic storm, moving toward coastal regions by next week.",
    category: "Weather",
    audienceRate: 82,
    sources: [
      { name: "Skymet Weather Tracker", link: "https://www.skymetweather.com/marine" }
    ]
  },
  {
    id: "wea-7",
    titleTel: "పశ్చిమ బెంగాల్ లో హఠాత్తుగా కురిసిన భారీ వర్షాలు: నిలిచిన ప్రజాజీవనం",
    titleEng: "Sudden Thunderstorms and Cloudbursts Halt Daily Life in Sub-Himalayan Bengal",
    summaryEng: "Heavy torrential downpours disrupted road networks in hilly sectors of West Bengal today, prompting immediate evacuation alerts for low-lying village environments prone to minor landslides.",
    category: "Weather",
    audienceRate: 71,
    sources: [
      { name: "Anandabazar Patrika Live", link: "https://www.anandabazar.com/west-bengal" }
    ]
  },
  {
    id: "wea-8",
    titleTel: "హైదరాబాద్‌లో వేగంగా పడిపోతున్న భూగర్భ జలాలు: వాటర్ బోర్డు ఆందోళన",
    titleEng: "Hyderabad Ground Water Table Drops by 3 Meters; Board Plans Emergency Water supply",
    summaryEng: "The Hyderabad Metropolitan Water Supply board issued conservation advisories today after surveys indicated sharp depletion across western tech corridors, scheduling immediate emergency tanker fleets.",
    category: "Weather",
    audienceRate: 88,
    sources: [
      { name: "Deccan Chronicle Hyd Desk", link: "https://www.deccanchronicle.com/hyderabad" }
    ]
  },
  {
    id: "wea-9",
    titleTel: "గ్రామీణ జిల్లాల్లో థర్మల్ స్కానింగ్ ప్రారంభించిన ఏపీ విపత్తుల సంస్థ",
    titleEng: "AP Disaster Authority Initiates District-wide Thermal Scanning to Track Sunstrokes",
    summaryEng: "Mobile testing units equipped with digital thermal imagers deployed across five high-risk agricultural zones today, offering swift hydration checks and saline injections to field workers.",
    category: "Weather",
    audienceRate: 75,
    sources: [
      { name: "APSDMA State Bulletin", link: "https://apsdma.ap.gov.in/news" }
    ]
  },
  {
    id: "wea-10",
    titleTel: "రాయలసీమలో రికార్డు స్థాయి యూవీ ఇండెక్స్: చర్మ నిపుణుల ప్రత్యేక సూచనలు",
    titleEng: "Record-High UV Index Monitored Across Rayalaseema; Dermatologists Urge Sunscreen Blocks",
    summaryEng: "Medical experts warned citizens today to avoid direct skin exposure between 11 AM and 3 PM as the UV index climbed to dangerous Levels, highlighting rising skin inflammation risks.",
    category: "Weather",
    audienceRate: 90,
    sources: [
      { name: "Nizam Institute Medical Reports", link: "https://nims.edu.in/health-advisories" }
    ]
  },

  // ----------------------------------------
  // CATEGORY: REGIONAL (10 Stories)
  // ----------------------------------------
  {
    id: "reg-1",
    titleTel: "హైదరాబాద్ మెట్రో రెడ్ లైన్‌లో సాంకేతిక సమస్య: గంటపాటు నిలిచిన రైలు సర్వీసులు",
    titleEng: "Hyderabad Metro Red Line Suffers Overhead Cable Fault, Rapid Service Restored",
    summaryEng: "Hundreds of commuters experienced delay after an electrical transmission disruption halted trains near Ameerpet today. Engineers repaired the supply line, allowing transit to fully normalize within the hour.",
    category: "Regional",
    audienceRate: 93,
    sources: [
      { name: "NTV Telugu News", link: "https://ntvtelugu.com/metro-rail-services" }
    ]
  },
  {
    id: "reg-2",
    titleTel: "జేఈఈ అడ్వాన్స్‌డ్ 2026 ఫలితాలు: శ్రీ చైతన్య విద్యార్థుల ప్రభంజనం",
    titleEng: "JEE Advanced 2026 Results Out: South India Sweeps Top Positions, Hyderabad Dominates",
    summaryEng: "The prestigious JEE Advanced scores were declared today. National top ranks were heavily claimed by elite student groups coaching in Hyderabad, reinforcing the city's status as a major academic incubator.",
    category: "Regional",
    audienceRate: 96,
    sources: [
      { name: "The Hindu Education Desk", link: "https://www.thehindu.com/news/national/telangana" }
    ]
  },
  {
    id: "reg-3",
    titleTel: "ఏపీ-తెలంగాణ హైవేకు ఎన్టీఆర్ పేరు పెట్టాలని పవన్ కళ్యాణ్ ప్రతిపాదన",
    titleEng: "Pawan Kalyan Proposes Naming AP-Telangana Highway After Legend NT Rama Rao",
    summaryEng: "Jana Sena Chief Pawan Kalyan today floated a prominent recommendation to state authorities, urging that the major highway network connecting Andhra Pradesh and Telangana be named in honor of the legendary NT Rama Rao.",
    category: "Regional",
    audienceRate: 95,
    sources: [
      { name: "Sakshi News Telugu", link: "https://telugu.samayam.com/latest-news" }
    ]
  },
  {
    id: "reg-4",
    titleTel: "జమ్మూకశ్మీర్‌లో ఘనంగా ప్రారంభమైన చెర్రీ పండ్ల కోత సీజన్",
    titleEng: "Cherries Harvest Season Commences in J&K, Farmers Eye Lucrative Exports",
    summaryEng: "Orchards across Ganderbal district were abuzz with activity today as the annual sweet cherry harvest started. Cultivators are hoping for smooth transport logistics to supply premium global buyers.",
    category: "Regional",
    audienceRate: 67,
    sources: [
      { name: "UNI Agriculture Bulletin", link: "https://www.uniindia.com/j-and-k-cherry" }
    ]
  },
  {
    id: "reg-5",
    titleTel: "అస్సాం రైఫిల్స్ మరియు ఎన్‌సిడిఎఫ్‌ఐ మధ్య కీలక పాల ఉత్పత్తి ఒప్పందం",
    titleEng: "Assam Rifles Partner with NCDFI to Expand Dairy Infrastructure Across Northeast",
    summaryEng: "A major memorandum of agreement was signed in New Delhi today. The strategic collaboration aims to empower local farming communities and upgrade dairy preservation facilities in hilly environments.",
    category: "Regional",
    audienceRate: 63,
    sources: [
      { name: "National Dairy Federation", link: "https://www.uniindia.com/assam-rifles-ncdfi" }
    ]
  },
  {
    id: "reg-6",
    titleTel: "హైదరాబాద్ రియల్ ఎస్టేట్ రికార్డు నమోదు: విలాసవంతమైన ఇళ్ల కొనుగోళ్లు పెరిగాయి",
    titleEng: "Hyderabad Real Estate Registers All-Time High registrations in High-Value Housing",
    summaryEng: "The state property registration department published financial stats today, revealing a massive 35% surge in multi-crore luxury high-rise property acquisitions within financial corridor locations.",
    category: "Regional",
    audienceRate: 89,
    sources: [
      { name: "Knight Frank Housing Index", link: "https://www.knightfrank.co.in/research" }
    ]
  },
  {
    id: "reg-7",
    titleTel: "తిరుమల కొండపై ఎండల దృష్ట్యా ప్రత్యేక వసతులు కల్పించిన టీటీడీ",
    titleEng: "Tirumala TTD Deploys Shaded Footpaths and Cool-Gel Paint coatings for Summer Rush",
    summaryEng: "Tirumala temple authorities finished painting key queue lanes with heat-reflecting technology today, ensuring thousands of barefoot devotees are protected from high path temperatures during peak hours.",
    category: "Regional",
    audienceRate: 91,
    sources: [
      { name: "TTD Devasthanams Media Board", link: "https://www.tirumala.org/news" }
    ]
  },
  {
    id: "reg-8",
    titleTel: "రక్షిత తాగునీటి వ్యవస్థ పూర్తి చేయడానికి నిధులు కేటాయించిన తెలంగాణ ప్రభుత్వం",
    titleEng: "Telangana Cabinet Allocates Rs 500 Crore to Complete Rural Water Supply networks",
    summaryEng: "The state finance department released targeted treasury payouts today to accelerate pipelines in critical dry blocks, aiming to secure daily tap water to 3,400 rural villages by the end of July.",
    category: "Regional",
    audienceRate: 84,
    sources: [
      { name: "Telangana Government Budget Cell", link: "https://telangana.gov.in/budget" }
    ]
  },
  {
    id: "reg-9",
    titleTel: "జూన్ 3 నేటి ద్వాదశ రాశిఫలాలు: హంస రాజయోగంతో ఈ రాశుల వారికి అదృష్టం",
    titleEng: "Daily Astrological Alignments: Hansa Rajyoga Brings Career Growth Today",
    summaryEng: "A rare and highly auspicious celestial conjunction involving Jupiter's transit through Cancer was celebrated across regional temples today, with scholars forecasting rapid career turnarounds.",
    category: "Regional",
    audienceRate: 94,
    sources: [
      { name: "Samayam Astrology Section", link: "https://telugu.samayam.com/astrology" }
    ]
  },
  {
    id: "reg-10",
    titleTel: "ఈనాడు దినపత్రిక నేటి ద్వాదశ రాశి ఫలాలు ప్రచురణ",
    titleEng: "Eenadu Publishes Comprehensive Zodiac Assessments for Today's Activities",
    summaryEng: "A major printed forecast released early today by the regional publication outlined critical physical wellness, legal considerations, and investment timelines for all 12 sun signs.",
    category: "Regional",
    audienceRate: 88,
    sources: [
      { name: "Eenadu Daily Print Edition", link: "https://www.eenadu.net/telugu-news" }
    ]
  }
];

// ==========================================================
// DYNAMIC PIPELINE SCHEDULING ENGINE
// Automatically populates current system dates & relative hours
// ==========================================================
const generateDynamicStories = (): Story[] => {
  const currentDateStr = getFormattedCurrentDate();
  const now = new Date();

  return RAW_STORIES_TEMPLATES.map((story, index) => {
    // Generate unique rolling timestamps sequentially to guarantee cronological authenticity.
    // Index 0 represents current time (Just Now). Subsequent indices decrement progressively.
    const minutesToSubtract = index * 14 + Math.floor(Math.random() * 8); 
    const targetTime = new Date(now.getTime() - minutesToSubtract * 60 * 1000);

    const formattedHour = targetTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    const epochTime = targetTime.getTime();

    // Map source models with dynamic dates matching the publication timelines
    const dynamicSources = story.sources.map(src => ({
      ...src,
      publishedDate: `${currentDateStr}, ${formattedHour} IST`
    }));

    return {
      ...story,
      date: currentDateStr,
      hour: formattedHour,
      epochTime,
      sources: dynamicSources
    };
  });
};

export default function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  
  // Real-time tracking of runtime variables
  const [liveDateStamp, setLiveDateStamp] = useState(getFormattedCurrentDate());
  const [liveTeluguDateStamp, setLiveTeluguDateStamp] = useState(getTeluguCurrentDate());
  const [auditStats, setAuditStats] = useState({ 
    totalAudited: 0, 
    liveFf: 0, 
    timestampLimit: "" 
  });

  // Load dynamically scheduled parameters on mount
  useEffect(() => {
    runInternalAuditAndLoad();
    
    // Interval check to keep system stamps aligned if user leaves tab active
    const timer = setInterval(() => {
      setLiveDateStamp(getFormattedCurrentDate());
      setLiveTeluguDateStamp(getTeluguCurrentDate());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const runInternalAuditAndLoad = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      // Calculate live dynamic dataset based on exact user timestamp
      const dynamicPool = generateDynamicStories();
      const rawTotal = dynamicPool.length;
      
      // Sort chronologically (FRESHEST AT THE TOP)
      const sortedPool = [...dynamicPool].sort((a, b) => b.epochTime - a.epochTime);

      // Random Shuffler: Shuffles the deep 62 dynamic pool to secure 30 unique stories on every click
      const shuffled = sortedPool
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      // Slice out exactly 30 high-density records as required
      const auditedSelection = shuffled.slice(0, 30);

      // Resort the active 30 items chronologically so the list remains logical
      const finalizedTimeline = [...auditedSelection].sort((a, b) => b.epochTime - a.epochTime);

      setStories(finalizedTimeline);
      setSelectedStory(finalizedTimeline[0] || null);
      
      // Update global audit log to reflect live user system parameters
      const currentLabel = getFormattedCurrentDate();
      setLiveDateStamp(currentLabel);
      setLiveTeluguDateStamp(getTeluguCurrentDate());

      setAuditStats({
        totalAudited: rawTotal,
        liveFf: finalizedTimeline.length,
        timestampLimit: `Strictly Current Date Only: ${currentLabel}`
      });
      
      setIsRefreshing(false);
    }, 500);
  };

  const handleCopyLink = (text: string, idKey: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => triggerCopyFeedback(idKey))
        .catch(() => fallbackCopy(text, idKey));
    } else {
      fallbackCopy(text, idKey);
    }
  };

  const fallbackCopy = (text: string, idKey: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; 
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      triggerCopyFeedback(idKey);
    } catch (err) {
      console.error("Manual fallback copying unsuccessful", err);
    }
    document.body.removeChild(textArea);
  };

  const triggerCopyFeedback = (idKey: string) => {
    setCopiedStates((prev) => ({ ...prev, [idKey]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [idKey]: false }));
    }, 1500);
  };

  const handleLaunchGemini = (story: Story | null) => {
    if (!story) return;

    const basePrompt = `System Guidance: Content Creator Agent
Context: Strictly Dated ${liveDateStamp}
Breaking Title: ${story.titleEng}
Telugu Headline: ${story.titleTel}
Synthesized Summary: ${story.summaryEng}

Source Reference Links:
${story.sources.map((src) => `- ${src.name}: ${src.link} (Published: ${src.publishedDate})`).join('\n')}

Actionable Request:
Using the custom Gem parameters, generate high-impact media copy, localized Telugu summaries, and engaging social posts. Align all statements strictly with the provided source reference links.`;

    const encodedPrompt = encodeURIComponent(basePrompt);
    const targetGemUrl = `https://gemini.google.com/gem/1Bad-9bFYlSJ95MToqLeSuZZXtgp1DoHg?usp=sharing&prompt=${encodedPrompt}`;
    window.open(targetGemUrl, "_blank");
  };

  const filteredStoriesList = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    // Search scans through the entirety of the 60 item master pool to maintain structural integrity
    const dynamicPool = generateDynamicStories();
    const targetSet = query ? dynamicPool : stories;

    return targetSet.filter((story) => {
      const matchesCategory = selectedCategory === "All" || story.category === selectedCategory;
      const matchesSearch = 
        story.titleEng.toLowerCase().includes(query) ||
        story.titleTel.toLowerCase().includes(query) ||
        story.summaryEng.toLowerCase().includes(query) ||
        story.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [stories, selectedCategory, searchTerm]);

  const categories = ["All", "Politics", "Entertainment", "Business", "Technology", "Weather", "Regional"];

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case "Politics": return <Globe className="w-3.5 h-3.5 text-blue-400" />;
      case "Entertainment": return <Film className="w-3.5 h-3.5 text-rose-400" />;
      case "Business": return <Briefcase className="w-3.5 h-3.5 text-emerald-400" />;
      case "Technology": return <Cpu className="w-3.5 h-3.5 text-violet-400" />;
      case "Weather": return <CloudSun className="w-3.5 h-3.5 text-amber-400" />;
      default: return <MapPin className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      
      {/* Dynamic Header Block */}
      <header className="flex-none bg-slate-900/90 border-b border-slate-800/80 py-2.5 px-5 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-tr from-amber-500 to-rose-500 p-1.5 rounded-lg shadow-md shadow-rose-500/10">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent m-0">
              Content Factory
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Telugu Narrative Intelligence & Dynamic News Feed</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Date Badge (Calculated Dynamically based on current user date) */}
          <div className="bg-slate-950/70 border border-slate-800 text-[10px] px-3 py-1 rounded-full flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300 font-semibold tracking-wider font-mono">
              Live: {liveDateStamp} ({liveTeluguDateStamp})
            </span>
          </div>

          <button 
            onClick={runInternalAuditAndLoad}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-xs px-3 py-1.5 rounded-md shadow-md transition-all duration-150 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Feed
          </button>
        </div>
      </header>

      {/* Audit Pipeline Stats Notification Banner */}
      <div className="flex-none bg-slate-900/40 border-b border-slate-900 py-1 px-5 flex justify-between items-center text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Active Daily Database: <strong className="text-emerald-400 font-bold">{auditStats.totalAudited}</strong> Stories.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800 text-[9px]">
            Audit Filter: {auditStats.timestampLimit}
          </span>
          <span className="text-slate-400">Showing {auditStats.liveFf} Audited Streams</span>
        </div>
      </div>

      {/* Dynamic Filter / Search Bar Block */}
      <div className="flex-none bg-slate-900/20 border-b border-slate-900/80 py-2 px-5 flex flex-wrap gap-3 items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search today's articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-xs py-1.5 pl-8 pr-3 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="absolute right-2.5 top-2">
              <X className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
            </button>
          )}
        </div>

        <div className="flex gap-1 overflow-x-auto py-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                selectedCategory === cat 
                  ? "bg-slate-800 text-amber-400 border border-amber-500/20 font-bold"
                  : "bg-slate-950/20 text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Grid Layout: Widescreen Adaptive Frame */}
      <main className="flex-1 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Pane: Sequential Stream Listings */}
        <section className="w-full md:w-[380px] lg:w-[420px] xl:w-[480px] flex-shrink-0 border-r border-slate-900 flex flex-col overflow-hidden bg-slate-950">
          <div className="flex-none p-2 bg-slate-950/80 border-b border-slate-900/60 flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-indigo-400" />
              Live Stories Cluster ({filteredStoriesList.length})
            </span>
            {searchTerm && (
              <span className="text-[9px] text-amber-500 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">
                Searching Dynamic Database
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-800">
            {filteredStoriesList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="w-8 h-8 text-slate-600 mb-1.5" />
                <p className="text-xs text-slate-400">No active matches found.</p>
              </div>
            ) : (
              filteredStoriesList.map((story) => {
                const isSelected = selectedStory?.id === story.id;
                const isHighImpact = story.audienceRate >= 90;
                
                return (
                  <div
                    key={story.id}
                    onClick={() => setSelectedStory(story)}
                    className={`p-2.5 rounded-lg cursor-pointer transition-all duration-150 border relative group ${
                      isSelected 
                        ? isHighImpact 
                          ? "bg-slate-900 border-rose-500/60 shadow-lg shadow-rose-500/10"
                          : "bg-slate-900 border-amber-500/40 shadow-md shadow-amber-500/5"
                        : isHighImpact 
                          ? "bg-slate-900/40 hover:bg-slate-900/60 border-rose-500/20 shadow-sm"
                          : "bg-slate-900/20 hover:bg-slate-900/40 border-slate-800/60"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wider uppercase bg-slate-800 text-slate-300 flex items-center gap-1">
                          {getCategoryIcon(story.category)}
                          {story.category}
                        </span>
                        
                        {isHighImpact && (
                          <span className="text-[8px] bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded font-bold border border-rose-500/20 flex items-center gap-0.5 animate-pulse">
                            <TrendingUp className="w-2 h-2" />
                            TOP {story.audienceRate}%
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-slate-500 text-[9px]">
                        <Clock className="w-2.5 h-2.5 text-slate-400" />
                        <span>Today, {story.hour}</span>
                      </div>
                    </div>

                    <h3 className="text-slate-200 font-extrabold text-xs leading-snug group-hover:text-white transition-colors mb-1">
                      {story.titleEng}
                    </h3>

                    <h4 className="text-amber-400/90 font-medium text-[11px] leading-snug border-t border-slate-800/40 pt-1.5 mb-2 font-telugu">
                      {story.titleTel}
                    </h4>

                    {/* Exposing source URLs directly inside the list view cards with copy options */}
                    <div className="space-y-1 bg-slate-950/70 p-1.5 rounded border border-slate-900/60">
                      {story.sources.map((src, sIdx) => {
                        const copyId = `card-${story.id}-${sIdx}`;
                        return (
                          <div key={sIdx} className="text-[10px] leading-tight border-b border-slate-900/40 pb-1 last:border-0 last:pb-0">
                            <div className="flex justify-between items-center text-[9px] text-slate-400 mb-0.5">
                              <span className="font-semibold text-slate-300">{src.name}</span>
                              <span className="font-mono text-[8px]">{src.publishedDate}</span>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-slate-500 font-mono text-[8px] truncate block max-w-[210px]">
                                {src.link}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyLink(src.link, copyId);
                                }}
                                className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex-shrink-0 cursor-pointer"
                                title="Copy source URL"
                              >
                                {copiedStates[copyId] ? (
                                  <Check className="w-2.5 h-2.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-2.5 h-2.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Right Pane: Main reading focus area, fills all remaining widescreen monitor space */}
        <section className="flex-1 flex flex-col overflow-hidden bg-slate-900/10">
          {selectedStory ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              
              <div className="flex-none p-3 bg-slate-950/30 border-b border-slate-900 flex justify-between items-center">
                <span className="text-[10px] uppercase font-extrabold text-amber-500 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Synthesis Workspace
                </span>
                <span className="text-[9px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono">
                  {selectedStory.category} ID: {selectedStory.id}
                </span>
              </div>

              {/* Detail view content scrolling pane */}
              <div className="flex-1 overflow-y-auto p-5 lg:p-7 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-black text-slate-100 leading-tight flex-1">
                      {selectedStory.titleEng}
                    </h2>
                    
                    {selectedStory.audienceRate >= 90 && (
                      <div className="flex-shrink-0 bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-black text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md shadow-rose-500/10">
                        <Award className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                        <span>HIGH ENGAGEMENT ({selectedStory.audienceRate}%)</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-l-2 border-amber-500 pl-3 py-0.5">
                    <p className="text-sm md:text-base lg:text-lg font-bold text-amber-400 leading-normal font-telugu">
                      {selectedStory.titleTel}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/80 rounded-lg p-3.5 border border-slate-850/60 space-y-1.5">
                  <h4 className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">
                    Verified Narrative Summary (Synthesized)
                  </h4>
                  <p className="text-xs md:text-sm lg:text-base text-slate-300 leading-relaxed">
                    {selectedStory.summaryEng}
                  </p>
                </div>

                {/* Listing detailed references with copy features */}
                <div className="space-y-2">
                  <h4 className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">
                    Source Outlets ({selectedStory.sources.length})
                  </h4>
                  
                  <div className="space-y-2">
                    {selectedStory.sources.map((src, sIdx) => {
                      const copyId = `details-${selectedStory.id}-${sIdx}`;
                      return (
                        <div 
                          key={sIdx} 
                          className="bg-slate-950/50 border border-slate-850/80 p-3 rounded-lg flex flex-col justify-between gap-2 hover:bg-slate-950/85 transition-colors"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-200 flex items-center gap-1.5">
                              {getCategoryIcon(selectedStory.category)}
                              {src.name}
                            </span>
                            <span className="text-[9px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400 font-mono">
                              {src.publishedDate}
                            </span>
                          </div>
                          
                          {/* Exact full link display box */}
                          <div className="bg-slate-900/60 p-2 rounded border border-slate-850 flex items-center justify-between gap-3">
                            <span className="text-[10px] text-slate-400 font-mono break-all select-all block">
                              {src.link}
                            </span>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <button
                                onClick={() => handleCopyLink(src.link, copyId)}
                                className="p-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[9px] text-slate-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                                title="Copy source link"
                              >
                                {copiedStates[copyId] ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400 text-[8px]">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 text-slate-400" />
                                    <span className="text-[8px]">Copy</span>
                                  </>
                                )}
                              </button>

                              <a
                                href={src.link}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-slate-950 hover:bg-slate-800 border border-slate-800 p-1 rounded transition-colors"
                                title="Visit original portal"
                              >
                                <ExternalLink className="w-3 h-3 text-slate-400" />
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dedicated Gemini Write Now Button Integration */}
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="bg-gradient-to-r from-indigo-950/20 to-blue-950/20 border border-indigo-500/10 rounded-lg p-3.5 flex justify-between items-center gap-3">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        AI Generation Engine
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        Launch this verified story and source links directly into your custom Gem.
                      </p>
                    </div>

                    <button
                      onClick={() => handleLaunchGemini(selectedStory)}
                      className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-extrabold text-xs tracking-wider px-5 py-2.5 rounded shadow-md flex items-center justify-center gap-1.5 transition-all transform active:scale-95 flex-shrink-0 cursor-pointer"
                    >
                      Write Now
                      <ChevronRight className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <Sparkles className="w-10 h-10 text-slate-700 animate-pulse mb-2" />
              <p className="text-slate-400 text-xs font-bold">Select an audited news stream to launch synthesis</p>
            </div>
          )}
        </section>

      </main>

      {/* Footer bar */}
      <footer className="flex-none bg-slate-950 border-t border-slate-900 py-2 px-5 flex justify-between items-center text-[9px] text-slate-500">
        <div>Content Factory © 2026. All operations running dynamically.</div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Database: Connected (Supabase Free Tier)
          </span>
          <span>|</span>
          <span>Local Engine: Ollama Active</span>
        </div>
      </footer>

    </div>
  );
}
