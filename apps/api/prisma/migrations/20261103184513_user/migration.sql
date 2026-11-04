-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "user_name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'OPERATOR',
    "avatar_url" TEXT,
    "email" TEXT NOT NULL,
    "email_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "email_confirmed_at" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'local',
    "provider_id" TEXT,
    "provider_email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_provider_email_key" ON "User"("provider_email");
