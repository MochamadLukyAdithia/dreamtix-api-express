import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Admin
  const admin = await prisma.admin.create({
    data: {
      username: 'admin',
      email: 'admin@dreamtix.com',
      password: 'admin123',
      token: null,
    },
  });

  // Banner
  await prisma.banner.createMany({
    data: [
      { image: 'https://example.com/banner1.jpg' },
      { image: 'https://example.com/banner2.jpg' },
    ],
  });

  // Event
  const event = await prisma.event.create({
    data: {
      nama_event: 'Dream Concert 2025',
      waktu: new Date('2025-08-12T19:00:00.000Z'),
      artis: 'DreamBand',
      image: 'https://example.com/event1.jpg',
      admin: { connect: { id_admin: admin.id_admin } },
    },
  });

  // Category
  const category = await prisma.category.create({
    data: {
      nama: 'VIP',
      posisi: 'Depan',
    },
  });

  // Tiket
  const tiket = await prisma.tiket.create({
    data: {
      harga: 500000,
      stok: 100,
      event: { connect: { id_event: event.id_event } },
      category: { connect: { id_category: category.id_category } },
    },
  });

  // Customer
  const hashedPassword = await bcrypt.hash('lukek', 10);
  const customer = await prisma.customer.create({
    data: {
      username: 'lukek',
      email: 'lukek@gmail.com',
      password: hashedPassword,
      longitude: 113.7102,
      latitude: -8.1675,
    },
  });

  // Pemesanan
  const pemesanan = await prisma.pemesanan.create({
    data: {
      customer: { connect: { id_customer: customer.id_customer } },
    },
  });

  // Detail Pemesanan
  await prisma.detailPemesanan.create({
    data: {
      id_pesan: pemesanan.id_pesan,
      id_tiket: tiket.id_tiket,
      quantity: 2,
      total: 1000000,
    },
  });

  // Metode Pembayaran
  const metode = await prisma.metodePembayaran.create({
    data: {
      nama: 'Transfer Bank',
      nomor: '1234567890',
      provider: 'BCA',
    },
  });

  // Transaksi
  await prisma.transaksi.create({
    data: {
      id_pesan: pemesanan.id_pesan,
      id_metode: metode.id_metode,
      status: 'LUNAS',
    },
  });

  // QR Code
  await prisma.qR.create({
    data: {
      kode_qr: 'DREAMTIX-QR-123',
      is_used: false,
      id_tiket: tiket.id_tiket,
    },
  });

  // Cart
  await prisma.cart.create({
    data: {
      id_user: customer.id_customer,
      id_tiket: tiket.id_tiket,
      jumlah: 1,
      total: 500000,
    },
  });

  console.log('✅ Seeding selesai!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
