const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Mengisi 42 komponen belanjaan pasar & 8 lapak ke Supabase...');
  const passwordHash = await bcrypt.hash('123456', 10);

  await prisma.walletLedger.deleteMany();
  await prisma.paymentTransaction.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.subOrder.deleteMany();
  await prisma.masterOrder.deleteMany();
  await prisma.product.deleteMany();
  await prisma.merchantStall.deleteMany();
  await prisma.user.deleteMany();
  await prisma.market.deleteMany();

  const market = await prisma.market.create({
    data: {
      name: 'Pasar Tambaksari Surabaya',
      address: 'Jl. Tambaksari, Surabaya, Jawa Timur',
      hub_lat: -7.2519,
      hub_lng: 112.7554,
      flat_delivery_fee: 5000,
      platform_fee: 0,
    },
  });

  await prisma.user.create({
    data: {
      market_id: market.id,
      name: 'Anisa Rahmawati (Mahasiswi)',
      phone: '081288776655',
      email: 'pembeli@pasarhub.id',
      password_hash: passwordHash,
      role: 'CUSTOMER',
    },
  });

  await prisma.user.create({
    data: {
      market_id: market.id,
      name: 'Budi Santoso',
      phone: '085711223344',
      email: 'kurir@pasarhub.id',
      password_hash: passwordHash,
      role: 'COURIER',
    },
  });

  await prisma.user.create({
    data: {
      market_id: market.id,
      name: 'Admin Posko Hub',
      phone: '0844444444',
      email: 'admin@pasarhub.id',
      password_hash: passwordHash,
      role: 'ADMIN_HUB',
    },
  });

  const lapakList = [
    {
      owner: 'Ibu Joko Sri Wahyuni', phone: '081234567890', saldo: 99000,
      stall: 'Lapak Bu Joko (Daging)', blok: 'Blok Daging A-04',
      products: [
        { category: 'Daging', name: 'Daging Sapi Has Dalam (500g)', price: 65000, unit: '500 gram', stock: 12, image_url: '🥩' },
        { category: 'Daging', name: 'Ayam Potong Segar (1 Ekor)', price: 34000, unit: '1 ekor', stock: 20, image_url: '🍗' },
        { category: 'Daging', name: 'Dada Ayam Fillet Tanpa Tulang (500g)', price: 26000, unit: '500 gram', stock: 18, image_url: '🍖' },
        { category: 'Daging', name: 'Iga Sapi Potong Sop (500g)', price: 52000, unit: '500 gram', stock: 10, image_url: '🥩' },
        { category: 'Daging', name: 'Ati Ampela Ayam Segar (5 Pasang)', price: 14000, unit: '1 pack', stock: 15, image_url: '🍗' },
        { category: 'Daging', name: 'Ceker Ayam Bersih Siap Masak (500g)', price: 12000, unit: '500 gram', stock: 25, image_url: '🍗' }
      ]
    },
    {
      owner: 'Bapak Slamet Riyadi', phone: '081298765432', saldo: 25000,
      stall: 'Lapak Pak Slamet (Sayur)', blok: 'Blok Sayur B-12',
      products: [
        { category: 'Sayur', name: 'Sayur Bayam Hidroponik Ikat', price: 5000, unit: '1 ikat', stock: 45, image_url: '🥬' },
        { category: 'Sayur', name: 'Kangkung Akar Segar (1 Ikat)', price: 4000, unit: '1 ikat', stock: 50, image_url: '🌿' },
        { category: 'Sayur', name: 'Wortel Lokal Manis (500g)', price: 8000, unit: '500 gram', stock: 30, image_url: '🥕' },
        { category: 'Sayur', name: 'Kentang Dieng Kuning (1kg)', price: 18000, unit: '1 kg', stock: 35, image_url: '🥔' },
        { category: 'Sayur', name: 'Brokoli Hijau Segar (1 Bonggol)', price: 11000, unit: '1 pcs', stock: 20, image_url: '🥦' },
        { category: 'Sayur', name: 'Sawi Putih & Pakcoy Segar (500g)', price: 7000, unit: '500 gram', stock: 28, image_url: '🥬' },
        { category: 'Sayur', name: 'Tomat Merah Segar (500g)', price: 7500, unit: '500 gram', stock: 40, image_url: '🍅' },
        { category: 'Sayur', name: 'Terong Ungu Lalap & Balado (500g)', price: 6500, unit: '500 gram', stock: 25, image_url: '🍆' },
        { category: 'Sayur', name: 'Jagung Manis Kupas (2 Tongkol)', price: 8000, unit: '2 pcs', stock: 30, image_url: '🌽' }
      ]
    },
    {
      owner: 'Mak Sumiati', phone: '081345678912', saldo: 19500,
      stall: 'Lapak Mak Sumi (Bumbu)', blok: 'Blok Bumbu C-03',
      products: [
        { category: 'Bumbu', name: 'Cabai Rawit Merah Pedas (100g)', price: 12000, unit: '100 gram', stock: 25, image_url: '🌶️' },
        { category: 'Bumbu', name: 'Cabai Merah Keriting Segar (250g)', price: 14000, unit: '250 gram', stock: 30, image_url: '🌶️' },
        { category: 'Bumbu', name: 'Bawang Merah Brebes Besar (250g)', price: 15000, unit: '250 gram', stock: 35, image_url: '🧅' },
        { category: 'Bumbu', name: 'Bawang Putih Kating Kupas (250g)', price: 13000, unit: '250 gram', stock: 40, image_url: '🧄' },
        { category: 'Bumbu', name: 'Bumbu Racik Rendang Instan', price: 4500, unit: '1 sachet', stock: 50, image_url: '🥣' },
        { category: 'Bumbu', name: 'Paket Bumbu Dapur (Lengkuas, Jahe, Sereh, Daun Jeruk)', price: 5000, unit: '1 paket', stock: 45, image_url: '🌿' },
        { category: 'Bumbu', name: 'Kemiri Bulat & Ketumbar Utuh (100g)', price: 7000, unit: '100 gram', stock: 30, image_url: '🌰' }
      ]
    },
    {
      owner: 'Cak Subroto', phone: '081399887766', saldo: 54000,
      stall: 'Kios Seafood Cak To', blok: 'Blok Basah D-01',
      products: [
        { category: 'Seafood', name: 'Cumi Asin Kering Premium (200g)', price: 22000, unit: '200 gram', stock: 18, image_url: '🦑' },
        { category: 'Seafood', name: 'Ikan Nila Segar Hidup (1kg)', price: 32000, unit: '1 kg', stock: 15, image_url: '🐟' },
        { category: 'Seafood', name: 'Udang Vaname Segar Ukuran Sedang (500g)', price: 38000, unit: '500 gram', stock: 16, image_url: '🦐' },
        { category: 'Seafood', name: 'Ikan Lele Segar Bersih (1kg)', price: 24000, unit: '1 kg', stock: 22, image_url: '🐟' },
        { category: 'Seafood', name: 'Ikan Bandeng Cabut Duri (2 Ekor)', price: 28000, unit: '1 pack', stock: 14, image_url: '🐟' },
        { category: 'Seafood', name: 'Kerang Dara Kupas Segar (500g)', price: 19000, unit: '500 gram', stock: 12, image_url: '🐚' }
      ]
    },
    {
      owner: 'Pakde Yono', phone: '081233445566', saldo: 13000,
      stall: 'Lapak Tahu Tempe Pakde', blok: 'Blok Olahan B-08',
      products: [
        { category: 'Sembako', name: 'Tempe Daun Tradisional (2 Pcs)', price: 6000, unit: '2 bungkus', stock: 40, image_url: '🧈' },
        { category: 'Sembako', name: 'Tahu Putih Lembut Sutra (10 Pcs)', price: 7000, unit: '1 bungkus', stock: 35, image_url: '⬜' },
        { category: 'Sembako', name: 'Tahu Kuning Bandung Gurih (10 Pcs)', price: 8500, unit: '1 bungkus', stock: 30, image_url: '🟨' },
        { category: 'Sembako', name: 'Telur Ayam Negeri Segar (1 Kg)', price: 27000, unit: '1 kg', stock: 50, image_url: '🥚' },
        { category: 'Sembako', name: 'Beras Pulen Rojolele (5 Kg)', price: 72000, unit: '1 karung', stock: 25, image_url: '🌾' },
        { category: 'Sembako', name: 'Minyak Goreng Kelapa Sawit (1 Liter)', price: 16500, unit: '1 pouch', stock: 40, image_url: '🫗' }
      ]
    },
    {
      owner: 'Mbak Sri Rejeki', phone: '081277889900', saldo: 24000,
      stall: 'Kios Buah Segar Berkah', blok: 'Blok Buah E-02',
      products: [
        { category: 'Buah', name: 'Jeruk Medan Manis Segar (1kg)', price: 24000, unit: '1 kg', stock: 22, image_url: '🍊' },
        { category: 'Buah', name: 'Pisang Raja & Cavendish Sisir', price: 18000, unit: '1 sisir', stock: 20, image_url: '🍌' },
        { category: 'Buah', name: 'Semangka Merah Tanpa Biji (1 Buah)', price: 25000, unit: '1 buah', stock: 15, image_url: '🍉' },
        { category: 'Buah', name: 'Alpukat Mentega Matang Pohon (1kg)', price: 28000, unit: '1 kg', stock: 18, image_url: '🥑' },
        { category: 'Buah', name: 'Pepaya California Manis (1 Buah)', price: 14000, unit: '1 buah', stock: 20, image_url: '🍈' },
        { category: 'Buah', name: 'Apel Fuji Manis Renyah (1kg)', price: 32000, unit: '1 kg', stock: 16, image_url: '🍎' }
      ]
    },
    {
      owner: 'Bu Endang Jajanan', phone: '081255667788', saldo: 15000,
      stall: 'Warung Jajan Pasar Bu Endang', blok: 'Blok Tengah F-01',
      products: [
        { category: 'Sembako', name: 'Paket Klepon & Lupis Gula Merah', price: 10000, unit: '1 mika', stock: 25, image_url: '🍡' },
        { category: 'Sembako', name: 'Risoles Mayo & Pastel Sayur (Isi 5)', price: 15000, unit: '1 box', stock: 20, image_url: '🥟' }
      ]
    }
  ];

  for (const item of lapakList) {
    const user = await prisma.user.create({
      data: {
        market_id: market.id,
        name: item.owner,
        phone: item.phone,
        password_hash: passwordHash,
        role: 'MERCHANT',
        wallet_balance: item.saldo
      }
    });
    await prisma.merchantStall.create({
      data: {
        user_id: user.id,
        market_id: market.id,
        stall_name: item.stall,
        block_number: item.blok,
        products: { create: item.products }
      }
    });
  }

  console.log('SUKSES! 42 Produk Belanjaan & 7 Lapak lengkap telah masuk ke Supabase.');
}

main().catch(console.error).finally(() => prisma.$disconnect());