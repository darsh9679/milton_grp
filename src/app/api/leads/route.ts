import { NextResponse } from "next/server";

type LeadDivision = "realty" | "solar";

type ZohoHiddenFields = {
  xnQsjsdp?: string;
  xmIwtLD?: string;
  actionType?: string;
  returnURL?: string;
  zc_gad?: string;
  aG9uZXlwb3Q?: string;
};

const requiredHiddenFields: Array<keyof ZohoHiddenFields> = [
  "xnQsjsdp",
  "xmIwtLD",
  "actionType"
];

const zohoConfig: Record<
  LeadDivision,
  {
    actionUrl?: string;
    source: string;
    hidden: ZohoHiddenFields;
  }
> = {
  realty: {
    actionUrl: process.env.ZOHO_REALTY_FORM_ACTION,
    source: process.env.ZOHO_REALTY_LEAD_SOURCE || "Milton Realty Website",
    hidden: {
      xnQsjsdp: process.env.ZOHO_REALTY_XNQSJSDP,
      xmIwtLD: process.env.ZOHO_REALTY_XMIWTLD,
      actionType: process.env.ZOHO_REALTY_ACTION_TYPE,
      returnURL: process.env.ZOHO_REALTY_RETURN_URL,
      zc_gad: process.env.ZOHO_REALTY_ZC_GAD,
      aG9uZXlwb3Q: process.env.ZOHO_REALTY_HONEYPOT
    }
  },
  solar: {
    actionUrl: process.env.ZOHO_SOLAR_FORM_ACTION,
    source: process.env.ZOHO_SOLAR_LEAD_SOURCE || "Milton Solar Website",
    hidden: {
      xnQsjsdp: process.env.ZOHO_SOLAR_XNQSJSDP,
      xmIwtLD: process.env.ZOHO_SOLAR_XMIWTLD,
      actionType: process.env.ZOHO_SOLAR_ACTION_TYPE,
      returnURL: process.env.ZOHO_SOLAR_RETURN_URL,
      zc_gad: process.env.ZOHO_SOLAR_ZC_GAD,
      aG9uZXlwb3Q: process.env.ZOHO_SOLAR_HONEYPOT
    }
  }
};

function clean(value: FormDataEntryValue | string | null | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function isConfigured(value: string | undefined): value is string {
  return Boolean(value && !value.startsWith("ZOHO_"));
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

  const config = zohoConfig[division];
  const actionUrl = config.actionUrl;

  if (!isConfigured(actionUrl)) {
    return NextResponse.json({
      ok: true,
      mode: "placeholder",
      message:
        "Enquiry validated. Add the Zoho Web-to-Lead action URL in .env.local to forward live leads."
    });
  }

  const missingHiddenFields = requiredHiddenFields.filter(
    (field) => !isConfigured(config.hidden[field])
  );

  if (missingHiddenFields.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: `Zoho ${division} form is missing required hidden field configuration.`
      },
      { status: 500 }
    );
  }

  const zohoPayload = new URLSearchParams({
    xnQsjsdp: config.hidden.xnQsjsdp || "",
    zc_gad: config.hidden.zc_gad || "",
    xmIwtLD: config.hidden.xmIwtLD || "",
    actionType: config.hidden.actionType || "",
    returnURL: config.hidden.returnURL || "null",
    "Lead Source": config.source,
    "Last Name": name,
    Email: email,
    Phone: phone,
    Description: [interest, message].filter(Boolean).join("\n\n"),
    aG9uZXlwb3Q: config.hidden.aG9uZXlwb3Q || ""
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
