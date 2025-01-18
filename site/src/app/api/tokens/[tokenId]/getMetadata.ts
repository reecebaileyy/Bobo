import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
  const tokenId = req.nextUrl.searchParams.get("tokenId");
  if (!tokenId) {
    return NextResponse.json({ error: "Token ID is required" }, { status: 400 });
  }

  try {
    const tokenMetadata = await prisma.metadatas.findUnique({
      where: { token: parseInt(tokenId) },
    });

    if (!tokenMetadata) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 });
    }

    return NextResponse.json(tokenMetadata.metadata);
  } catch (error) {
    console.error("Error fetching token:", error);
    return NextResponse.json({ error: "Error fetching metadata" }, { status: 500 });
  }
}
