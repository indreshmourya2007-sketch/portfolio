import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#edf5ff] dark:bg-[#070b12] text-[#0a0f18] dark:text-[#f1f5f9] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <div className="font-mono text-xs uppercase tracking-widest text-[#2d68c4] dark:text-[#60a5fa] font-bold">
          404 / Page Not Found
        </div>
        <h1 className="text-4xl font-light tracking-tight text-[#0a0f18] dark:text-white">
          Coordinates not found.
        </h1>
        <p className="text-sm text-[#0a0f18]/70 dark:text-slate-400 font-mono">
          The requested system node does not exist or has been relocated.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="pill-button-primary font-mono text-xs uppercase tracking-wider px-6 py-2.5 rounded-full font-bold inline-flex items-center gap-2"
          >
            <span>← Return to Headquarters</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
