import PrayerTimesPageClient from "./PrayerTimesPageClient";

export const metadata = {
  title: "Prayer Times — AlMuslims",
  description: "Accurate daily and monthly prayer times for your location.",
};

export default function PrayerTimesPage() {
  return <PrayerTimesPageClient />;
}
