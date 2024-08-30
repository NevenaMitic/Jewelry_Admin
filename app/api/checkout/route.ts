import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

// CORS zaglavlja za omogućavanje pristupa iz drugih domena
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
// Handler za OPTIONS zahtev (koristi se za CORS zahteve)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Handler za POST zahtev za kreiranje Stripe Checkout sesije
export async function POST(req: NextRequest) {
  try {
    const { cartItems, customer } = await req.json();  // Dohvatanje podataka iz zahteva

    if (!cartItems || !customer) { // Provera da li su prisutni svi potrebni podaci
      return new NextResponse("Not enough data to checkout", { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["RS", "HR", "BG", "GR", "RO", "BA", "AL", "ME", "MK"], //Dozvoljene su samo drzave sa Balkana
      },
      shipping_options: [
        { shipping_rate: "shr_1PiKMmC8y0YTYo0gsteMYvSn" }, // Opcije dostave: FREE 
        { shipping_rate: "shr_1PiKLhC8y0YTYo0gi7KY2qWN" }, //i Fast Shipping
        
      ],
      line_items: cartItems.map((cartItem: any) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: cartItem.item.title,
            metadata: {
              productId: cartItem.item._id,
              ...(cartItem.size && { size: cartItem.size }),
            },
          },
          unit_amount: cartItem.item.price * 100,  // Cena proizvoda u centima
        },
        quantity: cartItem.quantity,
      })),
      client_reference_id: customer.clerkId, // ID klijenta (iz Clerk-a)
      success_url: `${process.env.ECOMMERCE_STORE_URL}/payment_success`, // URL na koji se preusmerava nakon uspešne kupovine
      cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cart`, // URL na koji se preusmerava nakon otkazivanja
    });
    console.log("Shipping details:", session.shipping_details);

    return NextResponse.json(session, { headers: corsHeaders });
  } catch (err) {
    console.log("[checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}