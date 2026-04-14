from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

W, H = A4

# Black & White palette
BG         = colors.white
BLACK      = colors.black
DARK_GRAY  = colors.HexColor("#111111")
MID_GRAY   = colors.HexColor("#555555")
LIGHT_GRAY = colors.HexColor("#AAAAAA")
RULE_GRAY  = colors.HexColor("#CCCCCC")
BOX_BG     = colors.HexColor("#F5F5F5")
WHITE      = colors.white

def draw_rounded_rect(c, x, y, w, h, r, fill=None, stroke=None, sw=0.5):
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
        c.setLineWidth(sw)
    c.drawPath(p, fill=bool(fill), stroke=bool(stroke))

def generate_invoice():
    out = "/mnt/user-data/outputs/ShieldsPro_Invoice_TodayInTech.pdf"
    c = canvas.Canvas(out, pagesize=A4)
    margin = 20*mm

    # White background
    c.setFillColor(WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Black header bar
    c.setFillColor(BLACK)
    c.rect(0, H - 50*mm, W, 50*mm, fill=1, stroke=0)

    # Thin white rule below header
    c.setStrokeColor(RULE_GRAY)
    c.setLineWidth(0.5)
    c.line(0, H - 50*mm, W, H - 50*mm)

    # --- Logo (white mask on black bg) ---
    try:
        logo = ImageReader("/home/claude/logo.png")
        c.drawImage(logo, margin, H - 46*mm, width=36*mm, height=36*mm,
                    preserveAspectRatio=True, mask='auto')
    except:
        pass

    # Company name (white on black)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 20)
    c.drawRightString(W - margin, H - 22*mm, "TodayInTech")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 9)
    c.drawRightString(W - margin, H - 29*mm, "www.todayintech.in")
    c.drawRightString(W - margin, H - 35*mm, "contact@todayintech.in")

    # --- INVOICE title (white on black) ---
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 30)
    c.drawString(margin, H - 32*mm, "INVOICE")

    # --- Invoice meta box ---
    meta_x = W - margin - 68*mm
    meta_y = H - 58*mm
    draw_rounded_rect(c, meta_x, meta_y - 30*mm, 68*mm, 32*mm, 3,
                      fill=BOX_BG, stroke=RULE_GRAY, sw=0.5)

    def meta_row(label, value, y_offset, bold_val=False):
        c.setFillColor(MID_GRAY)
        c.setFont("Helvetica", 8)
        c.drawString(meta_x + 4*mm, meta_y - y_offset, label)
        c.setFillColor(DARK_GRAY)
        c.setFont("Helvetica-Bold" if bold_val else "Helvetica", 9)
        c.drawRightString(meta_x + 64*mm, meta_y - y_offset, value)

    meta_row("Invoice No.", "INV-2025-001", 6*mm)
    meta_row("Date:", "April 12, 2025", 12*mm)
    meta_row("Project:", "ShieldsPro MVP", 18*mm)
    meta_row("Status:", "60% Delivered", 24*mm, bold_val=True)

    # --- FROM / BILLED TO ---
    sec_y = H - 102*mm

    # FROM
    draw_rounded_rect(c, margin, sec_y - 32*mm, 80*mm, 34*mm, 3,
                      fill=BOX_BG, stroke=RULE_GRAY, sw=0.5)
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawString(margin + 4*mm, sec_y - 5*mm, "FROM")
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(margin + 4*mm, sec_y - 12*mm, "Sk Jasimuddin")
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 9)
    c.drawString(margin + 4*mm, sec_y - 18*mm, "Founder & CEO, TodayInTech")
    c.drawString(margin + 4*mm, sec_y - 24*mm, "www.todayintech.in")
    c.drawString(margin + 4*mm, sec_y - 30*mm, "contact@todayintech.in")

    # BILLED TO
    to_x = W/2 + 5*mm
    draw_rounded_rect(c, to_x, sec_y - 32*mm, W - to_x - margin, 34*mm, 3,
                      fill=BOX_BG, stroke=RULE_GRAY, sw=0.5)
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawString(to_x + 4*mm, sec_y - 5*mm, "BILLED TO")
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(to_x + 4*mm, sec_y - 12*mm, "ShieldsPro")
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 9)
    c.drawString(to_x + 4*mm, sec_y - 18*mm, "Client")
    c.drawString(to_x + 4*mm, sec_y - 24*mm, "Project: ShieldsPro MVP Development")

    # --- Items Table ---
    tbl_y = sec_y - 42*mm

    # Header row — black fill
    c.setFillColor(BLACK)
    c.roundRect(margin, tbl_y - 8*mm, W - 2*margin, 10*mm, 2, fill=1, stroke=0)
    cols = [margin+4*mm, margin+88*mm, margin+122*mm]
    headers = ["Description", "Completion", "Rate", "Amount (USD)"]
    for i, ht in enumerate(headers):
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 8.5)
        if i == len(headers)-1:
            c.drawRightString(W - margin - 4*mm, tbl_y - 5*mm, ht)
        else:
            c.drawString(cols[i], tbl_y - 5*mm, ht)

    # Row
    row_y = tbl_y - 22*mm
    draw_rounded_rect(c, margin, row_y - 2*mm, W - 2*margin, 18*mm, 3,
                      fill=BOX_BG, stroke=RULE_GRAY, sw=0.5)

    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin + 4*mm, row_y + 10*mm, "60% Payment for MVP Completion")
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 8)
    c.drawString(margin + 4*mm, row_y + 4*mm, "MVP delivered — core features complete")

    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica", 9)
    c.drawString(margin + 88*mm, row_y + 7*mm, "60% of $2,000")
    c.drawString(margin + 122*mm, row_y + 7*mm, "$2,000.00")

    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 11)
    c.drawRightString(W - margin - 4*mm, row_y + 7*mm, "$1,200.00")

    # Divider
    dv_y = row_y - 10*mm
    c.setStrokeColor(RULE_GRAY)
    c.setLineWidth(0.5)
    c.line(margin, dv_y, W - margin, dv_y)

    # Totals
    totals_y = dv_y - 6*mm
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 9)
    c.drawRightString(W - margin - 35*mm, totals_y, "Project Total:")
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica", 10)
    c.drawRightString(W - margin - 4*mm, totals_y, "$2,000.00")

    # Amount due — black box
    c.setFillColor(BLACK)
    c.roundRect(W - margin - 72*mm, totals_y - 14*mm, 72*mm, 11*mm, 2, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 9)
    c.drawRightString(W - margin - 38*mm, totals_y - 9*mm, "Amount Due (60%):")
    c.setFont("Helvetica-Bold", 13)
    c.drawRightString(W - margin - 4*mm, totals_y - 10*mm, "$1,200.00")

    # --- Payment Section ---
    pay_y = totals_y - 30*mm
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(margin, pay_y, "Payment Details")
    c.setStrokeColor(BLACK)
    c.setLineWidth(1.5)
    c.line(margin, pay_y - 2*mm, margin + 42*mm, pay_y - 2*mm)

    # Payment card
    draw_rounded_rect(c, margin, pay_y - 46*mm, W - 2*margin - 50*mm, 44*mm, 3,
                      fill=BOX_BG, stroke=RULE_GRAY, sw=0.5)

    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(margin + 4*mm, pay_y - 9*mm, "USDT (TRC20) via Binance")
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 7.5)
    c.drawString(margin + 4*mm, pay_y - 15*mm, "Wallet Address:")

    # Address in monospace-like box
    c.setFillColor(RULE_GRAY)
    c.roundRect(margin + 4*mm, pay_y - 26*mm, W - 2*margin - 58*mm, 8*mm, 2, fill=1, stroke=0)
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(margin + 6*mm, pay_y - 22*mm, "T9zSAuG52TvcLK3p9dtcsMsP2rkS7Dj2Dc")

    c.setStrokeColor(RULE_GRAY)
    c.setLineWidth(0.5)
    c.line(margin + 4*mm, pay_y - 30*mm, W - 2*margin - 54*mm, pay_y - 30*mm)

    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(margin + 4*mm, pay_y - 35*mm, "Also via Payoneer")
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 8)
    c.drawString(margin + 4*mm, pay_y - 41*mm, "Contact us to arrange Payoneer transfer")

    # --- QR Code ---
    qr_size = 44*mm
    qr_x = W - margin - qr_size
    qr_y = pay_y - qr_size - 2*mm
    draw_rounded_rect(c, qr_x - 3*mm, qr_y - 5*mm, qr_size + 6*mm, qr_size + 12*mm, 3,
                      fill=BOX_BG, stroke=RULE_GRAY, sw=0.5)
    try:
        qr = ImageReader("/home/claude/qr.png")
        c.drawImage(qr, qr_x, qr_y, width=qr_size, height=qr_size,
                    preserveAspectRatio=True, mask='auto')
    except:
        pass
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica-Bold", 7)
    c.drawCentredString(qr_x + qr_size/2, qr_y - 3*mm, "Scan to Pay")

    # --- Signature ---
    sig_y = pay_y - 62*mm
    draw_rounded_rect(c, margin, sig_y - 22*mm, 90*mm, 24*mm, 3,
                      fill=BOX_BG, stroke=RULE_GRAY, sw=0.5)
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 8)
    c.drawString(margin + 4*mm, sig_y - 5*mm, "Authorized Signatory")
    c.setStrokeColor(BLACK)
    c.setLineWidth(0.8)
    c.line(margin + 4*mm, sig_y - 11*mm, margin + 52*mm, sig_y - 11*mm)
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin + 4*mm, sig_y - 16*mm, "Sk Jasimuddin")
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 8.5)
    c.drawString(margin + 4*mm, sig_y - 22*mm, "Founder & CEO, TodayInTech")

    # --- Footer ---
    c.setFillColor(BLACK)
    c.rect(0, 0, W, 16*mm, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 8)
    c.drawCentredString(W/2, 9*mm, "Thank you for your business!  ·  www.todayintech.in  ·  contact@todayintech.in")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 7)
    c.drawCentredString(W/2, 4*mm, "This invoice is computer generated and valid without physical signature.")

    c.save()
    print("Done:", out)

generate_invoice()