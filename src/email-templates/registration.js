import { conferenceData as cd } from "data/conference-data";

const year = process.env.REACT_APP_YEAR || "2026";

// Email-safe design tokens (inline styles only for broad client compatibility)
const emailStyles = {
  fontFamily: "font-family: Arial, Helvetica, sans-serif",  // property included for easy injection
  fontSize: "15px",
  lineHeight: "1.55",
  color: "#2c2c2c",
  colorMuted: "#5c5c5c",
  colorHeading: "#1a1a1a",
  linkColor: "#1565c0",
  borderColor: "#e8e8e8",
  bgSubtle: "#f8f9fa",
  labelWeight: "bold",  // Outlook only supports normal/bold, not 600
};

const wrapEmailBody = (bodyHtml) => `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMC ${year}</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff1; ${emailStyles.fontFamily}; font-size:${emailStyles.fontSize}; line-height:${emailStyles.lineHeight}; color:${emailStyles.color}; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eceff1;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td><![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:0 auto; background-color:#ffffff;">
          <tr>
            <td style="padding:32px 28px; ${emailStyles.fontFamily}; font-size:${emailStyles.fontSize}; line-height:${emailStyles.lineHeight}; color:${emailStyles.color};">
${bodyHtml}
            </td>
          </tr>
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;

const sectionHeading = (text) =>
  `<div style="margin-top:24px; margin-bottom:0; padding-bottom:6px; border-bottom:1px solid ${emailStyles.borderColor}; font-size:16px; font-weight:bold; color:${emailStyles.colorHeading};">${text}</div>`;

const row = (label, value) =>
  `<div style="margin:2px 0;"><span style="font-weight:${emailStyles.labelWeight}; color:${emailStyles.colorMuted};">${label}</span> ${value}</div>`;

const link = (href, text) =>
  `<a href="${href}" style="color:${emailStyles.linkColor}; text-decoration:none;">${text}</a>`;

const truncateAbstract = (text, max = 125) => {
  if (!text || text.length <= max) return text || "";
  const trimmed = text.slice(0, max);
  const lastSpace = trimmed.lastIndexOf(" ");
  return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + "…";
};

// ── Billing helpers (mirrors StaticSummary logic) ──────────────────────
const toNumber = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const getPaypalPrice = (price) =>
  Math.round((price + (0.034 * price + 0.35) / 0.966) * 100) / 100;

const getRegInfo = (id, registrationTypes) => {
  const regId = toNumber(id, null);
  const reg = (registrationTypes || []).find((item) => toNumber(item.id) === regId);
  if (!reg) return { description: "", price: 0, type: "" };
  const type = String(reg.type || "").toLowerCase();
  return {
    description: type === "no" ? "(no accommodation)" : `+ ${reg.description}`,
    price: toNumber(reg.price, 0),
    type,
  };
};

const billingTableHtml = (participantData, registrationTypes, isOnline) => {
  const {
    participant,
    accommodation,
    workshops: pWorkshops = [],
    extra_options,
    contributions = [],
  } = participantData;

  const lines = []; // { description, price }

  // 1. Registration / accommodation
  if (isOnline) {
    const onlineCost = toNumber(cd?.costs?.online, 0);
    lines.push({ description: "Online Conference Registration", price: onlineCost });
  } else {
    const regInfo = getRegInfo(accommodation?.registration_type_id, registrationTypes);
    const lateFee = participant?.is_early_bird === "0" ? toNumber(cd?.costs?.after_early_birds, 0) : 0;
    lines.push({ description: `Conference Registration ${regInfo.description}`, price: regInfo.price + lateFee });
  }

  // 2. Workshops (only those the participant is attending)
  (pWorkshops || [])
    .filter((w) => w.attending === "1" || w.attending === "true")
    .forEach((w) => {
      const price = isOnline ? toNumber(w.price_online, 0) : toNumber(w.price, 0);
      lines.push({ description: w.title, price });
    });

  // 3. Printed posters
  const printedPosters = (contributions || []).filter((c) => c.print === "1" || c.print === "true");
  if (printedPosters.length > 0) {
    const unitPrice = toNumber(cd?.poster_print?.price, 0);
    lines.push({
      description: `Printed Poster${printedPosters.length > 1 ? "s" : ""} x ${printedPosters.length}`,
      price: printedPosters.length * unitPrice,
    });
  }

  // 4. T-shirt
  const buyTShirt = extra_options?.buy_tshirt === "1" || extra_options?.buy_tshirt === "true";
  if (buyTShirt) {
    const tshirtCost = toNumber(cd?.costs?.tshirts?.price, 0);
    lines.push({ description: `T-Shirt (${extra_options?.tshirt_size || "—"})`, price: tshirtCost });
  }

  // Subtotal before PayPal
  const subtotal = lines.reduce((sum, l) => sum + l.price, 0);

  // 5. PayPal fee
  const paymentMethodName = String(participant?.payment_method_name || "").toLowerCase();
  const isPaypal = paymentMethodName === "paypal";
  const paypalFee = isPaypal ? getPaypalPrice(subtotal) - subtotal : 0;
  if (isPaypal) {
    lines.push({ description: "PayPal Fee (3.4% + 0.35€)", price: paypalFee });
  }

  const total = subtotal + paypalFee;

  // Build HTML table
  const thStyle = `padding:8px 10px; text-align:left; border-bottom:2px solid ${emailStyles.borderColor}; color:${emailStyles.colorHeading}; font-weight:bold;`;
  const thRightStyle = `${thStyle} text-align:right;`;
  const tdStyle = `padding:6px 10px; border-bottom:1px solid ${emailStyles.borderColor}; color:${emailStyles.colorMuted};`;
  const tdRightStyle = `${tdStyle} text-align:right;`;
  const tdTotalStyle = `padding:8px 10px; font-weight:bold; color:${emailStyles.colorHeading};`;
  const tdTotalRightStyle = `${tdTotalStyle} text-align:right;`;

  const rows = lines.map((l) =>
    `<tr><td style="${tdStyle}">${l.description}</td><td style="${tdRightStyle}">${l.price.toFixed(2)}€</td></tr>`
  ).join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px; border-collapse:collapse;">
      <thead><tr>
        <th style="${thStyle}">Description</th>
        <th style="${thRightStyle}">Price</th>
      </tr></thead>
      <tbody>
        ${rows}
        <tr>
          <td style="${tdTotalStyle}">TOTAL</td>
          <td style="${tdTotalRightStyle}">${total.toFixed(2)}€</td>
        </tr>
      </tbody>
    </table>
  `;
};

