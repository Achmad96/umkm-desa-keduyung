import { useState, useTransition } from "react";
import { loginUser } from "@/app/actions";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const result = await loginUser(username, password);
      if (result.success) {
        onLoginSuccess();
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-background-dark border border-white/10 rounded-2xl p-8 w-full max-w-md relative shadow-2xl animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-full p-2" aria-label="Tutup">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="text-center mb-8">
          <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 className="font-heading text-2xl font-bold text-white mb-2">Login UMKM</h2>
          <p className="text-slate-400 font-body text-sm">Masuk untuk mengelola pendaftaran UMKM Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm font-body text-center">{error}</div>}
          <div className="flex flex-col text-left">
            <label htmlFor="username" className="font-heading font-medium mb-2 text-slate-300 text-sm">
              Email / Username
            </label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)]"
              placeholder="Masukkan email Anda"
            />
          </div>

          <div className="flex flex-col text-left">
            <label htmlFor="password" className="font-heading font-medium mb-2 text-slate-300 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 p-3 px-4 rounded-lg text-white font-body transition-all duration-300 w-full focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(214,158,46,0.15)]"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-between items-center text-sm font-body">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input type="checkbox" className="rounded border-white/20 bg-white/5 accent-gold" />
              Ingat saya
            </label>
            {/* <a href="#" className="text-gold hover:text-gold-light transition-colors text-sm">Lupa password?</a> */}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-br from-primary to-primary-dark text-white p-3.5 border-none rounded-lg font-heading font-bold cursor-pointer transition-all duration-300 mt-2 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] disabled:opacity-70 disabled:cursor-not-allowed">
            {isPending ? "Memeriksa..." : "Masuk"}
          </button>
        </form>

        {/* <p className="text-center text-slate-400 font-body text-sm mt-6">
          Belum punya akun?{" "}
          <a href="#" className="text-gold hover:text-gold-light transition-colors font-medium">
            Hubungi Admin Desa
          </a>
        </p> */}
      </div>
    </div>
  );
}
