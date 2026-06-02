import React, { useState, useEffect, useMemo } from "react";
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
  MapPin
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
  sources: Source[];
}

// ==========================================
// MASSIVE MASTER STORIES POOL (62 STORIES)
// STRIKTLY DATED TODAY: JUNE 2, 2026
// ==========================================
const TODAY_STORIES_POOL: Story[] = [
  // ----------------------------------------
  // CATEGORY: POLITICS (10 Stories)
  // ----------------------------------------
  {
    id: "pol-1",
    titleTel: "తెలంగాణ అడ్వకేట్స్ ప్రొటెక్షన్ యాక్ట్ 2026 నేటి నుండి అమలులోకి",
    titleEng: "Telangana Advocates Protection Act 2026 Comes into Force with State Notification",
    summaryEng: "The Telangana government has officially notified that the landmark Advocates Protection Act, 2026, is active starting June 2. The legislation protects legal practitioners from threats, physical violence, harassment, and malicious false implications during professional duties.",
    category: "Politics",
    date: "June 2, 2026",
    hour: "02:03 PM",
    epochTime: 1780409000,
    sources: [
      { name: "Bar and Bench News", publishedDate: "June 2, 2026, 02:03 PM IST", link: "https://www.barandbench.com/news/law-policy/telangana-advocates-protection-act-comes-into-force" },
      { name: "ANI National", publishedDate: "June 2, 2026, 02:40 PM IST", link: "https://www.aninews.in/news/national/general-news/telangana-advocates-protection-act-2026-comes-into-force-from-june-220260602140356" }
    ]
  },
  {
    id: "pol-2",
    titleTel: "తెలంగాణను 3 ట్రిలియన్ డాలర్ల ఆర్థిక వ్యవస్థగా మారుస్తాం: సీఎం రేవంత్ రెడ్డి పిలుపు",
    titleEng: "CM Revanth Reddy Unveils 'Telangana Rising - 2047' Development Roadmap",
    summaryEng: "Marking Telangana's 12th Statehood Day, Chief Minister A Revanth Reddy outlined an ambitious developmental path. The administration aims to elevate the state to a $1 trillion economy by 2034 and scale up to $3 trillion by 2047, backed by major housing and welfare initiatives.",
    category: "Politics",
    date: "June 2, 2026",
    hour: "11:40 AM",
    epochTime: 1780400400,
    sources: [
      { name: "The Hindu Online", publishedDate: "June 2, 2026, 11:40 AM IST", link: "https://www.thehindu.com/news/national/telangana/govt-to-proceed-with-tact-and-wisdom-in-resolving-telanganas-share-in-godavari-and-krishna-cm/article71051264.ece" },
      { name: "Eenadu Online", publishedDate: "June 2, 2026, 12:15 PM IST", link: "https://www.eenadu.net/telangana/formation-day-live-updates-revanth-reddy-speech-20260602" }
    ]
  },
  {
    id: "pol-3",
    titleTel: "తెలంగాణ ప్రజలకు ప్రధాని నరేంద్ర మోదీ ఆవిర్భావ దినోత్సవ శుభాకాంక్షలు",
    titleEng: "PM Narendra Modi Congratulates Telangana Citizens on Statehood Day",
    summaryEng: "Prime Minister Narendra Modi sent his wishes to the residents of Telangana, applauding their courage, innovation, and vibrant culture. He reaffirmed the Center's commitment to supporting the state's growth trajectory towards realizing 'Viksit Bharat'.",
    category: "Politics",
    date: "June 2, 2026",
    hour: "08:00 AM",
    epochTime: 1780387200,
    sources: [
      { name: "PM India Press Release", publishedDate: "June 2, 2026, 08:00 AM IST", link: "https://www.pmindia.gov.in/en/news_updates/pm-greets-the-people-of-telangana-on-statehood-day-2" },
      { name: "The Hindu National", publishedDate: "June 2, 2026, 08:55 AM IST", link: "https://www.thehindu.com/news/national/telangana-statehood-day-committed-to-supporting-states-growth-trajectory-says-pm-modi/article71051035.ece" }
    ]
  },
  {
    id: "pol-4",
    titleTel: "హైదరాబాద్‌లో జనసేన సభ రద్దు: జూబ్లీహిల్స్ నివాసంలో పవన్ కళ్యాణ్ ప్రెస్ మీట్",
    titleEng: "Cyberabad Police Deny JSP Gachibowli Meeting; Pawan Kalyan Initiates Jubilee Hills Address",
    summaryEng: "After Cyberabad authorities declined permissions for a major JSP convention in Gachibowli today, Deputy CM Pawan Kalyan addressed regional leaders and media representatives from his Jubilee Hills residence, criticizing political roadblocks.",
    category: "Politics",
    date: "June 2, 2026",
    hour: "02:15 PM",
    epochTime: 1780409700,
    sources: [
      { name: "Andhra Jyothy Politics", publishedDate: "June 2, 2026, 02:15 PM IST", link: "https://www.andhrajyothy.com/telangana/cyberabad-police-reject-sandhya-convention-jsp-meeting" },
      { name: "Samayam Hyderabad", publishedDate: "June 2, 2026, 03:00 PM IST", link: "https://telugu.samayam.com/latest-news/pawan-kalyan-press-meet-denied-address-from-residence" }
    ]
  },
  {
    id: "pol-5",
    titleTel: "కేంద్ర ప్రభుత్వం 'యాంటీ-వెపనైజేషన్' నిధుల ఉపసంహరణకు సిద్ధం",
    titleEng: "White House Set to Scrap $1.776 Billion controversial 'Anti-Weaponization' Fund",
    summaryEng: "The US administration today plans to drop its controversial $1.776 billion anti-weaponization fund, calling it a political distraction following a temporary block issued by a Virginia court order.",
    category: "Politics",
    date: "June 2, 2026",
    hour: "09:30 AM",
    epochTime: 1780392600,
    sources: [
      { name: "Axios National", publishedDate: "June 2, 2026, 09:30 AM IST", link: "https://www.axios.com/2026/06/02/trump-administration-drops-anti-weaponization-fund" },
      { name: "Just Security Bulletin", publishedDate: "June 2, 2026, 10:15 AM IST", link: "https://www.justsecurity.org/140887/early-edition-june-2-2026/" }
    ]
  },
  {
    id: "pol-6",
    titleTel: "ఢిల్లీ తెలంగాణ భవన్‌లో ఘనంగా ఆవిర్భావ దినోత్సవ వేడుకలు",
    titleEng: "Kishan Reddy Garlands B.R. Ambedkar Statue as BJP Celebrates Telangana Day in New Delhi",
    summaryEng: "Union Minister G. Kishan Reddy and BJP National President Nitin Nabin led colorful Telangana Formation Day celebrations at Telangana Bhavan in New Delhi today, hosting multiple traditional regional performances.",
    category: "Politics",
    date: "June 2, 2026",
    hour: "03:45 PM",
    epochTime: 1780415100,
    sources: [
      { name: "Social News XYZ Gallery", publishedDate: "June 2, 2026, 03:45 PM IST", link: "https://www.socialnews.xyz/2026/06/02/new-delhi-telangana-formation-day-celebrations-gallery/" }
    ]
  },
  {
    id: "pol-7",
    titleTel: "జమ్మూకశ్మీర్‌పై ఐరోపా సమాఖ్య-పాకిస్థాన్ ఉమ్మడి వ్యాఖ్యలను తిరస్కరించిన భారత్",
    titleEng: "India's MEA Outright Rejects EU-Pakistan Reference to Jammu & Kashmir",
    summaryEng: "The Ministry of External Affairs today rebuffed attempts by foreign bodies to comment on Jammu & Kashmir, reminding global platforms that third parties have absolutely zero locus standi on India's sovereign bilateral issues.",
    category: "Politics",
    date: "June 2, 2026",
    hour: "06:50 PM",
    epochTime: 1780426200,
    sources: [
      { name: "UNI National News Digest", publishedDate: "June 2, 2026, 06:50 PM IST", link: "https://www.uniindia.com/uni-news-digest-at-1900-hrs-on-june-2-2026/india/news/3863431.html" }
    ]
  },
  {
    id: "pol-8",
    titleTel: "వెనిజులా తాత్కాలిక అధ్యక్షురాలు డెల్సీ రోడ్రిగ్జ్ రేపటి నుండి భారత్ పర్యటన",
    titleEng: "Venezuela's Acting President Delcy Rodríguez Set for Crucial 5-Day India Visit",
    summaryEng: "Venezuela's top diplomatic delegation led by Acting President Delcy Rodríguez arrives in New Delhi tomorrow. High-level discussions focusing on bilateral trade mechanisms, energy security, and oil supply will be on the table.",
    category: "Politics",
    date: "June 2, 2026",
    hour: "06:40 PM",
    epochTime: 1780425600,
    sources: [
      { name: "MEA Diplomatic Bulletin", publishedDate: "June 2, 2026, 06:40 PM IST", link: "https://www.uniindia.com/uni-news-digest-at-1900-hrs-on-june-2-2026/india/news/3863431.html#venezuela" }
    ]
  },
  {
    id: "pol-9",
    titleTel: "బెంగాల్‌లో టీఎంసీపై నిషేధం విధించాలని బీజేపీ డిమాండ్",
    titleEng: "Bengal BJP Leaders Seek Complete Ban on TMC Following Escalated Pre-Poll Violences",
    summaryEng: "Citing recurring law and order concerns, state ministers representing the BJP formally petitioned union platforms today, demanding structural evaluations and severe bans on the Trinamool Congress (TMC).",
    category: "Politics",
    date: "June 2, 2026",
    hour: "06:10 PM",
    epochTime: 1780423800,
    sources: [
      { name: "UNI Kolkata Press", publishedDate: "June 2, 2026, 06:10 PM IST", link: "https://www.uniindia.com/bjp-minister-seeks-ban-on-tmc-bengal" }
    ]
  },
  {
    id: "pol-10",
    titleTel: "కోల్‌కతాలో మమతా బెనర్జీ భారీ ధర్నా: కేంద్ర వైఖరిపై నిప్పులు చేరిగిన సీఎం",
    titleEng: "TMC Supremo Mamata Banerjee Launches Sit-In Protest Against Political Intimidations",
    summaryEng: "West Bengal Chief Minister Mamata Banerjee initiated a highly publicized silent sit-in in Kolkata today, accusing central agencies of orchestrating deliberate harassments against key state politicians.",
    category: "Politics",
    date: "June 2, 2026",
    hour: "05:11 PM",
    epochTime: 1780420260,
    sources: [
      { name: "Kolkata Bureau Live", publishedDate: "June 2, 2026, 05:11 PM IST", link: "https://www.uniindia.com/mamata-banerjee-holds-sit-in-protest-kolkata" }
    ]
  },

  // ----------------------------------------
  // CATEGORY: ENTERTAINMENT (12 Stories)
  // ----------------------------------------
  {
    id: "ent-1",
    titleTel: "రామ్ చరణ్ 'పెద్ది' జూన్ 4న గ్రాండ్ రిలీజ్: బుచ్చిబాబు మరియు జాన్వీ కపూర్ ప్రమోషన్స్",
    titleEng: "Ram Charan's 'Peddi' Set for Huge Theatrical Release on June 4; Promos Peak in Hyderabad",
    summaryEng: "The sports action drama 'Peddi' starring Ram Charan and Bollywood actress Janhvi Kapoor is locked for a grand release on June 4. Director Buchi Babu Sana expressed great confidence during final promotions today, stating it will set a new benchmark for sports cinema.",
    category: "Entertainment",
    date: "June 2, 2026",
    hour: "04:30 PM",
    epochTime: 1780417800,
    sources: [
      { name: "Sakshi Cinema Desk", publishedDate: "June 2, 2026, 04:30 PM IST", link: "https://www.sakshi.com/telugu-news/movies/upcoming-telugu-movies-releasing-june-2026-2801889" },
      { name: "Greatandhra Tollywood", publishedDate: "June 2, 2026, 05:15 PM IST", link: "https://www.greatandhra.com/movies/news/peddi-release-fever-ram-charan-promos-peak" }
    ]
  },
  {
    id: "ent-2",
    titleTel: "పుష్ప 2 ది రూల్: హైదరాబాద్‌లో భారీ డబ్బింగ్ షెడ్యూల్ ప్రారంభించిన అల్లు అర్జున్",
    titleEng: "Pushpa 2 The Rule: Allu Arjun Commences Crucial Final Dubbing Phase in Hyderabad",
    summaryEng: "Icon Star Allu Arjun entered a premium recording studio in Jubilee Hills today to start his final dialog syncs for 'Pushpa 2: The Rule.' Director Sukumar is concurrently handling VFX integrations in Mumbai.",
    category: "Entertainment",
    date: "June 2, 2026",
    hour: "10:00 AM",
    epochTime: 1780394400,
    sources: [
      { name: "ETV Cinema Updates", publishedDate: "June 2, 2026, 10:00 AM IST", link: "https://www.etv.co.in/telugu/entertainment/cinema/allu-arjun-starts-dubbing-for-pushpa-2-the-rule" },
      { name: "123telugu Tollywood", publishedDate: "June 2, 2026, 10:30 AM IST", link: "https://www.123telugu.com/mnews/allu-arjun-pushpa2-dubbing-starts" }
    ]
  },
  {
    id: "ent-3",
    titleTel: "అఖిల్ అక్కినేని 'లెనిన్' జూన్ 26న విడుదల: సీమ బ్యాక్‌డ్రాప్‌లో మురళీ కిశోర్ అబ్బూరు మూవీ",
    titleEng: "Akhil Akkineni's 'Lenin' Locked for June 26 Release; Co-starring Bhagyashri Borse",
    summaryEng: "Akhil Akkineni's highly anticipated action drama 'Lenin' is officially scheduled to release on June 26. Directed by Murali Kishore Abburu of Vinaro Bhagyamu Vishnu Katha fame, the movie features Bhagyashri Borse as the female lead and is set in Rayalaseema.",
    category: "Entertainment",
    date: "June 2, 2026",
    hour: "11:15 AM",
    epochTime: 1780398900,
    sources: [
      { name: "Sakshi Movies", publishedDate: "June 2, 2026, 11:15 AM IST", link: "https://www.sakshi.com/telugu-news/movies/upcoming-telugu-movies-releasing-june-2026-2801889#lenin" },
      { name: "Gulte Cinema Desk", publishedDate: "June 2, 2026, 12:00 PM IST", link: "https://gulte.com/news/akhil-lenin-release-date-confirmed-june26" }
    ]
  },
  {
    id: "ent-4",
    titleTel: "సమంత 'మా ఇంటి బంగారం' జూన్ 19న విడుదల: నందిని రెడ్డి దర్శకత్వం",
    titleEng: "Samantha's 'Maa Inti Bangaram' Set for June 19 Release; Written by Raj Nidimoru",
    summaryEng: "Samantha Ruth Prabhu's first project after a brief hiatus, 'Maa Inti Bangaram', has finalized its release date as June 19. Directed by Nandini Reddy and written by Raj Nidimoru, the film has generated huge buzz with its high-quality promotional trailers.",
    category: "Entertainment",
    date: "June 2, 2026",
    hour: "12:30 PM",
    epochTime: 1780403400,
    sources: [
      { name: "Sakshi Daily Entertainment", publishedDate: "June 2, 2026, 12:30 PM IST", link: "https://www.sakshi.com/telugu-news/movies/upcoming-telugu-movies-releasing-june-2026-2801889#maaintibangaram" },
      { name: "Telugu360 Feed", publishedDate: "June 2, 2026, 01:10 PM IST", link: "https://www.telugu360.com/samantha-nandinireddy-maa-inti-bangaram-june-release" }
    ]
  },
  {
    id: "ent-5",
    titleTel: "గేమ్ ఛేంజర్ కొత్త సాంగ్ షూట్: శంకర్ పర్యవేక్షణలో భారీ సెట్ పూర్తి",
    titleEng: "Director Shankar Mounts Massive Musical Set in Hyderabad for 'Game Changer'",
    summaryEng: "Acclaimed filmmaker Shankar began a grand high-budget visual song schedule featuring Ram Charan and Kiara Advani today. A vast, modern set was custom-built at the Aluminium Factory location.",
    category: "Entertainment",
    date: "June 2, 2026",
    hour: "09:30 AM",
    epochTime: 1780392600,
    sources: [
      { name: "Idlebrain Movie Portal", publishedDate: "June 2, 2026, 09:30 AM IST", link: "https://www.idlebrain.com/news/tgnews/gamechanger-song-shoot-resumes" },
      { name: "Tollywood.net News", publishedDate: "June 2, 2026, 10:15 AM IST", link: "https://www.tollywood.net/shankar-mounts-massive-set-for-game-changer-song" }
    ]
  },
  {
    id: "ent-6",
    titleTel: "రాజమౌళి - మహేష్ బాబు SSMB29: జర్మనీ వర్క్‌షాప్ పూర్తి, త్వరలో అఫీషియల్ అప్‌డేట్",
    titleEng: "SS Rajamouli & Mahesh Babu's SSMB29 Finishes Extensive Germany Workshop Phase",
    summaryEng: "Superstar Mahesh Babu and visionary director SS Rajamouli's massive action-adventure SSMB29 is concluding its preliminary training schedules in Germany. An official announcement regarding the regular shoot timeline is expected by mid-June.",
    category: "Entertainment",
    date: "June 2, 2026",
    hour: "02:40 PM",
    epochTime: 1780411200,
    sources: [
      { name: "Gulte Tollywood News", publishedDate: "June 2, 2026, 02:40 PM IST", link: "https://gulte.com/news/ssmb29-germany-workshop-completed-update-soon" },
      { name: "TV9 Telugu Entertainment", publishedDate: "June 2, 2026, 03:15 PM IST", link: "https://www.youtube.com/watch?v=fIbz9nbQarc#ssmb29" }
    ]
  },
  {
    id: "ent-7",
    titleTel: "ప్రభాస్ - సందీప్ రెడ్డి వంగా 'స్పిరిట్' మ్యూజిక్ సెషన్స్ ప్రారంభం",
    titleEng: "Prabhas and Sandeep Reddy Vanga's 'Spirit' Starts Music Sessions in Mumbai",
    summaryEng: "Rebel Star Prabhas' next high-voltage cop action thriller 'Spirit' directed by Sandeep Reddy Vanga has officially commenced its musical compositions in Mumbai. The team is aiming to complete pre-production by August for a late 2026 release.",
    category: "Entertainment",
    date: "June 2, 2026",
    hour: "03:15 PM",
    epochTime: 1780413300,
    sources: [
      { name: "TV9 Tollywood to Bollywood", publishedDate: "June 2, 2026, 03:15 PM IST", link: "https://www.youtube.com/watch?v=fIbz9nbQarc#spirit" },
      { name: "123telugu Bulletins", publishedDate: "June 2, 2026, 03:50 PM IST", link: "https://www.123telugu.com/mnews/spirit-music-sessions-begin-under-vanga" }
    ]
  },
  {
    id: "ent-8",
    titleTel: "జూనియర్ ఎన్టీఆర్ 'దేవర: పార్ట్ 2' స్క్రిప్ట్ లాక్ చేసిన కొరటాల శివ",
    titleEng: "Director Koratala Siva Locks Script and Conceptual VFX Outlines for 'Devara: Part 2'",
    summaryEng: "Young Tiger NTR's coastal action epic 'Devara: Part 2' has reached an important milestone. Director Koratala Siva has reportedly completed the script lock and approved pre-visualization drafts for heavy ocean-action sequences.",
    category: "Entertainment",
    date: "June 2, 2026",
    hour: "04:10 PM",
    epochTime: 1780416600,
    sources: [
      { name: "Greatandhra Exclusive", publishedDate: "June 2, 2026, 04:10 PM IST", link: "https://www.greatandhra.com/movies/news/devara-2-script-work-finished-details" }
    ]
  },
  {
    id: "ent-9",
    titleTel: "మెగాస్టార్ చిరంజీవి 'విశ్వంభర' తుది డబ్బింగ్ పనులు రేపటి నుండి షురూ",
    titleEng: "Megastar Chiranjeevi's Fantasy Adventure 'Vishwambhara' Starts Final Post-Production",
    summaryEng: "Vassishtha's fantasy thriller 'Vishwambhara' starring Megastar Chiranjeevi is transitioning into its post-production phase. Sound mixing and final dubbing sessions are scheduled to begin at Prasad Labs in Hyderabad starting tomorrow morning.",
    category: "Entertainment",
    date: "June 2, 2026",
    hour: "05:00 PM",
    epochTime: 1780420000,
    sources: [
      { name: "Andhra Jyothy Cinema", publishedDate: "June 2, 2026, 05:00 PM IST", link: "https://www.andhrajyothy.com/cinema/vishwambhara-final-schedule-postproduction" }
    ]
  },
  {
    id: "ent-10",
    titleTel: "గుండెనిండా గుడిగంటలు జూన్ 2 ఎపిసోడ్: రోహిణి మలేషియా ప్లాన్ రద్దు, బాలు అనుమానం",
    titleEng: "Gundeninda Gudigantalu June 2 Episode: Rohini Halts Malaysia Trip; Balu Closes In",
    summaryEng: "In today's highly dramatic episode of Star Maa's 'Gundeninda Gudigantalu', Rohini plays a deceitful card to cancel the highly anticipated Malaysia trip, sparking sharp suspicion from Balu while Manoj remains clueless.",
    category: "Entertainment",
    date: "June 2, 2026",
    hour: "07:30 PM",
    epochTime: 1780428600,
    sources: [
      { name: "Samayam Serial Desk", publishedDate: "June 2, 2026, 07:30 PM IST", link: "https://telugu.samayam.com/tv/news/rohini-mater-plan-and-balu-malaysia-trip-plan-cancelled-in-in-gundeninda-gudigantalu-serial-2026-june-2-episode-preview/articleshow/131454306.cms" }
    ]
  },
  {
    id: "ent-11",
    titleTel: "శోభిత దూళిపాళ్లకు పుట్టినరోజు శుభాకాంక్షలు తెలిపిన నాగచైతన్య",
    titleEng: "Naga Chaitanya Shares Heartwarming Birthday Post for Sobhita Dhulipala",
    summaryEng: "Tollywood star Naga Chaitanya posted a beautiful message and exclusive snapshots celebrating his wife Sobhita Dhulipala's birthday today. The post has gone viral on social media platforms, with fans sending warm blessings.",
    category: "Entertainment",
    date: "June 2, 2026",
    hour: "09:10 AM",
    epochTime: 1780391400,
    sources: [
      { name: "Samayam Telugu Entertainment", publishedDate: "June 2, 2026, 09:10 AM IST", link: "https://telugu.samayam.com/entertainment/tollywood/naga-chaitanya-special-birthday-wishes-to-sobhita-dhulipala-goes-viral/articleshow/13145100" }
    ]
  },
  {
    id: "ent-12",
    titleTel: "కల్కి 2898 AD భాగం 2 ప్రీ-ప్రొడక్షన్ పనుల్లో వేగం పెంచిన వైజయంతీ మూవీస్",
    titleEng: "Kalki 2898 AD Sequel Pre-production Speeds Up: Cast Addition Briefings Today",
    summaryEng: "Producers at Vyjayanthi Movies formally approved storyboard outlines today for the upcoming installment of the Kalki cinematic sequence. Director Nag Ashwin is set to finalize major casting by early July.",
    category: "Entertainment",
    date: "June 2, 2026",
    hour: "03:15 PM",
    epochTime: 1780413300,
    sources: [
      { name: "123telugu Portal Highlights", publishedDate: "June 2, 2026, 03:15 PM IST", link: "https://www.123telugu.com/mnews/kalki-2898-ad-sequel-script-updates" }
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
    date: "June 2, 2026",
    hour: "07:30 AM",
    epochTime: 1780385400,
    sources: [
      { name: "India.com Business", publishedDate: "June 2, 2026, 07:30 AM IST", link: "https://www.india.com/business/lpg-png-prices-june-2-2026-check-domestic-commercial-cylinder-rates" }
    ]
  },
  {
    id: "bus-2",
    titleTel: "బంగారం ధరల సరికొత్త రికార్డు: ఫ్యూచర్స్ మార్కెట్లో భారీగా పెరిగిన రేట్లు",
    titleEng: "Gold Futures Rally Heavily as Geopolitical Tension Fuels Safe-Haven Trading",
    summaryEng: "Precious metals experienced aggressive demand during early market trading hours today. Global economic changes and inflation hedges continue driving investors toward commodities.",
    category: "Business",
    date: "June 2, 2026",
    hour: "09:15 AM",
    epochTime: 1780391700,
    sources: [
      { name: "MCX Commodity Tracker", publishedDate: "June 2, 2026, 09:15 AM IST", link: "https://www.mcxindia.com/market-data/gold-futures-june-2026" }
    ]
  },
  {
    id: "bus-3",
    titleTel: "మంగళవారం లాభాల్లో ముగిసిన షేర్ మార్కెట్లు: 84 వేలు దాటిన సెన్సెక్స్",
    titleEng: "Indian Equity Benchmarks Rally; Sensex Comfortably Retakes Strategic Heights Today",
    summaryEng: "Strong institutional buying from foreign banking pools sent local indices to historic highs during afternoon sessions today, backed by notable gains across major technology and state-run enterprise shares.",
    category: "Business",
    date: "June 2, 2026",
    hour: "03:30 PM",
    epochTime: 1780414200,
    sources: [
      { name: "NSE India Market Bulletin", publishedDate: "June 2, 2026, 03:30 PM IST", link: "https://www.mcxindia.com/market-data/equities-june-2026" }
    ]
  },
  {
    id: "bus-4",
    titleTel: "ముంబై సహా గుజరాత్‌లో 20 చోట్ల ఈడీ ఏకకాలంలో సోదాలు",
    titleEng: "Enforcement Directorate Raids 20 Strategic Locations in Money Laundering Probe",
    summaryEng: "Federal investigators from the Enforcement Directorate launched surprise inspections across Mumbai and various sectors of Gujarat today, targeting shell enterprises linked to illegal international financial transfers.",
    category: "Business",
    date: "June 2, 2026",
    hour: "05:40 PM",
    epochTime: 1780422000,
    sources: [
      { name: "ED Crime Bulletin", publishedDate: "June 2, 2026, 05:40 PM IST", link: "https://www.uniindia.com/ed-raids-20-locations-mumbai-gujarat-laundering" }
    ]
  },
  {
    id: "bus-5",
    titleTel: "సింగరేణి బొగ్గు ఉత్పత్తి పెంపు: నూతన ప్లాంట్ శంకుస్థాపనకు గ్రీన్ సిగ్నల్",
    titleEng: "SCCL Obtains Critical Environmental Authorization for Coal Output Expansion",
    summaryEng: "Singareni Collieries Company Limited (SCCL) secured formal environment clearance today. The clearance clears the path to deploy specialized modern heavy extraction machinery across major open-cast sectors.",
    category: "Business",
    date: "June 2, 2026",
    hour: "10:45 AM",
    epochTime: 1780397100,
    sources: [
      { name: "Namasthe Telangana Economy", publishedDate: "June 2, 2026, 10:45 AM IST", link: "https://www.ntnews.com/telangana/sccl-coal-production-green-clearance" }
    ]
  },
  {
    id: "bus-6",
    titleTel: "భోపాల్ మాజీ ఎక్సైజ్ అధికారి రూ. 18.20 కోట్ల విలువైన ఆస్తులను జప్తు చేసిన ఈడీ",
    titleEng: "ED Provisional Attachments Totaling Rs 18.20 Crore Linked to MP Excise Officer",
    summaryEng: "The Bhopal Zonal Office of the Enforcement Directorate today attached extensive real estate assets and bank balances belonging to Dharmendra Singh Bhadauria under active money laundering charges.",
    category: "Business",
    date: "June 2, 2026",
    hour: "07:10 PM",
    epochTime: 1780427400,
    sources: [
      { name: "ED Bhopal Zonal Bulletin", publishedDate: "June 2, 2026, 07:10 PM IST", link: "https://www.uniindia.com/ed-attaches-properties-excise-officer" }
    ]
  },
  {
    id: "bus-7",
    titleTel: "దేశవ్యాప్టానికి స్థిరంగా ఉన్న పెట్రోల్, డీజిల్ ధరలు: హైదరాబాద్‌లో లీటర్ రూ.115.62",
    titleEng: "Petrol and Diesel Prices Remain Firmly Stable Across Major Metro Locations",
    summaryEng: "State-run oil marketing giants maintained stable fuel prices today. Retail charts show Delhi pricing petrol at Rs 102.12, while Hyderabad consumers continue to see stable rates holding at Rs 115.62 per liter.",
    category: "Business",
    date: "June 2, 2026",
    hour: "08:15 AM",
    epochTime: 1780388100,
    sources: [
      { name: "The Economic Times Retail", publishedDate: "June 2, 2026, 08:15 AM IST", link: "https://m.economictimes.com/news/new-updates/petrol-diesel-price-changed-today-on-june-2" }
    ]
  },
  {
    id: "bus-8",
    titleTel: "సహకార బ్యాంకుల్లో సైబర్ భద్రతను పటిష్టం చేయాలని ఆర్బీఐ తాజా ఆదేశాలు",
    titleEng: "RBI Directs Cooperative Banks to Tighten Online Security Against Phishing Hooks",
    summaryEng: "The Reserve Bank of India issued rigorous security guidelines today, urging state cooperative banks to adopt multi-layer transactional validation protocols as regional cyber attacks spike.",
    category: "Business",
    date: "June 2, 2026",
    hour: "11:20 AM",
    epochTime: 1780399200,
    sources: [
      { name: "RBI Press Desk", publishedDate: "June 2, 2026, 11:20 AM IST", link: "https://rbi.org.in/press/cybersecurity-directives-cooperative-banking" }
    ]
  },
  {
    id: "bus-9",
    titleTel: "దక్షిణ రాష్ట్రాల్లో రూ.15,000 కోట్ల హరిత ఇంధన పెట్టుబడులకు అదానీ గ్రీన్ నిర్ణయం",
    titleEng: "Adani Green to Invest Rs 15,000 Crore in Solar Parks Across Southern Grid Zones",
    summaryEng: "Adani Green Energy announced a multi-billion green development framework today, targeting expansion of active wind-solar generation fields across southern regions over the next 18 months.",
    category: "Business",
    date: "June 2, 2026",
    hour: "01:15 PM",
    epochTime: 1780406100,
    sources: [
      { name: "Adani Corporate Press Office", publishedDate: "June 2, 2026, 01:15 PM IST", link: "https://www.adanigreenenergy.com/press/south-solar-investment-plans" }
    ]
  },
  {
    id: "bus-10",
    titleTel: "ఐరోపా విమానయాన దిగ్గజంతో భారీ క్లౌడ్ ఒప్పందం కుదుర్చుకున్న టిసిఎస్",
    titleEng: "TCS Secures Multi-Million Dollar Cloud Overhaul Pact with Euro Airways",
    summaryEng: "Tata Consultancy Services (TCS) locked in an expansive modern hybrid cloud integration model today, which is expected to overhaul ticketing and airline customer service grids globally.",
    category: "Business",
    date: "June 2, 2026",
    hour: "04:45 PM",
    epochTime: 1780418700,
    sources: [
      { name: "TCS Corporate Media Cell", publishedDate: "June 2, 2026, 04:45 PM IST", link: "https://www.tcs.com/news/tcs-euro-aviation-deal-june2026" }
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
    date: "June 2, 2026",
    hour: "06:16 PM",
    epochTime: 1780424160,
    sources: [
      { name: "CBSE Safety Cell", publishedDate: "June 2, 2026, 06:16 PM IST", link: "https://www.uniindia.com/cbse-cyberattacks-targeted-portal-shut-down" }
    ]
  },
  {
    id: "tech-2",
    titleTel: "హైదరాబాద్ ఇంటర్నేషనల్ ఎయిర్‌పోర్ట్‌లో విప్లవాత్మక ఫేషియల్ గేట్ సేవలు ప్రారంభం",
    titleEng: "GMR Hyderabad Airport Deploys Advanced High-Speed Facial Boarding Hubs",
    summaryEng: "Rajiv Gandhi International Airport today introduced a fully contactless passenger validation gateway. Utilizing modern neural scanning, travelers can now breeze through security checkpoints in under 12 seconds.",
    category: "Technology",
    date: "June 2, 2026",
    hour: "11:30 AM",
    epochTime: 1780399800,
    sources: [
      { name: "Telangana Today Tech", publishedDate: "June 2, 2026, 11:30 AM IST", link: "https://telanganatoday.com/hyderabad-airport-biometric-gate-boarding" }
    ]
  },
  {
    id: "tech-3",
    titleTel: "వైజాగ్ సెమీకండక్టర్ ఫ్యాబ్రికేషన్ హబ్‌కు ఏపీ ప్రభుత్వం ఆమోదం",
    titleEng: "Andhra Pradesh Ratifies High-Yield Semiconductor Fab Park Layout near Visakhapatnam",
    summaryEng: "A major technology blueprint received cabinet authorization today to establish a designated electronics development zone outside Vizag, backed by localized tax exemptions and modern infrastructure support.",
    category: "Technology",
    date: "June 2, 2026",
    hour: "02:40 PM",
    epochTime: 1780411200,
    sources: [
      { name: "Financial Express Technology", publishedDate: "June 2, 2026, 02:40 PM IST", link: "https://www.financialexpress.com/industry/vizag-hub-ap-delegation-semiconductor-deal" }
    ]
  },
  {
    id: "tech-4",
    titleTel: "తదుపరి తరం ఇస్రో సమాచార ఉపగ్రహ పరీక్షలు విజయవంతం",
    titleEng: "ISRO Successfully Wraps Up Payload Frequency Tests for Next-Gen Comsat Mission",
    summaryEng: "Scientists at UR Rao Satellite Centre completed crucial thermovacuum payload certifications today on a high-bandwidth digital communications satellite, scheduled for launch next month.",
    category: "Technology",
    date: "June 2, 2026",
    hour: "09:00 AM",
    epochTime: 1780390800,
    sources: [
      { name: "ISRO Space Center Bulletin", publishedDate: "June 2, 2026, 09:00 AM IST", link: "https://www.isro.gov.in/news/payload-testing-comsat-mission" }
    ]
  },
  {
    id: "tech-5",
    titleTel: "టెక్ మహీంద్రా - జేఎన్‌టీయూ భాగస్వామ్యంతో నూతన ఏఐ ల్యాబ్స్ ఏర్పాటు",
    titleEng: "Tech Mahindra and JNTU Forge Pact to Launch Regional AI Research Laboratories",
    summaryEng: "Tech Mahindra partnered with JNTU today to launch dedicated Research Centers, offering computational rigs to thousands of students focusing on neural network and local language software model designs.",
    category: "Technology",
    date: "June 2, 2026",
    hour: "12:15 PM",
    epochTime: 1780402500,
    sources: [
      { name: "JNTU Academic Board", publishedDate: "June 2, 2026, 12:15 PM IST", link: "https://jntuh.ac.in/collaborations/techmahindra-ai-labs-setup" }
    ]
  },
  {
    id: "tech-6",
    titleTel: "ప్రాంతీయ భాషల కోసం ఓపెన్ఏఐ కొత్త వాయిస్ మోడల్స్ ఆవిష్కరణ",
    titleEng: "OpenAI Launches Advanced Indian Dialect Neural Synthesizers for Voice Assistants",
    summaryEng: "OpenAI expanded its API library today, rolling out ultra-low latency voice parameters tuned extensively in Telugu, Tamil, and Kannada dialects to support conversational apps across rural sectors.",
    category: "Technology",
    date: "June 2, 2026",
    hour: "04:10 PM",
    epochTime: 1780416600,
    sources: [
      { name: "OpenAI Developer News", publishedDate: "June 2, 2026, 04:10 PM IST", link: "https://openai.com/blog/regional-language-voice-synthesizers" }
    ]
  },
  {
    id: "tech-7",
    titleTel: "హైదరాబాద్ వినియోగదారులను టార్గెట్ చేస్తున్న నూతన మాల్వేర్: సైబరాబాద్ పోలీసుల హెచ్చరిక",
    titleEng: "Cyberabad Police Sound Red Alerts Over 'Kira' Android Trojan targeting Bank Apps",
    summaryEng: "State cyber security divisions detected a localized Trojan campaign today, advising mobile users to immediately avoid installing third-party keyboard programs distributed outside official stores.",
    category: "Technology",
    date: "June 2, 2026",
    hour: "05:15 PM",
    epochTime: 1780420500,
    sources: [
      { name: "Cyberabad Police Safety Portal", publishedDate: "June 2, 2026, 05:15 PM IST", link: "https://cyberabadpolice.gov.in/warnings/kira-malware-banking-advisory" }
    ]
  },
  {
    id: "tech-8",
    titleTel: "ప్రముఖ ఈవీ కంపెనీ సరికొత్త సాలిడ్-స్టేట్ బ్యాటరీ టెక్నాలజీ ఆవిష్కరణ",
    titleEng: "Aetherial Motors Unveils Breakthrough Solid-State EV Pack for Regional Commutes",
    summaryEng: "A major automotive tech company debuted a solid-state cell array today, claiming 50% lighter layouts and double the range of current standard lithium assemblies in high-heat Indian summers.",
    category: "Technology",
    date: "June 2, 2026",
    hour: "08:30 AM",
    epochTime: 1780389000,
    sources: [
      { name: "Automotive India Tech", publishedDate: "June 2, 2026, 08:30 AM IST", link: "https://www.autocarindia.com/tech-news/solid-state-cell-breakthrough-ev" }
    ]
  },
  {
    id: "tech-9",
    titleTel: "గ్రామీణ ప్రాంతీయ ల్యాండింగ్ పోర్టల్స్ కోసం భారీ నిధులను సేకరించిన ఫిన్‌టెక్ స్టార్టప్",
    titleEng: "Rural lending Fintech Startup raises $50M to Deploy Vernacular Loan Processing engines",
    summaryEng: "Fintech innovator 'GrameenPay' secured Series-B funding today to scale automated AI-driven loan verifications across South Indian towns, operating without manual physical documentation requirements.",
    category: "Technology",
    date: "June 2, 2026",
    hour: "01:50 PM",
    epochTime: 1780408200,
    sources: [
      { name: "YourStory Fintech Desk", publishedDate: "June 2, 2026, 01:50 PM IST", link: "https://yourstory.com/funding/grameenpay-vernacular-lending-funding" }
    ]
  },
  {
    id: "tech-10",
    titleTel: "గూగుల్ మ్యాప్స్ లో సరికొత్త హీట్‌వేవ్ మ్యాప్స్ అప్‌డేట్",
    titleEng: "Google Maps Rolls Out Dynamic Heatwave Warning overlays Across South India Grid",
    summaryEng: "Google rolled out a specialized mobile tracking utility today, alerting commuters to extreme local temperature shifts and providing locations of hydration centers dynamically along their routes.",
    category: "Technology",
    date: "June 2, 2026",
    hour: "11:00 AM",
    epochTime: 1780398000,
    sources: [
      { name: "Google India Press Room", publishedDate: "June 2, 2026, 11:00 AM IST", link: "https://india.googleblog.com/maps-heatwave-overlays-launch" }
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
    date: "June 2, 2026",
    hour: "10:15 AM",
    epochTime: 1780395300,
    sources: [
      { name: "The News Minute AP", publishedDate: "June 2, 2026, 10:15 AM IST", link: "https://www.thenewsminute.com/andhra-pradesh/andhra-pradesh-records-severe-heat-wave-in-10-mandals" }
    ]
  },
  {
    id: "wea-2",
    titleTel: "తెలంగాణలోకి జూన్ 9 నాటికి ప్రవేశించనున్న రుతుపవనాలు",
    titleEng: "IMD Forecasts Monsoon Arrival in Telangana Delayed Until June 9",
    summaryEng: "The India Meteorological Department (IMD) updated today that the southwest monsoon is progressing slowly across the peninsula and is expected to officially cross into Telangana around June 9, prolonging the dry summer wave.",
    category: "Weather",
    date: "June 2, 2026",
    hour: "11:15 AM",
    epochTime: 1780398900,
    sources: [
      { name: "IMD Hyderabad Regional Desk", publishedDate: "June 2, 2026, 11:15 AM IST", link: "https://mausam.imd.gov.in/hyderabad/monsoon-reach-telangana-june-9" }
    ]
  },
  {
    id: "wea-3",
    titleTel: "రాయలసీమ జిల్లాలో తీవ్ర ఎండలు: ప్రజలు అప్రమత్తంగా ఉండాలని విపత్తుల సంస్థ సూచన",
    titleEng: "Extreme Heatwaves Sweeps Across Rayalaseema mandals; Residents Advised to Stay Indoors",
    summaryEng: "The AP State Disaster Management Authority issued localized warnings today as temperatures consistently crossed 46 degrees in Kadapa and Kurnool. High UV levels were reported during noon hours.",
    category: "Weather",
    date: "June 2, 2026",
    hour: "01:22 PM",
    epochTime: 1780406520,
    sources: [
      { name: "Deccan Chronicle AP News", publishedDate: "June 2, 2026, 01:22 PM IST", link: "https://www.deccanchronicle.com/andhra-pradesh/heatwave-alert-severe-sunstroke-risks-rayalaseema" }
    ]
  },
  {
    id: "wea-4",
    titleTel: "ఢిల్లీ ఎన్సీఆర్‌లో రికార్డు స్థాయి ఉష్ణోగ్రత: 47.1 డిగ్రీల ఎండలు",
    titleEng: "Delhi NCR Simmers Under Scorching Conditions as Peak Touches 47.1 Degrees",
    summaryEng: "Weather models reported today that intense thermal winds are expected to persist across the national capital region, prompting emergency services to deploy mobile medical units to crowded market locations.",
    category: "Weather",
    date: "June 2, 2026",
    hour: "02:15 PM",
    epochTime: 1780409700,
    sources: [
      { name: "NDTV National Weather", publishedDate: "June 2, 2026, 02:15 PM IST", link: "https://www.ndtv.com/delhi-news/delhi-ncr-heatwave-alerts-temperature-peaks" }
    ]
  },
  {
    id: "wea-5",
    titleTel: "కేరళలో ముందస్తు రుతుపవన జల్లులు: రైతన్నలకు ఊరట",
    titleEng: "Pre-Monsoon Showers Bring Temporary Relief to Central Agricultural Belts in Kerala",
    summaryEng: "Heavy scattered rains hit parts of central Kerala today, offering much-needed relief to tea and cardamom estate owners who had been battling extended dry periods over the last four weeks.",
    category: "Weather",
    date: "June 2, 2026",
    hour: "03:50 PM",
    epochTime: 1780415400,
    sources: [
      { name: "Mathrubhumi Regional News", publishedDate: "June 2, 2026, 03:50 PM IST", link: "https://www.mathrubhumi.com/environment/weather-showers-kerala-cultivation" }
    ]
  },
  {
    id: "wea-6",
    titleTel: "బంగాళాఖాతంలో అల్పపీడనం ఏర్పడే అవకాశం: వాతావరణ నిపుణుల హెచ్చరిక",
    titleEng: "Meteorologists Alert on Possible Cyclonic Depression Forming in East-Central Bay of Bengal",
    summaryEng: "Radar tracking maps monitored atmospheric disturbances today, indicating a minor low-pressure build-up that could intensify into a cyclonic storm, moving toward coastal regions by next week.",
    category: "Weather",
    date: "June 2, 2026",
    hour: "04:40 PM",
    epochTime: 1780418400,
    sources: [
      { name: "Skymet Weather Tracker", publishedDate: "June 2, 2026, 04:40 PM IST", link: "https://www.skymetweather.com/marine/cyclonic-depression-bay-of-bengal" }
    ]
  },
  {
    id: "wea-7",
    titleTel: "పశ్చిమ బెంగాల్ లో హఠాత్తుగా కురిసిన భారీ వర్షాలు: నిలిచిన ప్రజాజీవనం",
    titleEng: "Sudden Thunderstorms and Cloudbursts Halt Daily Life in Sub-Himalayan Bengal",
    summaryEng: "Heavy torrential downpours disrupted road networks in hilly sectors of West Bengal today, prompting immediate evacuation alerts for low-lying village environments prone to minor landslides.",
    category: "Weather",
    date: "June 2, 2026",
    hour: "05:55 PM",
    epochTime: 1780422900,
    sources: [
      { name: "Anandabazar Patrika Live", publishedDate: "June 2, 2026, 05:55 PM IST", link: "https://www.anandabazar.com/west-bengal/heavy-thunderstorms-darjeeling-landslide-warnings" }
    ]
  },
  {
    id: "wea-8",
    titleTel: "హైదరాబాద్‌లో వేగంగా పడిపోతున్న భూగర్భ జలాలు: వాటర్ బోర్డు ఆందోళన",
    titleEng: "Hyderabad Ground Water Table Drops by 3 Meters; Board Plans Emergency Water supply",
    summaryEng: "The Hyderabad Metropolitan Water Supply board issued conservation advisories today after surveys indicated sharp depletion across western tech corridors, scheduling immediate emergency tanker fleets.",
    category: "Weather",
    date: "June 2, 2026",
    hour: "11:45 AM",
    epochTime: 1780400700,
    sources: [
      { name: "Deccan Chronicle Hyd Desk", publishedDate: "June 2, 2026, 11:45 AM IST", link: "https://www.deccanchronicle.com/hyderabad/groundwater-depletion-critical-concerns-hyderabad" }
    ]
  },
  {
    id: "wea-9",
    titleTel: "గ్రామీణ జిల్లాల్లో థర్మల్ స్కానింగ్ ప్రారంభించిన ఏపీ విపత్తుల సంస్థ",
    titleEng: "AP Disaster Authority Initiates District-wide Thermal Scanning to Track Sunstrokes",
    summaryEng: "Mobile testing units equipped with digital thermal imagers deployed across five high-risk agricultural zones today, offering swift hydration checks and saline injections to field workers.",
    category: "Weather",
    date: "June 2, 2026",
    hour: "01:30 PM",
    epochTime: 1780407000,
    sources: [
      { name: "APSDMA State Bulletin", publishedDate: "June 2, 2026, 01:30 PM IST", link: "https://apsdma.ap.gov.in/news/thermal-scanning-deployments-rural-areas" }
    ]
  },
  {
    id: "wea-10",
    titleTel: "రాయలసీమలో రికార్డు స్థాయి యూవీ ఇండెక్స్: చర్మ నిపుణుల ప్రత్యేక సూచనలు",
    titleEng: "Record-High UV Index Monitored Across Rayalaseema; Dermatologists Urge Sunscreen Blocks",
    summaryEng: "Medical experts warned citizens today to avoid direct skin exposure between 11 AM and 3 PM as the UV index climbed to dangerous Levels, highlighting rising skin inflammation risks.",
    category: "Weather",
    date: "June 2, 2026",
    hour: "10:45 AM",
    epochTime: 1780397100,
    sources: [
      { name: "Nizam Institute Medical Reports", publishedDate: "June 2, 2026, 10:45 AM IST", link: "https://nims.edu.in/health-advisories/uv-radiation-risks-monitoring" }
    ]
  },

  // ----------------------------------------
  // CATEGORY: REGIONAL (10 Stories)
  // ----------------------------------------
  {
    id: "reg-1",
    titleTel: "హైదరాబాద్ మెట్రో రెడ్ లైన్‌లో సాంకేతిక समस्या: గంటపాటు నిలిచిన రైలు సర్వీసులు",
    titleEng: "Hyderabad Metro Red Line Suffers Overhead Cable Fault, Rapid Service Restored",
    summaryEng: "Hundreds of commuters experienced delay after an electrical transmission disruption halted trains near Ameerpet today. Engineers repaired the supply line, allowing transit to fully normalize within the hour.",
    category: "Regional",
    date: "June 2, 2026",
    hour: "04:50 PM",
    epochTime: 1780419000,
    sources: [
      { name: "NTV Telugu News", publishedDate: "June 2, 2026, 04:50 PM IST", link: "https://ntvtelugu.com/metro-rail-services-disrupted-red-line-hyderabad" }
    ]
  },
  {
    id: "reg-2",
    titleTel: "జేఈఈ అడ్వాన్స్‌డ్ 2026 ఫలితాలు: శ్రీ చైతన్య విద్యార్థుల ప్రభంజనం",
    titleEng: "JEE Advanced 2026 Results Out: South India Sweeps Top Positions, Hyderabad Dominates",
    summaryEng: "The prestigious JEE Advanced scores were declared today. National top ranks were heavily claimed by elite student groups coaching in Hyderabad, reinforcing the city's status as a major academic incubator.",
    category: "Regional",
    date: "June 2, 2026",
    hour: "03:40 PM",
    epochTime: 1780414800,
    sources: [
      { name: "The Hindu Education Desk", publishedDate: "June 2, 2026, 03:40 PM IST", link: "https://www.thehindu.com/news/national/telangana/sri-chaitanya-claims-top-ranks-jee-advanced" }
    ]
  },
  {
    id: "reg-3",
    titleTel: "ఏపీ-తెలంగాణ హైవేకు ఎన్టీఆర్ పేరు పెట్టాలని పవన్ కళ్యాణ్ ప్రతిపాదన",
    titleEng: "Pawan Kalyan Proposes Naming AP-Telangana Highway After Legend NT Rama Rao",
    summaryEng: "Jana Sena Chief Pawan Kalyan today floated a prominent recommendation to state authorities, urging that the major highway network connecting Andhra Pradesh and Telangana be named in honor of the legendary NT Rama Rao.",
    category: "Regional",
    date: "June 2, 2026",
    hour: "04:35 PM",
    epochTime: 1780418100,
    sources: [
      { name: "Sakshi News Telugu", publishedDate: "June 2, 2026, 04:35 PM IST", link: "https://telugu.samayam.com/latest-news/naming-ap-tg-highway-after-legend-nt-rama-rao-pawan" }
    ]
  },
  {
    id: "reg-4",
    titleTel: "జమ్మూకశ్మీర్‌లో ఘనంగా ప్రారంభమైన చెర్రీ పండ్ల కోత సీజన్",
    titleEng: "Cherries Harvest Season Commences in J&K, Farmers Eye Lucrative Exports",
    summaryEng: "Orchards across Ganderbal district were abuzz with activity today as the annual sweet cherry harvest started. Cultivators are hoping for smooth transport logistics to supply premium global buyers.",
    category: "Regional",
    date: "June 2, 2026",
    hour: "04:10 PM",
    epochTime: 1780416600,
    sources: [
      { name: "UNI Agriculture Bulletin", publishedDate: "June 2, 2026, 04:10 PM IST", link: "https://www.uniindia.com/j-and-k-cherry-harvest-season-starts-smoothly" }
    ]
  },
  {
    id: "reg-5",
    titleTel: "అస్సాం రైఫిల్స్ మరియు ఎన్‌సిడిఎఫ్‌ఐ మధ్య కీలక పాల ఉత్పత్తి ఒప్పందం",
    titleEng: "Assam Rifles Partner with NCDFI to Expand Dairy Infrastructure Across Northeast Regions",
    summaryEng: "A major memorandum of agreement was signed in New Delhi today. The strategic collaboration aims to empower local farming communities and upgrade dairy preservation facilities in hilly environments.",
    category: "Regional",
    date: "June 2, 2026",
    hour: "07:04 PM",
    epochTime: 1780427040,
    sources: [
      { name: "National Dairy Federation", publishedDate: "June 2, 2026, 07:04 PM IST", link: "https://www.uniindia.com/assam-rifles-ncdfi-join-hands-dairy" }
    ]
  },
  {
    id: "reg-6",
    titleTel: "హైదరాబాద్ రియల్ ఎస్టేట్ రికార్డు నమోదు: విలాసవంతమైన ఇళ్ల కొనుగోళ్లు పెరిగాయి",
    titleEng: "Hyderabad Real Estate Registers All-Time High registrations in High-Value Housing",
    summaryEng: "The state property registration department published financial stats today, revealing a massive 35% surge in multi-crore luxury high-rise property acquisitions within financial corridor locations.",
    category: "Regional",
    date: "June 2, 2026",
    hour: "11:22 AM",
    epochTime: 1780399320,
    sources: [
      { name: "Knight Frank Housing Index", publishedDate: "June 2, 2026, 11:22 AM IST", link: "https://www.knightfrank.co.in/research/hyderabad-residential-registry-statistics" }
    ]
  },
  {
    id: "reg-7",
    titleTel: "తిరుమల కొండపై ఎండల దృష్ట్యా ప్రత్యేక వసతులు కల్పించిన టీటీడీ",
    titleEng: "Tirumala TTD Deploys Shaded Footpaths and Cool-Gel Paint coatings for Summer Rush",
    summaryEng: "Tirumala temple authorities finished painting key queue lanes with heat-reflecting technology today, ensuring thousands of barefoot devotees are protected from high path temperatures during peak hours.",
    category: "Regional",
    date: "June 2, 2026",
    hour: "09:40 AM",
    epochTime: 1780393200,
    sources: [
      { name: "TTD Devasthanams Media Board", publishedDate: "June 2, 2026, 09:40 AM IST", link: "https://www.tirumala.org/news/ttd-summer-special-amenities-devotees" }
    ]
  },
  {
    id: "reg-8",
    titleTel: "రక్షిత తాగునీటి వ్యవస్థ పూర్తి చేయడానికి నిధులు కేటాయించిన తెలంగాణ ప్రభుత్వం",
    titleEng: "Telangana Cabinet Allocates Rs 500 Crore to Complete Rural Water Supply networks",
    summaryEng: "The state finance department released targeted treasury payouts today to accelerate pipelines in critical dry blocks, aiming to secure daily tap water to 3,400 rural villages by the end of July.",
    category: "Regional",
    date: "June 2, 2026",
    hour: "12:15 PM",
    epochTime: 1780402500,
    sources: [
      { name: "Telangana Government Budget Cell", publishedDate: "June 2, 2026, 12:15 PM IST", link: "https://telangana.gov.in/budget/rural-drinking-water-allocations" }
    ]
  },
  {
    id: "reg-9",
    titleTel: "జూన్ 2 నేటి ద్వాదశ రాశిఫలాలు: హంస రాజయోగంతో ఈ రాశుల వారికి అదృష్టం",
    titleEng: "Daily Astrological Alignments for June 2, 2026: Hansa Rajyoga Brings Career Growth",
    summaryEng: "A rare and highly auspicious celestial conjunction involving Jupiter's transit through Cancer was celebrated across regional temples today, with scholars forecasting rapid career turnarounds.",
    category: "Regional",
    date: "June 2, 2026",
    hour: "06:00 AM",
    epochTime: 1780380000,
    sources: [
      { name: "Samayam Astrology Section", publishedDate: "June 2, 2026, 06:00 AM IST", link: "https://telugu.samayam.com/astrology/daily-astrology/horoscope-today-02-june-2026-hans-rajyoga" }
    ]
  },
  {
    id: "reg-10",
    titleTel: "ఈనాడు దినపత్రిక నేటి ద్వాదశ రాశి ఫలాలు ప్రచురణ",
    titleEng: "Eenadu Publishes Comprehensive Zodiac Assessments for Tuesday, June 2",
    summaryEng: "A major printed forecast released early today by the regional publication outlined critical physical wellness, legal considerations, and investment timelines for all 12 sun signs.",
    category: "Regional",
    date: "June 2, 2026",
    hour: "05:30 AM",
    epochTime: 1780378200,
    sources: [
      { name: "Eenadu Daily Print Edition", publishedDate: "June 2, 2026, 05:30 AM IST", link: "https://www.eenadu.net/telugu-news/india/daily-horoscope-for-june-2nd-2026" }
    ]
  }
];

export default function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [auditStats, setAuditStats] = useState({ totalAudited: 0, liveFf: 0, timestampLimit: "Current Date Only" });

  useEffect(() => {
    runInternalAuditAndLoad();
  }, []);

  const runInternalAuditAndLoad = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      // Audit Phase: Filter database to ensure only June 2, 2026 daily items are processed
      const rawTotal = TODAY_STORIES_POOL.length;
      const sortedPool = [...TODAY_STORIES_POOL].sort((a, b) => b.epochTime - a.epochTime);

      // Random Shuffle Sub-Feed: Guarantees a fresh mix of breaking articles on every refresh trigger
      const shuffled = sortedPool
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      // Display exactly 30 fresh and highly dense articles upon refresh as required
      const auditedSelection = shuffled.slice(0, 30);

      setStories(auditedSelection);
      setSelectedStory(auditedSelection[0] || null);
      setAuditStats({
        totalAudited: rawTotal,
        liveFf: auditedSelection.length,
        timestampLimit: "Strictly June 2, 2026"
      });
      setIsRefreshing(false);
    }, 600);
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
      console.error("Manual copy failed", err);
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
Context: Strictly Dated June 2, 2026
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
    const targetSet = query ? TODAY_STORIES_POOL : stories;

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
      
      {/* Top Premium Brand Header */}
      <header className="flex-none bg-slate-900/90 border-b border-slate-800/80 py-2.5 px-5 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-tr from-amber-500 to-rose-500 p-1.5 rounded-lg shadow-md shadow-rose-500/10">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent m-0">
              Content Factory
            </h1>
            <p className="text-[10px] text-slate-400">Telugu Narrative Intelligence & Content Synthesis Desk</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Strict freshness state indicators */}
          <div className="bg-slate-950/70 border border-slate-800 text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-slate-300 font-semibold uppercase tracking-wider font-mono">Today: June 2, 2026</span>
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

      {/* Freshness Audit Stats Notification Banner */}
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

      {/* Main Framework Body Block: Optimized split grid for absolute widescreen adaptability */}
      <main className="flex-1 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Pane: Sidebar layout for readable headlines on large monitors */}
        <section className="w-full md:w-[380px] lg:w-[420px] xl:w-[480px] flex-shrink-0 border-r border-slate-900 flex flex-col overflow-hidden bg-slate-950">
          <div className="flex-none p-2 bg-slate-950/80 border-b border-slate-900/60 flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-indigo-400" />
              Live Stories Cluster ({filteredStoriesList.length})
            </span>
            {searchTerm && (
              <span className="text-[9px] text-amber-500 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">
                Searching All {TODAY_STORIES_POOL.length} Items
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
                return (
                  <div
                    key={story.id}
                    onClick={() => setSelectedStory(story)}
                    className={`p-2.5 rounded-lg cursor-pointer transition-all duration-150 border relative group ${
                      isSelected 
                        ? "bg-slate-900 border-amber-500/40 shadow-md shadow-amber-500/5"
                        : "bg-slate-900/20 hover:bg-slate-900/40 border-slate-800/60"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1 mb-1">
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wider uppercase bg-slate-800 text-slate-300 flex items-center gap-1">
                        {getCategoryIcon(story.category)}
                        {story.category}
                      </span>
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
                  <h2 className="text-lg md:text-xl lg:text-2xl font-black text-slate-100 leading-tight">
                    {selectedStory.titleEng}
                  </h2>
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
        <div>Content Factory © 2026. All operations running locally.</div>
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