// ── Session helper ─────────────────────────────────────────────────────
const getSessionName = (sessionId, sessions = []) => {
  if (!Array.isArray(sessions) || sessions.length === 0) return "Unknown Session";
  const session = sessions.find((s) => s.id === sessionId);
  return session ? session.name : "Unknown Session";
};

const formatFoodRestrictionsHtml = (participantPayload) => {
  const list = participantPayload?.food_restrictions ?? [];
  const otherText = (participantPayload?.food_other_text ?? "").trim();

  if (!Array.isArray(list) || list.length === 0) {
    return row("Food restrictions:", "None");
  }

  const labels = {
    vegetarian: "Vegetarian",
    vegan: "Vegan",
    coeliac: "Coeliac (gluten-free)",
    lactose_intolerant: "Lactose intolerant",
    other: "Other",
  };

  const items = list
    .map((key) => {
      if (!key) return null;
      if (key === "other") return otherText ? `Other: ${otherText}` : "Other";
      return labels[key] || key;
    })
    .filter(Boolean);

  if (items.length === 0) {
    return row("Food restrictions:", "None");
  }

  return row("Food restrictions:", items.join(", "));
};

const registrationDetails = (
  curParticipant,
  curParticipantAccomodation,
  curParticipantWorkshops,
  curParticipantContributions,
  curParticipantOptions,
  curParticipantArrival,
  workshops,
  paymentMethods,
  registrationTypes,
  sessions,
  fullParticipant,
) => {
  const isOnline = curParticipant.is_online === "1";
  const paymentMethodName = paymentMethods.find((m) => m.id === curParticipant.payment_method_id)?.method || "Unknown";

  // Shared helpers for workshop rows and contribution cards
  const workshopRow = (w) =>
    `<div style="margin:6px 0; padding:6px 0; border-bottom:1px solid ${emailStyles.borderColor};">` +
    `<strong>${w.title}</strong> — ${w.date} (${w.period})` +
    (w.responsible_name ? `<br><span style="color:${emailStyles.colorMuted};">Responsible: ${w.responsible_name}</span>` : "") +
    `</div>`;

  const contributionCard = (c) => {
    const typeLabel = c.type === "talk" ? "Talk" : "Poster";
    const durationPart = c.duration ? ` — ${c.duration}` : "";
    const printPart = c.type === "poster" && c.print === "1" ? `<br><strong>Printed on site by the LOC.</strong>` : "";
    return (
      `<div style="margin:6px 0; padding:6px 0; border-bottom:1px solid ${emailStyles.borderColor};">` +
      `<strong>${c.title}</strong> <span style="color:${emailStyles.colorMuted};">(${typeLabel}${durationPart})</span><br>` +
      `${c.authors}` +
      (c.abstract ? `<br><span style="color:${emailStyles.colorMuted};">${truncateAbstract(c.abstract)}</span>` : "") +
      `<br><strong>Session:</strong> ${getSessionName(c.session_id, sessions)}` +
      printPart +
      `</div>`
    );
  };

  if (isOnline) {
    const workshopsHtml = curParticipantWorkshops.length > 0
      ? curParticipantWorkshops.map(workshopRow).join("")
      : `<div style="margin:6px 0;">No workshops selected.</div>`;
    const contributionsHtml = curParticipantContributions.length > 0
      ? curParticipantContributions.map(contributionCard).join("")
      : `<div style="margin:6px 0;">No contributions.</div>`;

    return (
      sectionHeading("Personal Details") +
      row("Name:", `${curParticipant.title} ${curParticipant.first_name} ${curParticipant.last_name}`) +
      row("Email:", curParticipant.email) +
      row("Date of Birth:", curParticipant.dob || "—") +
      sectionHeading("Workshops") +
      workshopsHtml +
      sectionHeading("Contributions") +
      contributionsHtml +
      sectionHeading("Invoice Summary") +
      row("Payment Method:", paymentMethodName) +
      billingTableHtml(fullParticipant || { participant: curParticipant, workshops: curParticipantWorkshops, extra_options: curParticipantOptions, contributions: curParticipantContributions }, registrationTypes, true)
    );
  }

  // On-site: Personal details
  let html = sectionHeading("Personal Details")
    + row("Name:", `${curParticipant.title} ${curParticipant.first_name} ${curParticipant.last_name}`)
    + row("Email:", curParticipant.email)
    + row("Phone:", curParticipant.phone || "—")
    + row("Address:", [curParticipant.address, curParticipant.postal_code, curParticipant.city, curParticipant.country].filter(Boolean).join(", ") || "—");
  if (curParticipant.organization) html += row("Organization:", curParticipant.organization);
  html += row("Date of Birth:", curParticipant.dob || "—");

  // Arrival & Departure (fix: Locomotion)
  html += sectionHeading("Arrival & Departure")
    + row("Locomotion:", curParticipantArrival.travelling ? `by ${curParticipantArrival.travelling}` : "—")
    + row("Arrival:", `${curParticipantArrival.arrival_date || "—"} at ${curParticipantArrival.arrival_hour || "—"}:${curParticipantArrival.arrival_minute || "—"}`)
    + row("Departure:", `${curParticipantArrival.departure_date || "—"} at ${curParticipantArrival.departure_hour || "—"}:${curParticipantArrival.departure_minute || "—"}`);
  if (curParticipantArrival.travelling_details) html += row("Details:", curParticipantArrival.travelling_details);

  // Workshops
  html += sectionHeading("Workshops");
  if (curParticipantWorkshops.length > 0) {
    html += curParticipantWorkshops.map(workshopRow).join("");
  } else {
    html += `<div style="margin:6px 0;">No workshops selected.</div>`;
  }

  // Contributions
  html += sectionHeading("Contributions");
  if (curParticipantContributions.length > 0) {
    html += curParticipantContributions.map(contributionCard).join("");
  } else {
    html += `<div style="margin:6px 0;">No contributions.</div>`; 
  }

  // Additional info
  html += sectionHeading("Additional Information")
    + row("Excursion:", curParticipantOptions.excursion === "1" ? "Yes" : "No")
    + row("T-Shirt:", curParticipantOptions.buy_tshirt === "1" ? `Yes (Size: ${curParticipantOptions.tshirt_size || "—"})` : "No");
  html += formatFoodRestrictionsHtml(fullParticipant || curParticipant);
  html += row("Comments:", curParticipant.comments || "No comments provided.");

  // Invoice
  html += sectionHeading("Invoice Summary")
    + row("Payment Method:", paymentMethodName)
    + billingTableHtml(fullParticipant || { participant: curParticipant, accommodation: curParticipantAccomodation, workshops: curParticipantWorkshops, extra_options: curParticipantOptions, contributions: curParticipantContributions }, registrationTypes, false);

  return html;
};

