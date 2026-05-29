// components/modules/hadith/HadithCard.tsx

export interface HadithData {
  id: number;
  hadithnumber: string;
  arabictext: string;
  englishtext: string;
  bookslug: string;
  chaptername: string;
  grade: string;
  narrator: string;
}

interface HadithCardProps {
  hadith: HadithData;
  accentColor: string;
  index: number;
}

export default function HadithCard({
  hadith,
  accentColor,
  index,
}: HadithCardProps) {
  return (
    <div className="border rounded-xl p-5">
      <h2>{hadith.chaptername}</h2>

      <p dir="rtl">{hadith.arabictext}</p>

      <p>{hadith.englishtext}</p>

      <span>{hadith.grade}</span>
    </div>
  );
}