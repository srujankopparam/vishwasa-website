import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { rows } = await sql`SELECT COUNT(*) FROM faq;`;
    if (parseInt(rows[0].count) > 0) {
      return NextResponse.json({ message: "FAQ already seeded." });
    }

    await sql`INSERT INTO faq (question, answer, sort_order) VALUES
      ('Are your snacks made fresh?', 'Yes, every batch is made fresh to order. We do not keep large pre-made stock.', 1),
      ('Do you use palm oil?', 'Absolutely not. We use only cold-pressed groundnut and sesame oils, and pure butter.', 2),
      ('How long do snacks stay fresh?', 'Most of our snacks stay fresh for 20-30 days when stored in an airtight container in a cool dry place.', 3),
      ('How do I place an order?', 'Add items to your cart and click Checkout. You will be redirected to WhatsApp where you can confirm your order with us directly.', 4),
      ('Where do you deliver?', 'We deliver pan-India via India Post Dak Sewa. Delivery typically takes 5-7 business days.', 5),
      ('Are your products homemade?', 'Yes, all products are made in our home kitchen under FSSAI license using traditional family recipes.', 6),
      ('How should I store the snacks?', 'Keep them in an airtight container away from moisture and direct sunlight. Do not refrigerate.', 7);
    `;

    return NextResponse.json({ message: "FAQ seeded successfully." });
  } catch (error) {
    console.error("FAQ seed failed:", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