const roomsAvailabilityHtml = (rows) => {
  const list = Array.isArray(rows) ? rows : [];
  const filtered = list.filter((r) => (r?.type || r?.registration_type) !== "no");

  if (!filtered.length) {
    return `<div style="margin:16px 0; padding:12px 16px; background-color:${emailStyles.bgSubtle}; border:1px solid ${emailStyles.borderColor}; color:${emailStyles.colorMuted};">Room availability: unavailable.</div>`;
  }

  const items = filtered.map((r) => {
    const type = String(r?.type ?? r?.registration_type ?? "unknown");
    const roomLeft = Number(r?.room_left ?? r?.available_rooms ?? 0) || 0;
    const total = r?.total ?? r?.total_rooms ?? null;
    const used = r?.used ?? null;
    const label = type.charAt(0).toUpperCase() + type.slice(1);
    const suffixParts = [];
    if (total != null) suffixParts.push(`total: ${Number(total) || 0}`);
    if (used != null) suffixParts.push(`used: ${Number(used) || 0}`);
    const suffix = suffixParts.length ? ` <span style="color:${emailStyles.colorMuted};">(${suffixParts.join(", ")})</span>` : "";
    return `<li style="margin:2px 0;"><strong>${label}</strong>: ${roomLeft} left${suffix}</li>`;
  });

  return `<div style="margin:16px 0; padding:14px 18px; background-color:${emailStyles.bgSubtle}; border:1px solid ${emailStyles.borderColor};">
    <div style="font-weight:bold; color:${emailStyles.colorHeading}; margin-bottom:8px;">Room availability</div>
    <ul style="margin:0; padding-left:20px;">${items.join("")}</ul>
  </div>`;
};


