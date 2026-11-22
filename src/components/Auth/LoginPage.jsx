import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Store, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoginPage({ persona, onLoginSuccess }) {
  const navigate = useNavigate();

  // Persona Config
  const configs = {
    user: {
      title: "Masuk Akun Konsumen",
      subtitle: "Beli aneka sayur, daging & bumbu lintas lapak dengan ongkir flat",
      icon: ShoppingBag,
      color: "#00AA13",
      gradient: "linear-gradient(135deg, #00AA13 0%, #008C10 100%)",
      targetPath: "/",
      defaultEmail: "anisa.mahasiswi@pasarhub.id",
      defaultPass: "rahasia123",
      accountName: "Anisa Rahmawati (Mahasiswi)",
      roleName: "Konsumen",
      avatar: "👩‍🎓"
    },
    umkm: {
      title: "Login Mitra Pedagang UMKM",
      subtitle: "Kelola lapak pasar, terima notifikasi nyaring, dan cairkan saldo 100%",
      icon: Store,
      color: "#16A34A",
      gradient: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
      targetPath: "/umkm",
      defaultEmail: "lapak.bujoko@pasarhub.id",
      defaultPass: "dagingsegar123",
      accountName: "Lapak Bu Joko (Daging)",
      roleName: "Mitra UMKM",
      avatar: "🥩"
    },
    driver: {
      title: "Login Armada Driver Kurir",
      subtitle: "Ambil pesanan di Meja Hub Gate 2 dan antar ke alamat konsumen",
      icon: Truck,
      color: "#0284C7",
      gradient: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
      targetPath: "/driver",
      defaultEmail: "budi.kurir@pasarhub.id",
      defaultPass: "beatmerah123",
      accountName: "Budi Santoso (PH-KR-001)",
      roleName: "Driver Kurir Hub",
      avatar: "🛵"
    },
    admin: {
      title: "Login Admin Hub Paguyuban",
      subtitle: "Pusat verifikasi konsolidasi barang, monitoring kurir & rekening Escrow",
      icon: ShieldCheck,
      color: "#1E293B",
      gradient: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
      targetPath: "/admin",
      defaultEmail: "admin.paguyuban@pasarhub.id",
      defaultPass: "koperasi2026",
      accountName: "Admin Paguyuban Pasar",
      roleName: "Pengurus Koperasi",
      avatar: "🏛️"
    }
  };

  const config = configs[persona] || configs.user;
  const IconComponent = config.icon;

  const [email, setEmail] = useState(config.defaultEmail);
  const [password, setPassword] = useState(config.defaultPass);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!email || !password) {
      setErrorMsg("Harap masukkan email dan kata sandi.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const authPayload = {
        email,
        nama: config.accountName,
        role: persona,
        roleName: config.roleName,
        avatar: config.avatar,
        loginTime: new Date().toLocaleTimeString('id-ID')
      };

      onLoginSuccess(persona, authPayload);
      confetti({ particleCount: 70, spread: 60 });
      navigate(config.targetPath);
    }, 600);
  };

  const handleQuickDemo = () => {
    setEmail(config.defaultEmail);
    setPassword(config.defaultPass);
    handleSubmit();
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        {/* Back link */}
        <Link 
          to={config.targetPath} 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: '#6B7280', 
            fontSize: '12px', 
            textDecoration: 'none', 
            fontWeight: 700,
            marginBottom: '14px' 
          }}
        >
          <ArrowLeft size={14} /> Kembali ke Halaman
        </Link>

        {/* Header */}
        <div className="login-header">
          <div className="login-icon-badge" style={{ background: config.gradient }}>
            <IconComponent size={26} />
          </div>
          <h2>{config.title}</h2>
          <p>{config.subtitle}</p>
        </div>

        {errorMsg && (
          <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Alamat Email / ID Pengguna</label>
            <div className="login-input-wrap">
              <Mail size={16} className="login-input-icon" />
              <input 
                type="text" 
                className="login-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@pasarhub.id"
                required
              />
            </div>
          </div>

          <div className="login-field">
            <label>Kata Sandi</label>
            <div className="login-input-wrap">
              <Lock size={16} className="login-input-icon" />
              <input 
                type="password" 
                className="login-input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="login-submit-btn"
            style={{ background: config.color }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Memverifikasi Akun...</span>
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Login Box */}
        <div className="demo-account-card">
          <h5>
            <Sparkles size={12} style={{ color: config.color }} />
            Akun Percobaan (Demo 1-Klik)
          </h5>
          <button 
            type="button" 
            className="demo-quick-btn"
            onClick={handleQuickDemo}
          >
            <span>{config.avatar} Masuk Instan sebagai <strong>{config.accountName}</strong></span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
