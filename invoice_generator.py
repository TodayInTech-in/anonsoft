from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
import datetime
import os

W, H = A4

## pip install reportlab --break-system-packages -q
# Brand colors
DARK_BG    = colors.HexColor("#0D1117")
CARD_BG    = colors.HexColor("#161B22")
CYAN       = colors.HexColor("#00C8FF")
PURPLE     = colors.HexColor("#9B59FF")
WHITE      = colors.white
LIGHT_GRAY = colors.HexColor("#8B949E")
BORDER     = colors.HexColor("#21262D")
GREEN      = colors.HexColor("#28C76F")
AMBER      = colors.HexColor("#FFC107")

def draw_rounded_rect(c, x, y, w, h, r, fill=None, stroke=None):
    p = c.beginPath()
    p.moveTo(x + r, y)
    p.lineTo(x + w - r, y)
    p.arcTo(x + w - 2*r, y, x + w, y + 2*r, -90, 90)
    p.lineTo(x + w, y + h - r)
    p.arcTo(x + w - 2*r, y + h - 2*r, x + w, y + h, 0, 90)
    p.lineTo(x + r, y + h)
    p.arcTo(x, y + h - 2*r, x + 2*r, y + h, 90, 90)
    p.lineTo(x, y + r)
    p.arcTo(x, y, x + 2*r, y + 2*r, 180, 90)
    p.close()
    if fill:
        c.setFillColor(fill)
    if stroke:
        c.setStrokeColor(stroke)
    c.drawPath(p, fill=bool(fill), stroke=bool(stroke))

