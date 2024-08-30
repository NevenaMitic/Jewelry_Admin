import Customer from "@/library/models/Customer";
import Order from "@/library/models/Order";
import { connectToDB } from "@/library/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

// Handler za GET zahtev za preuzimanje svih narudžbina
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    // Pronalaženje svih narudžbina i sortiranje po datumu kreiranja u opadajućem redosledu
    const orders = await Order.find().sort({ createdAt: "desc" })

    // Prikupljanje detalja o svakoj narudžbini
    const orderDetails = await Promise.all(orders.map(async (order) => {
      const customer = await Customer.findOne({ clerkId: order.customerClerkId }) // Pronalaženje korisnika koji je napravio narudžbinu
      return {
        _id: order._id,
        customer: customer.name,
        products: order.products.length,
        totalAmount: order.totalAmount,
        createdAt: format(order.createdAt, "dd.MM.yyyy.")
      }
    }))

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (err) {
    console.log("[orders_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";