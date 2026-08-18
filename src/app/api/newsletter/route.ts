import { NextResponse } from "next/server";

type NewsletterDivision = "group" | "realty" | "solar";

type ZohoHiddenFields = {
  xnQsjsdp?: string;
  xmIwtLD?: string;
  actionType?: string;
  returnURL?: string;
  zc_gad?: string;
  aG9uZXlwb3Q?: string;
};

type ZohoFormConfig = {
  actionUrl?: string;
  source: string;
  hidden: ZohoHiddenFields;
};

const requiredHiddenFields: Array<keyof ZohoHiddenFields> = [
  "xnQsjsdp",
  "xmIwtLD",
  "actionType"
];

const realtyConfig: ZohoFormConfig = {
  actionUrl: process.env.ZOHO_REALTY_FORM_ACTION,
  source:
    process.env.ZOHO_REALTY_NEWSLETTER_LEAD_SOURCE || "Milton Realty Newsletter",
  hidden: {
    xnQsjsdp: process.env.ZOHO_REALTY_XNQSJSDP,
    xmIwtLD: process.env.ZOHO_REALTY_XMIWTLD,
    actionType: process.env.ZOHO_REALTY_ACTION_TYPE,
    returnURL: process.env.ZOHO_REALTY_RETURN_URL,
    zc_gad: process.env.ZOHO_REALTY_ZC_GAD,
    aG9uZXlwb3Q: process.env.ZOHO_REALTY_HONEYPOT
  }
};

const zohoConfig: Record<NewsletterDivision, ZohoFormConfig> = {
  group: {
    ...realtyConfig,
    source:
      process.env.ZOHO_GROUP_NEWSLETTER_LEAD_SOURCE || "Milton Group Newsletter"
  },
  realty: realtyConfig,
  solar: {
    actionUrl: process.env.ZOHO_SOLAR_FORM_ACTION,
    source:
      process.env.ZOHO_SOLAR_NEWSLETTER_LEAD_SOURCE || "Milton Solar Newsletter",
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

function isDivision(value: string): value is NewsletterDivision {
  return value === "group" || value === "realty" || value === "solar";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const division = clean(formData.get("division"));
  const email = clean(formData.get("email")).toLowerCase();

  if (!isDivision(division)) {
    return NextResponse.json(
      { ok: false, message: "Unknown newsletter division." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
        "Newsletter email validated. Add the Zoho Web-to-Lead action URL to forward live subscribers."
    });
  }

  const missingHiddenFields = requiredHiddenFields.filter(
    (field) => !isConfigured(config.hidden[field])
  );

  if (missingHiddenFields.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: `Zoho ${division} newsletter form is missing required hidden field configuration.`
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
    "Last Name": "Newsletter Subscriber",
    Email: email,
    Description: `Newsletter subscription from Milton ${division} footer.\nEmail: ${email}`,
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
      { ok: false, message: "Zoho rejected the newsletter subscription." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Subscribed. We will keep you updated."
  });
}
