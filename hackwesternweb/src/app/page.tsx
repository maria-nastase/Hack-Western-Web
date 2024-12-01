import { PrismaClient } from "@prisma/client";
import Home from '@/app/components/homepage'

const prisma = new PrismaClient()

export default async function Page() {
  const user = await prisma.user.findUnique({
    where: {
      id: 2,
    },
  })

  return <Home fname={user?.fname} />
}
