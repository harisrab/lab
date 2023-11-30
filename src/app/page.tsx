import { AdBanner } from "@/components/AdBanner";
import TattooUI from "@/components/TattooUI";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white items-center justify-between p-24">
      <div>
        <AdBanner height={250} width={970} />

        {/* <TattooUI /> */}
      </div>
    </main>
  );
}
