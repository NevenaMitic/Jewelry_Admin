import Product from "@/library/models/Product";
import { connectToDB } from "@/library/mongoDB";
import { NextRequest, NextResponse } from "next/server";

// Handler za pretragu proizvoda na osnovu upita
export const GET = async (req: NextRequest, { params }: { params: { query: string }}) => {
  try {
    await connectToDB()

    const searchedProducts = await Product.find({
      $or: [
        { title: { $regex: params.query, $options: "i" } }, // Pretraga po naslovu proizvoda
        { category: { $regex: params.query, $options: "i" } }, // Pretraga po kategoriji proizvoda
        { tags: { $in: [new RegExp(params.query, "i")] } }  // Pretraga po tagovima proizvoda
      ]
    })

    return NextResponse.json(searchedProducts, { status: 200 })
  } catch (err) {
    console.log("[search_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";