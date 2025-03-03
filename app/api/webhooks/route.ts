import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { connectToDB } from "@/library/mongoDB";
import Order from "@/library/models/Order";
import Customer from "@/library/models/Customer";

// Handler za Stripe webhook za kreiranje narudžbina
export const POST = async (req: NextRequest) => {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;

    // Verifikacija webhook događaja pomoću Stripe biblioteke
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Obrada događaja kada je checkout sesija završena
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      // Informacije o kupcu
      const customerInfo = {
        clerkId: session?.client_reference_id,
        name: session?.customer_details?.name,
        email: session?.customer_details?.email,
      };

      // Adresa za dostavu
      const shippingAddress = {
        street: session?.shipping_details?.address?.line1,
        city: session?.shipping_details?.address?.city,
        postalCode: session?.shipping_details?.address?.postal_code,
        country: session?.shipping_details?.address?.country,
      };

      // Dohvatanje detalja sesije iz Stripe-a
      const retrieveSession = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["line_items.data.price.product"] }
      );

      // Prikupljanje stavki iz sesije
      const lineItems = await retrieveSession?.line_items?.data;

      // Formiranje stavki narudžbine
      const orderItems = lineItems?.map((item: any) => {
        return {
          product: item.price.product.metadata.productId,
          size: item.price.product.metadata.size || "N/A",
          quantity: item.quantity,
        };
      });

      await connectToDB();

      // Kreiranje nove narudžbine
      const newOrder = new Order({
        customerClerkId: customerInfo.clerkId,
        products: orderItems,
        shippingAddress,
        shippingRate: session?.shipping_cost?.shipping_rate,
        totalAmount: session.amount_total ? session.amount_total / 100 : 0,
      });

      await newOrder.save();

      // Ažuriranje ili kreiranje kupca u bazi podataka
      let customer = await Customer.findOne({ clerkId: customerInfo.clerkId });

      if (customer) { // Ako kupac postoji, ažuriraj novu narudžbinu
        customer.orders.push(newOrder._id);
      } else { // U suprotnom, napravi novog kupca
        customer = new Customer({
          ...customerInfo,
          orders: [newOrder._id],
        });
      }

      await customer.save();
    }

    return new NextResponse("Order created", { status: 200 });
  } catch (err) {
    console.log("[webhooks_POST]", err);
    return new NextResponse("Failed to create the order", { status: 500 });
  }
};