export const registrationEmailToTeam = (
  participant,
  workshops,
  paymentMethods,
  registrationTypes,
  sessions,
) => {
  const {
    participant: curParticipant,
    workshops: curParticipantWorkshops,
    accommodation: curParticipantAccomodation,
    arrival: curParticipantArrival,
    extra_options: curPariticipantOptions,
    contributions: curParticipantContributions,
  } = participant;


  const isOnline = curParticipant.is_online === "1";
  const availabilityBlock = !isOnline ? roomsAvailabilityHtml(registrationTypes) : "";
  const badge = isOnline ? "ONLINE" : "ON-SITE";
  const details = registrationDetails(
    curParticipant,
    curParticipantAccomodation,
    curParticipantWorkshops,
    curParticipantContributions,
    curPariticipantOptions,
    curParticipantArrival,
    workshops,
    paymentMethods,
    registrationTypes,
    sessions,
    participant,
  );

  const body = `
    <div style="font-size:18px; font-weight:bold; color:${emailStyles.colorHeading}; margin-bottom:20px;">New IMC ${year} Registration</div>
    <p style="margin:0 0 16px 0;">Hello IMC ${year} Team,</p>
    <p style="margin:0 0 16px 0;">A new participant has just registered for <strong style="color:${emailStyles.colorHeading};">${badge}</strong> IMC ${year}.</p>
    ${availabilityBlock} 
    <div>
      ${details}
    </div>
  `;
  return wrapEmailBody(body);
};

