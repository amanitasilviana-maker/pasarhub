const market = await prisma.market.create({
  data: {
    name: 'Pasar Tambaksari Surabaya',
    address: 'Jl. Tambaksari, Surabaya, Jawa Timur',
    hub_lat: -7.2519,
    hub_lng: 112.7554,
    flat_delivery_fee: 5000,
    platform_fee: 0,
    escrow_bank_acc: 'BCA-8829102910 (Paguyuban Tambaksari)',
    status: 'ACTIVE',
  },
});