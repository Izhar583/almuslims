export interface Dua {
  id: number;
  category: string;
  text: string;
  transliteration: string;
  translation: string;
  reference: string;
}

export const DUAS: Dua[] = [
  {
    id: 1,
    category: "Knowledge",
    text: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni ilma",
    translation: "My Lord, increase me in knowledge.",
    reference: "Quran 20:114",
  },
  {
    id: 2,
    category: "Success",
    text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration:
      "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
    translation:
      "Our Lord, give us good in this world and good in the Hereafter, and protect us from the Fire.",
    reference: "Quran 2:201",
  },
  {
    id: 3,
    category: "Trust",
    text: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni'mal wakeel",
    translation: "Sufficient for us is Allah, and He is the best Disposer of affairs.",
    reference: "Quran 3:173",
  },
  {
    id: 4,
    category: "Forgiveness",
    text: "رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي",
    transliteration: "Rabbi inni zalamtu nafsi faghfir li",
    translation: "My Lord, I have wronged myself, so forgive me.",
    reference: "Quran 28:16",
  },
  {
    id: 5,
    category: "Patience",
    text: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ",
    transliteration: "Rabbana afrigh 'alayna sabran wa tawaffana muslimeen",
    translation: "Our Lord, pour upon us patience and let us die as Muslims.",
    reference: "Quran 7:126",
  },
  {
    id: 6,
    category: "Guidance",
    text: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
    transliteration: "Rabbana la tuzigh quloobana ba'da idh hadaytana",
    translation: "Our Lord, let not our hearts deviate after You have guided us.",
    reference: "Quran 3:8",
  },
  {
    id: 7,
    category: "Rizq",
    text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
    transliteration:
      "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan",
    translation:
      "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
    reference: "Ibn Majah: 925",
  },
  {
    id: 8,
    category: "Ease",
    text: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا",
    transliteration: "Allahumma la sahla illa ma ja'altahu sahla",
    translation: "O Allah, there is no ease except in that which You have made easy.",
    reference: "Ibn Hibban: 974",
  },
  {
    id: 9,
    category: "Health",
    text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي اللَّهُمَّ عَافِنِي فِي سَمْعِي اللَّهُمَّ عَافِنِي فِي بَصَرِي",
    transliteration: "Allahumma 'afini fi badani, fi sam'i, fi basari",
    translation:
      "O Allah, grant me health in my body, my hearing, and my sight.",
    reference: "Abu Dawud: 5090",
  },
  {
    id: 10,
    category: "Gratitude",
    text: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ",
    transliteration: "Rabbi awzi'ni an ashkura ni'matakal",
    translation: "My Lord, enable me to be grateful for Your favor upon me.",
    reference: "Quran 27:19",
  },
  {
    id: 11,
    category: "Morning",
    text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal mulku lillah",
    translation:
      "We have entered morning and the dominion belongs to Allah.",
    reference: "Muslim: 2723",
  },
  {
    id: 12,
    category: "Evening",
    text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
    transliteration: "Amsayna wa amsal mulku lillah",
    translation: "We have entered evening and the dominion belongs to Allah.",
    reference: "Muslim: 2723",
  },
  {
    id: 13,
    category: "Travel",
    text: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا",
    transliteration: "Subhanalladhi sakhkhara lana hadha",
    translation: "Glory to Him who has subjected this to us.",
    reference: "Quran 43:13",
  },
  {
    id: 14,
    category: "Before Sleep",
    text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: "In Your name, O Allah, I die and I live.",
    reference: "Bukhari: 6314",
  },
  {
    id: 15,
    category: "Anxiety",
    text: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    transliteration: "La ilaha illa anta subhanaka inni kuntu minaz-zalimin",
    translation:
      "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    reference: "Quran 21:87",
  },
];

export function getDailyDua(): Dua {
  const start = new Date(2025, 0, 1).getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return DUAS[Math.floor((today.getTime() - start) / 86400000) % DUAS.length];
}

export const DUA_CATEGORIES = [...new Set(DUAS.map((d) => d.category))];