def generate_invoice(company_name, services):
    total = sum(s["amount"] for s in services)
    safe = "".join(ch if ch.isalnum() or ch in "-_" else "_" for ch in company_name)
    os.makedirs("invoice", exist_ok=True)
    out = f"invoice/Invoice_{safe}.pdf"
    c = canvas.Canvas(out, pagesize=A4)
    margin = 20*mm

    # --- Background ---
    c.setFillColor(DARK_BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # --- Gradient header band ---
    for i in range(60):
        t = i / 60
        r = int(0x0D + t*(0x1a - 0x0D))
        g = int(0x11 + t*(0x1f - 0x11))
        b = int(0x17 + t*(0x35 - 0x17))
        c.setFillColor(colors.Color(r/255, g/255, b/255))
        c.rect(0, H - 55*mm - i, W, 1, fill=1, stroke=0)

    # Cyan accent bar at very top
    c.setFillColor(CYAN)
    c.rect(0, H-3, W, 3, fill=1, stroke=0)

    # --- Logo ---
    try:
        logo = ImageReader("assets/logo.png")
        c.drawImage(logo, margin, H - 48*mm, width=38*mm, height=38*mm,
                    preserveAspectRatio=True, mask='auto')
    except:
        pass

    # --- Company name + website (top right) ---
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 18)
    c.drawRightString(W - margin, H - 22*mm, "Anonsoft")
    c.setFillColor(CYAN)
    c.setFont("Helvetica", 9)
    c.drawRightString(W - margin, H - 29*mm, "www.anonsoft.in")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 8)
    c.drawRightString(W - margin, H - 35*mm, "contact@anonsoft.in")

    # --- INVOICE title ---
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 28)
    c.drawString(margin, H - 68*mm, "INVOICE")
    c.setStrokeColor(CYAN)
    c.setLineWidth(2)
    c.line(margin, H - 70*mm, margin + 55*mm, H - 70*mm)

    # --- Invoice meta (right side) ---
    meta_x = W - margin - 65*mm
    meta_y = H - 60*mm
    today = datetime.date.today().strftime("%B %d, %Y")
    draw_rounded_rect(c, meta_x, meta_y - 20*mm, 65*mm, 22*mm, 4,
                      fill=CARD_BG, stroke=BORDER)
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)

    def meta_row(label, value, y_offset, val_color=WHITE):
        c.setFillColor(LIGHT_GRAY)
        c.setFont("Helvetica", 8)
        c.drawString(meta_x + 4*mm, meta_y - y_offset, label)
        c.setFillColor(val_color)
        c.setFont("Helvetica-Bold", 9)
        c.drawRightString(meta_x + 61*mm, meta_y - y_offset, value)

    meta_row("Invoice No.", "INV-2025-001", 6*mm)
    meta_row("Date:", today, 12*mm)
    meta_row("Status:", "Pending", 18*mm, AMBER)

    # --- Billed To / From ---
    sec_y = H - 100*mm

    # FROM box
    draw_rounded_rect(c, margin, sec_y - 32*mm, 80*mm, 34*mm, 4,
                      fill=CARD_BG, stroke=BORDER)
    c.setFillColor(CYAN)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(margin + 4*mm, sec_y - 5*mm, "FROM")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(margin + 4*mm, sec_y - 12*mm, "Sk Jasimuddin")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 9)
    c.drawString(margin + 4*mm, sec_y - 18*mm, "Founder & CEO, Anonsoft")
    c.drawString(margin + 4*mm, sec_y - 24*mm, "www.anonsoft.in")
    c.drawString(margin + 4*mm, sec_y - 30*mm, "contact@anonsoft.in")

    # TO box
    to_x = W/2 + 5*mm
    draw_rounded_rect(c, to_x, sec_y - 32*mm, W - to_x - margin, 34*mm, 4,
                      fill=CARD_BG, stroke=BORDER)
    c.setFillColor(PURPLE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(to_x + 4*mm, sec_y - 5*mm, "BILLED TO")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(to_x + 4*mm, sec_y - 12*mm, company_name)
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 9)
    c.drawString(to_x + 4*mm, sec_y - 18*mm, "Client")
    c.drawString(to_x + 4*mm, sec_y - 24*mm, "Services provided by Anonsoft")

    # --- Items Table ---
    N = len(services)
    ROW_H = 20*mm
    tbl_y = sec_y - 42*mm

    # Table header
    draw_rounded_rect(c, margin, tbl_y - 8*mm, W - 2*margin, 10*mm, 3,
                      fill=colors.HexColor("#1C2333"), stroke=None)
    c.setFillColor(CYAN)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(margin + 4*mm, tbl_y - 5*mm, "Description")
    c.drawRightString(W - margin - 4*mm, tbl_y - 5*mm, "Amount (USD)")

    # Dynamic rows
    for i, svc in enumerate(services):
        row_y = tbl_y - 22*mm - i * ROW_H
        draw_rounded_rect(c, margin, row_y - 2*mm, W - 2*margin, 18*mm, 3,
                          fill=CARD_BG, stroke=BORDER)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(margin + 4*mm, row_y + 7*mm, svc["name"])
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 11)
        c.drawRightString(W - margin - 4*mm, row_y + 7*mm, f"${svc['amount']:,.2f}")

    # Divider
    dv_y = tbl_y - 30*mm - (N - 1) * ROW_H
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(margin, dv_y, W - margin, dv_y)

    # Totals
    totals_y = dv_y - 6*mm

    def total_row(label, val, y, lc=LIGHT_GRAY, vc=WHITE, bold=False):
        c.setFillColor(lc)
        c.setFont("Helvetica-Bold" if bold else "Helvetica", 9 if not bold else 10)
        c.drawRightString(W - margin - 35*mm, y, label)
        c.setFillColor(vc)
        c.setFont("Helvetica-Bold", 10 if not bold else 13)
        c.drawRightString(W - margin - 4*mm, y, val)

    total_row("Total Due:", f"${total:,.2f}", totals_y, vc=CYAN, bold=True)
    draw_rounded_rect(c, W - margin - 70*mm, totals_y - 6*mm,
                      70*mm, 10*mm, 3, stroke=CYAN)

    # --- Payment Section ---
    pay_y = totals_y - 30*mm
    c.setFillColor(CYAN)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(margin, pay_y, "Payment Details")
    c.setLineWidth(1)
    c.line(margin, pay_y - 2*mm, margin + 40*mm, pay_y - 2*mm)

    # Payment card
    draw_rounded_rect(c, margin, pay_y - 45*mm, W - 2*margin - 48*mm, 43*mm, 4,
                      fill=CARD_BG, stroke=BORDER)

    c.setFillColor(AMBER)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(margin + 4*mm, pay_y - 9*mm, "USDT (TRC20) via Binance")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 7.5)
    c.drawString(margin + 4*mm, pay_y - 15*mm, "Wallet Address:")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(margin + 4*mm, pay_y - 21*mm, "T9zSAuG52TvcLK3p9dtcsMsP2rkS7Dj2Dc")

    c.setFillColor(colors.HexColor("#21262D"))
    c.roundRect(margin + 4*mm, pay_y - 28*mm, W - 2*margin - 56*mm - 4*mm, 7*mm,
                2, fill=1, stroke=0)
    c.setFillColor(CYAN)
    c.setFont("Helvetica", 7.5)
    c.drawString(margin + 6*mm, pay_y - 25*mm, "T9zSAuG52TvcLK3p9dtcsMsP2rkS7Dj2Dc")

    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(margin + 4*mm, pay_y - 32*mm, W - 2*margin - 52*mm, pay_y - 32*mm)

    c.setFillColor(PURPLE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(margin + 4*mm, pay_y - 37*mm, "Also via Payoneer")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 8)
    c.drawString(margin + 4*mm, pay_y - 43*mm, "Contact us to arrange Payoneer transfer")

    # --- QR Code ---
    qr_size = 44*mm
    qr_x = W - margin - qr_size
    qr_y = pay_y - qr_size - 1*mm
    draw_rounded_rect(c, qr_x - 3*mm, qr_y - 3*mm, qr_size + 6*mm, qr_size + 10*mm, 4,
                      fill=CARD_BG, stroke=CYAN)
    try:
        qr = ImageReader("assets/trc_20_address.png")
        c.drawImage(qr, qr_x, qr_y, width=qr_size, height=qr_size,
                    preserveAspectRatio=True, mask='auto')
    except:
        pass
    c.setFillColor(CYAN)
    c.setFont("Helvetica-Bold", 7)
    c.drawCentredString(qr_x + qr_size/2, qr_y - 1*mm, "Scan to Pay")

    # --- Signature ---
    sig_y = pay_y - 60*mm
    draw_rounded_rect(c, margin, sig_y - 20*mm, 85*mm, 22*mm, 4,
                      fill=CARD_BG, stroke=BORDER)
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 8)
    c.drawString(margin + 4*mm, sig_y - 5*mm, "Authorized Signatory")
    c.setStrokeColor(PURPLE)
    c.setLineWidth(0.8)
    c.line(margin + 4*mm, sig_y - 11*mm, margin + 50*mm, sig_y - 11*mm)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(margin + 4*mm, sig_y - 15*mm, "Sk Jasimuddin")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 8)
    c.drawString(margin + 4*mm, sig_y - 20*mm, "Founder & CEO, Anonsoft")

    # --- Footer ---
    c.setFillColor(colors.HexColor("#0D1117"))
    c.rect(0, 0, W, 18*mm, fill=1, stroke=0)
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(margin, 18*mm, W - margin, 18*mm)

    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 8)
    c.drawCentredString(W/2, 12*mm, "Thank you for your business! · www.anonsoft.in · contact@anonsoft.in")
    c.setFillColor(colors.HexColor("#3A3A4A"))
    c.setFont("Helvetica", 7)
    c.drawCentredString(W/2, 7*mm, "This invoice is computer generated and valid without physical signature.")

    c.save()
    return out


if __name__ == "__main__":
    company_name = input("Enter company name you want to bill: ").strip()

    services = []
    while True:
        raw = input("Enter service and amount separated by comma: ").strip()
        try:
            parts = raw.rsplit(",", 1)
            name = parts[0].strip()
            amount = float(parts[1].strip().replace("$", "").replace(",", ""))
            if not name:
                raise ValueError
            services.append({"name": name, "amount": amount})
        except (IndexError, ValueError):
            print("  Invalid format. Try: Web Development, 1500")
            continue

        more = input("Do you want to add another service? (Y/N): ").strip().upper()
        if more != "Y":
            break

    out_path = generate_invoice(company_name, services)
    print(f"\nInvoice created successfully --> {out_path}")
