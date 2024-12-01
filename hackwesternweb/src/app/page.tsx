import { PrismaClient } from "@prisma/client";
import Home from '@/app/components/homepage'

const prisma = new PrismaClient()


export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(searchParams?.id) || 2,
    },
  })

  return <Home fname={user?.fname} />
}
