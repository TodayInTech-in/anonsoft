from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.platypus import Table, TableStyle
from reportlab.lib.utils import ImageReader

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

def generate_invoice():
    out = "/mnt/user-data/outputs/ShieldsPro_Invoice_TodayInTech.pdf"
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
        logo = ImageReader("/home/claude/logo.png")
        c.drawImage(logo, margin, H - 48*mm, width=38*mm, height=38*mm,
                    preserveAspectRatio=True, mask='auto')
    except:
        pass

    # --- Company name + website (top right) ---
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 18)
    c.drawRightString(W - margin, H - 22*mm, "TodayInTech")
    c.setFillColor(CYAN)
    c.setFont("Helvetica", 9)
    c.drawRightString(W - margin, H - 29*mm, "www.todayintech.in")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 8)
    c.drawRightString(W - margin, H - 35*mm, "contact@todayintech.in")

    # --- INVOICE title ---
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 28)
    c.drawString(margin, H - 68*mm, "INVOICE")
    # Cyan underline
    c.setStrokeColor(CYAN)
    c.setLineWidth(2)
    c.line(margin, H - 70*mm, margin + 55*mm, H - 70*mm)

    # --- Invoice meta (right side) ---
    meta_x = W - margin - 65*mm
    meta_y = H - 60*mm
    draw_rounded_rect(c, meta_x, meta_y - 28*mm, 65*mm, 30*mm, 4,
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
    meta_row("Date:", "April 12, 2025", 12*mm)
    meta_row("Project:", "ShieldsPro MVP", 18*mm)
    meta_row("Status:", "60% Delivered", 24*mm, AMBER)

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
    c.drawString(margin + 4*mm, sec_y - 12*mm, "Yasmin K")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 9)
    c.drawString(margin + 4*mm, sec_y - 18*mm, "Founder & CEO, TodayInTech")
    c.drawString(margin + 4*mm, sec_y - 24*mm, "www.todayintech.in")
    c.drawString(margin + 4*mm, sec_y - 30*mm, "contact@todayintech.in")

    # TO box
    to_x = W/2 + 5*mm
    draw_rounded_rect(c, to_x, sec_y - 32*mm, W - to_x - margin, 34*mm, 4,
                      fill=CARD_BG, stroke=BORDER)
    c.setFillColor(PURPLE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(to_x + 4*mm, sec_y - 5*mm, "BILLED TO")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(to_x + 4*mm, sec_y - 12*mm, "ShieldsPro")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 9)
    c.drawString(to_x + 4*mm, sec_y - 18*mm, "Client")
    c.drawString(to_x + 4*mm, sec_y - 24*mm, "Project: ShieldsPro MVP Development")

    # --- Items Table ---
    tbl_y = sec_y - 42*mm

    # Table header
    draw_rounded_rect(c, margin, tbl_y - 8*mm, W - 2*margin, 10*mm, 3,
                      fill=colors.HexColor("#1C2333"), stroke=None)
    cols = [margin+4*mm, margin+90*mm, margin+125*mm, W-margin-4*mm]
    headers = ["Description", "Completion", "Rate", "Amount (USD)"]
    header_colors = [CYAN, CYAN, CYAN, CYAN]
    for i, (hx, ht, hc) in enumerate(zip(cols, headers, header_colors)):
        c.setFillColor(hc)
        c.setFont("Helvetica-Bold", 9)
        if i == len(headers)-1:
            c.drawRightString(W - margin - 4*mm, tbl_y - 5*mm, ht)
        else:
            c.drawString(hx, tbl_y - 5*mm, ht)

    # Row
    row_y = tbl_y - 22*mm
    draw_rounded_rect(c, margin, row_y - 2*mm, W - 2*margin, 18*mm, 3,
                      fill=CARD_BG, stroke=BORDER)

    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin + 4*mm, row_y + 10*mm, "60% Payment for MVP Completion")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 8)
    c.drawString(margin + 4*mm, row_y + 4*mm, "MVP delivered — core features complete")

    c.setFillColor(AMBER)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(margin + 90*mm, row_y + 7*mm, "60% of $2,000")

    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 9)
    c.drawString(margin + 125*mm, row_y + 7*mm, "$2,000.00")

    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 11)
    c.drawRightString(W - margin - 4*mm, row_y + 7*mm, "$1,200.00")

    # Divider
    dv_y = row_y - 8*mm
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

    total_row("Project Total:", "$2,000.00", totals_y)
    total_row("Amount Due (60%):", "$1,200.00", totals_y - 8*mm, vc=CYAN, bold=True)

    # Cyan box around amount due
    draw_rounded_rect(c, W - margin - 70*mm, totals_y - 14*mm,
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
        qr = ImageReader("/home/claude/qr.png")
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
    c.drawString(margin + 4*mm, sig_y - 15*mm, "Yasmin K")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 8)
    c.drawString(margin + 4*mm, sig_y - 20*mm, "Founder & CEO, TodayInTech")

    # --- Footer ---
    c.setFillColor(colors.HexColor("#0D1117"))
    c.rect(0, 0, W, 18*mm, fill=1, stroke=0)
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(margin, 18*mm, W - margin, 18*mm)

    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 8)
    c.drawCentredString(W/2, 12*mm, "Thank you for your business! · www.todayintech.in · contact@todayintech.in")
    c.setFillColor(colors.HexColor("#3A3A4A"))
    c.setFont("Helvetica", 7)
    c.drawCentredString(W/2, 7*mm, "This invoice is computer generated and valid without physical signature.")

    c.save()
    print("Done:", out)

generate_invoice()