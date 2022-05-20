-- CreateTable
CREATE TABLE "TokenActive" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokenActive_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TokenActive" ADD CONSTRAINT "TokenActive_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
