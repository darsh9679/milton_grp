import { NextResponse } from "next/server";

type LeadDivision = "realty" | "solar";

const actionByDivision: Record<LeadDivision, string | undefined> = {
  realty: process.env.ZOHO_REALTY_FORM_ACTION,
  solar: process.env.ZOHO_SOLAR_FORM_ACTION
};

const sourceByDivision: Record<LeadDivision, string> = {
  realty: process.env.ZOHO_REALTY_LEAD_SOURCE || "Milton Realty Website",
  solar: process.env.ZOHO_SOLAR_LEAD_SOURCE || "Milton Solar Website"
};

function clean(value: FormDataEntryValue | string | null | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function isDivision(value: string): value is LeadDivision {
  return value === "realty" || value === "solar";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const division = clean(formData.get("division"));
  const name = clean(formData.get("name"));
  const email = clean(formData.get("email"));
  const phone = clean(formData.get("phone"));
  const interest = clean(formData.get("interest"));
  const message = clean(formData.get("message"));

  if (!isDivision(division)) {
    return NextResponse.json(
      { ok: false, message: "Unknown enquiry division." },
      { status: 400 }
    );
  }

  if (name.length < 2 || phone.length < 7) {
    return NextResponse.json(
      { ok: false, message: "Please add a valid name and phone number." },
      { status: 400 }
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Please add a valid email address." },
      { status: 400 }
    );
  }

  const actionUrl = actionByDivision[division];

  if (!actionUrl || actionUrl.startsWith("ZOHO_")) {
    return NextResponse.json({
      ok: true,
      mode: "placeholder",
      message:
        "Enquiry validated. Add the Zoho Web-to-Lead action URL in .env.local to forward live leads."
    });
  }

  const zohoPayload = new URLSearchParams({
    "Lead Source": sourceByDivision[division],
    "Last Name": name,
    Email: email,
    Phone: phone,
    Description: [interest, message].filter(Boolean).join("\n\n")
  });

  const response = await fetch(actionUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: zohoPayload
  });

  if (!response.ok) {
    return NextResponse.json(
      { ok: false, message: "Zoho rejected the enquiry. Check field mapping." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Enquiry sent. The Milton team will contact you soon."
  });
}
