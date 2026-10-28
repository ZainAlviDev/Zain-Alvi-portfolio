import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0e1116] text-white/45">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#top" className="transition hover:text-white">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