export const registrationEmailToParticipant = (
  participant,
  workshops,
  paymentMethods,
  registrationTypes,
  sessions,
  password,
) => {
  const {
    participant: curParticipant,
    workshops: curParticipantWorkshops,
    accommodation: curParticipantAccomodation,
    arrival: curParticipantArrival,
    extra_options: curPariticipantOptions,
    contributions: curParticipantContributions,
  } = participant;

  const isOnline = curParticipant.is_online === "1";
  const version = isOnline ? "ONLINE version" : "ON SITE version";

  const paymentInstructions =
    curParticipant.payment_method_id === "1"
      ? `<strong>${(parseFloat(curParticipant.total_due) + parseFloat(curParticipant.paypal_fee)).toFixed(2)}€</strong> 
        (including ${parseFloat(curParticipant.paypal_fee).toFixed(2)}€ of Paypal fees).<br>`
      : curParticipant.payment_method_id === "2"
        ? `<strong>${parseFloat(curParticipant.total_due).toFixed(2)}€</strong><br>
           Bank transfers are usually free for EU and EEA countries. However, any costs are always at the participant's expense.<br>`
        : `<strong>${parseFloat(curParticipant.total_due).toFixed(2)}€</strong><br>
           Since you haven't selected a payment method, <strong>please contact the IMO Treasurer Marc Gyssens immediately</strong>.<br>`;

  const paymentUrl = `https://imc${year}.imo.net/register/payment`;
  const paymentInstructionsMessage =
    curParticipant.payment_method_id === "1"
      ? `If you have not paid immediately after submitting your registration, you can find the necessary payment instructions ${link(paymentUrl, "on our website")}.`
      : `The necessary payment instructions can be found ${link(paymentUrl, "on our website")}.`;

  const loginUrl = `https://imc${year}.imo.net/login`;
  let summarySection = "";
  if (!isOnline) {
    summarySection = sectionHeading("Summary") + participantIntro(
      curParticipant,
      curParticipantAccomodation,
      curParticipantWorkshops,
      curParticipantContributions,
      curPariticipantOptions,
      sessions,
      true,
    );
  }

  const detailsBlock = registrationDetails(
    curParticipant,
    curParticipantAccomodation,
    curParticipantWorkshops,
    curParticipantContributions,
    curPariticipantOptions,
    curParticipantArrival,
    workshops,
    paymentMethods,
    registrationTypes,
    sessions,
    participant,
  );

  const body = `
    <div style="font-size:18px; font-weight:bold; color:${emailStyles.colorHeading}; margin-bottom:20px;">Welcome to IMC ${year}</div>
    <p style="margin:0 0 16px 0;">Dear ${curParticipant.title} ${curParticipant.first_name} ${curParticipant.last_name},</p>
    <p style="margin:0 0 16px 0;"><strong>Congratulations!</strong> You have successfully registered for the <strong>${version}</strong> of the ${year} International Meteor Conference.</p>
    <p style="margin:0 0 16px 0;">Your registration is nearly complete — one step remains: please submit the required payment of ${paymentInstructions}</p>
    <p style="margin:0 0 16px 0;">${paymentInstructionsMessage}</p>
    <p style="margin:0 0 16px 0;">The registration fee must be sent to the IMO Treasurer <strong>IMMEDIATELY</strong>. Failure to pay will result in <strong>cancellation of your registration</strong>.</p>
    <p style="margin:0 0 12px 0;">You can update your registration details using the password below at ${link(loginUrl, "our login page")}:</p>
    <div style="margin:0 0 20px 0; padding:12px 16px; background-color:${emailStyles.bgSubtle}; border:1px solid ${emailStyles.borderColor}; font-family:monospace; font-size:15px; font-weight:bold;">${password}</div>
    <p style="margin:0 0 24px 0;">We look forward to meeting you at the conference!</p>
    <p style="margin:0 0 24px 0; font-weight:bold;">The IMC ${year} Team</p>
    <div style="border-top:1px solid ${emailStyles.borderColor}; margin-top:20px; padding-top:16px;">
      <div style="font-weight:bold; color:${emailStyles.colorMuted}; margin-bottom:12px;">Details you provided</div>
      <p style="margin:0 0 12px 0; color:${emailStyles.colorMuted};">If you notice any discrepancies, please contact us immediately.</p>
      ${summarySection}
      <div style="border-top:1px solid ${emailStyles.borderColor}; margin-top:16px; padding-top:12px;">${detailsBlock}</div>
    </div>
  `;
  return wrapEmailBody(body);
};

const participantIntro = (
  curParticipant,
  curParticipantAccomodation,
  curParticipantWorkshops,
  curParticipantContributions,
  curParticipantOptions,
  sessions,
  _you = false,
) => {
  // Accommodation
  const accomValue = curParticipantAccomodation.registration_type === "no"
    ? "Own arrangement"
    : `${curParticipantAccomodation.registration_type.charAt(0).toUpperCase() + curParticipantAccomodation.registration_type.slice(1)} room at the LOC`;

  // Workshops
  const workshopsValue = curParticipantWorkshops.length === 0
    ? "None"
    : curParticipantWorkshops.map((w) => w.title).join(", ");

  // Contributions
  let contributionsValue = "None";
  if (curParticipantContributions.length > 0) {
    contributionsValue = curParticipantContributions.map((c) => {
      const label = c.type === "talk" ? "Talk" : "Poster";
      const session = getSessionName(c.session_id, sessions);
      const printNote = c.type === "poster" && c.print === "1" ? " — <strong>printed on site</strong>" : "";
      return `${label}: <strong>${c.title}</strong> (${session})${printNote}`;
    }).join("<br>");
  }

  // Extras
  const excursion = curParticipantOptions.excursion === "1" ? "Yes" : "No";
  const tshirt = curParticipantOptions.buy_tshirt === "1"
    ? `Yes (${curParticipantOptions.tshirt_size})`
    : "No";

  return (
    row("Accommodation:", accomValue) +
    row("Workshops:", workshopsValue) +
    row("Contributions:", contributionsValue) +
    row("Excursion:", excursion) +
    row("T-Shirt:", tshirt)
  );
};
