-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'PROPRIETAIRE', 'ADMIN');

-- CreateEnum
CREATE TYPE "StatutPublication" AS ENUM ('BROUILLON', 'PUBLIE', 'ARCHIVE');

-- CreateEnum
CREATE TYPE "StatutReservation" AS ENUM ('ATTENTE_PAIEMENT', 'CONFIRMEE', 'TERMINEE', 'ANNULEE');

-- CreateEnum
CREATE TYPE "StatutPaiement" AS ENUM ('EN_ATTENTE', 'SUCCES', 'ECHEC', 'REMBOURSE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "telephone" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bien" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "adresse" TEXT NOT NULL,
    "statutPublication" "StatutPublication" NOT NULL DEFAULT 'BROUILLON',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "proprietaireId" TEXT NOT NULL,

    CONSTRAINT "Bien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "statut" "StatutReservation" NOT NULL DEFAULT 'ATTENTE_PAIEMENT',
    "montantTotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "locataireId" TEXT NOT NULL,
    "bienId" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" TEXT NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "datePaiement" TIMESTAMP(3),
    "statut" "StatutPaiement" NOT NULL DEFAULT 'EN_ATTENTE',
    "referencePayDunya" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reservationId" TEXT NOT NULL,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Paiement_referencePayDunya_key" ON "Paiement"("referencePayDunya");

-- AddForeignKey
ALTER TABLE "Bien" ADD CONSTRAINT "Bien_proprietaireId_fkey" FOREIGN KEY ("proprietaireId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_locataireId_fkey" FOREIGN KEY ("locataireId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_bienId_fkey" FOREIGN KEY ("bienId") REFERENCES "Bien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
