-- CreateTable
CREATE TABLE "events" (
    "id_event" SERIAL NOT NULL,
    "nama_event" VARCHAR NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL,
    "artis" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_admin" INTEGER NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id_event")
);

-- CreateTable
CREATE TABLE "admin" (
    "id_admin" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "token" VARCHAR,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "pemesanan" (
    "id_pesan" SERIAL NOT NULL,
    "id_customer" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pemesanan_pkey" PRIMARY KEY ("id_pesan")
);

-- CreateTable
CREATE TABLE "customer" (
    "id_customer" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "token" VARCHAR,
    "longitude" DECIMAL(65,30) NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id_customer")
);

-- CreateTable
CREATE TABLE "transaksi" (
    "id_transaksi" SERIAL NOT NULL,
    "id_metode" INTEGER NOT NULL,
    "id_pesan" INTEGER NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR NOT NULL,


    CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id_transaksi")
);

-- CreateTable
CREATE TABLE "tikets" (
    "id_tiket" SERIAL NOT NULL,
    "id_category" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,
    "id_event" INTEGER NOT NULL,

    CONSTRAINT "tikets_pkey" PRIMARY KEY ("id_tiket")
);

-- CreateTable
CREATE TABLE "category" (
    "id_category" SERIAL NOT NULL,
    "nama" VARCHAR NOT NULL,
    "posisi" VARCHAR NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "detail_pemesanan" (
    "id_pesan" INTEGER NOT NULL,
    "id_tiket" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "detail_pemesanan_pkey" PRIMARY KEY ("id_pesan","id_tiket")
);

-- CreateTable
CREATE TABLE "cart" (
    "id_cart" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_tiket" INTEGER NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    CONSTRAINT "cart_pkey" PRIMARY KEY ("id_cart")
);

-- CreateTable
CREATE TABLE "metode_pembayaran" (
    "id_metode" SERIAL NOT NULL,
    "nama" VARCHAR NOT NULL,
    "nomor" BIGINT NOT NULL,
    "provider" VARCHAR NOT NULL,
    CONSTRAINT "metode_pembayaran_pkey" PRIMARY KEY ("id_metode")
);

-- CreateTable
CREATE TABLE "qr" (
    "kode_qr" VARCHAR NOT NULL,
    "is_used" BOOLEAN NOT NULL,
    "id_tiket" INTEGER NOT NULL,

    CONSTRAINT "qr_pkey" PRIMARY KEY ("kode_qr")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_username_key" ON "customer"("username");

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admin"("id_admin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemesanan" ADD CONSTRAINT "pemesanan_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "customer"("id_customer") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_id_pesan_fkey" FOREIGN KEY ("id_pesan") REFERENCES "pemesanan"("id_pesan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_id_metode_fkey" FOREIGN KEY ("id_metode") REFERENCES "metode_pembayaran"("id_metode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tikets" ADD CONSTRAINT "tikets_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "events"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tikets" ADD CONSTRAINT "tikets_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "category"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_pemesanan" ADD CONSTRAINT "detail_pemesanan_id_pesan_fkey" FOREIGN KEY ("id_pesan") REFERENCES "pemesanan"("id_pesan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_pemesanan" ADD CONSTRAINT "detail_pemesanan_id_tiket_fkey" FOREIGN KEY ("id_tiket") REFERENCES "tikets"("id_tiket") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "customer"("id_customer") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_id_tiket_fkey" FOREIGN KEY ("id_tiket") REFERENCES "tikets"("id_tiket") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr" ADD CONSTRAINT "qr_id_tiket_fkey" FOREIGN KEY ("id_tiket") REFERENCES "tikets"("id_tiket") ON DELETE RESTRICT ON UPDATE CASCADE;
