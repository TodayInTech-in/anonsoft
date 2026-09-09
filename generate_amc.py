from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

W, H = A4

BLACK      = colors.black
DARK_GRAY  = colors.HexColor("#111111")
MID_GRAY   = colors.HexColor("#555555")
LIGHT_GRAY = colors.HexColor("#AAAAAA")
RULE_GRAY  = colors.HexColor("#CCCCCC")
BOX_BG     = colors.HexColor("#F5F5F5")
WHITE      = colors.white

def rrect(c, x, y, w, h, r=3, fill=None, stroke=None, sw=0.5):
    p = c.beginPath()
    p.moveTo(x+r, y); p.lineTo(x+w-r, y)
    p.arcTo(x+w-2*r, y, x+w, y+2*r, -90, 90)
    p.lineTo(x+w, y+h-r)
    p.arcTo(x+w-2*r, y+h-2*r, x+w, y+h, 0, 90)
    p.lineTo(x+r, y+h)
    p.arcTo(x, y+h-2*r, x+2*r, y+h, 90, 90)
    p.lineTo(x, y+r)
    p.arcTo(x, y, x+2*r, y+2*r, 180, 90)
    p.close()
    if fill: c.setFillColor(fill)
    if stroke: c.setStrokeColor(stroke); c.setLineWidth(sw)
    c.drawPath(p, fill=bool(fill), stroke=bool(stroke))

def section_title(c, x, y, text):
    c.setFillColor(BLACK)
    c.rect(x, y - 1*mm, 3, 7*mm, fill=1, stroke=0)
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(x + 5*mm, y + 3*mm, text)

def bullet_row(c, x, y, text, sub=None):
    # bullet dot
    c.setFillColor(BLACK)
    c.circle(x + 2*mm, y + 2.5*mm, 1, fill=1, stroke=0)
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(x + 6*mm, y + 1*mm, text)
    if sub:
        c.setFillColor(MID_GRAY)
        c.setFont("Helvetica", 8)
        c.drawString(x + 6*mm, y - 4*mm, sub)

def generate_amc():
    out = "/mnt/user-data/outputs/ShieldsPro_AMC_Proposal_Anonsoft.pdf"
    c = canvas.Canvas(out, pagesize=A4)
    margin = 20*mm

    # White bg
    c.setFillColor(WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Black header
    c.setFillColor(BLACK)
    c.rect(0, H - 48*mm, W, 48*mm, fill=1, stroke=0)

    # Logo
    try:
        logo = ImageReader("/home/claude/logo.png")
        c.drawImage(logo, margin, H - 44*mm, width=34*mm, height=34*mm,
                    preserveAspectRatio=True, mask='auto')
    except:
        pass

    # Company name
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 20)
    c.drawRightString(W - margin, H - 20*mm, "Anonsoft")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 9)
    c.drawRightString(W - margin, H - 27*mm, "www.anonsoft.in")
    c.drawRightString(W - margin, H - 33*mm, "contact@anonsoft.in")

    # Doc label tag
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(margin, H - 42*mm, "MAINTENANCE PROPOSAL")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 8)
    c.drawString(margin + 46*mm, H - 42*mm, "· April 2025")

    # Page title
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(margin, H - 62*mm, "AMC Proposal")
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 10)
    c.drawString(margin, H - 70*mm, "Annual Maintenance Contract — ShieldsPro")
    c.setStrokeColor(BLACK)
    c.setLineWidth(2)
    c.line(margin, H - 73*mm, margin + 50*mm, H - 73*mm)

    # Objective box
    obj_y = H - 88*mm
    rrect(c, margin, obj_y - 12*mm, W - 2*margin, 14*mm, fill=BOX_BG, stroke=RULE_GRAY)
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(margin + 4*mm, obj_y - 3*mm, "OBJECTIVE")
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica", 9)
    c.drawString(margin + 4*mm, obj_y - 9*mm,
        "To ensure continuous performance, security, and smooth operation of ShieldsPro after MVP delivery.")

    # ── AMC Cost Calculation ──
    cost_y = H - 108*mm
    section_title(c, margin, cost_y, "AMC Cost Calculation")

    # Two stat boxes side by side
    bw = (W - 2*margin - 6*mm) / 2
    for i, (label, val) in enumerate([("Total Project Cost", "$2,000 USD"),
                                       ("Monthly AMC (10%)", "$200 USD / month")]):
        bx = margin + i*(bw + 6*mm)
        by = cost_y - 20*mm
        rrect(c, bx, by, bw, 16*mm, fill=BOX_BG if i==0 else BLACK, stroke=RULE_GRAY if i==0 else None)
        c.setFillColor(MID_GRAY if i==0 else LIGHT_GRAY)
        c.setFont("Helvetica", 8)
        c.drawString(bx + 4*mm, by + 11*mm, label)
        c.setFillColor(DARK_GRAY if i==0 else WHITE)
        c.setFont("Helvetica-Bold", 14)
        c.drawString(bx + 4*mm, by + 4*mm, val)

    # ── Scope of AMC ──
    scope_y = cost_y - 30*mm
    section_title(c, margin, scope_y, "Scope of AMC")

    scope_items = [
        ("Bug Fixes & Issue Resolution", "Timely identification and resolution of all reported bugs"),
        ("Server Monitoring & Maintenance", "24/7 uptime monitoring and proactive maintenance"),
        ("Performance Optimization", "Regular tuning to ensure optimal speed and efficiency"),
        ("Security Updates & Patches", "Keeping the system secure with latest patches"),
        ("Minor Feature Enhancements", "Small improvements within agreed scope"),
        ("Backup & Recovery Support", "Regular data backups and disaster recovery planning"),
        ("Technical Support (Email/WhatsApp)", "Dedicated support channel for quick assistance"),
    ]

    # Two-column layout
    col_w = (W - 2*margin - 6*mm) / 2
    for i, (title, desc) in enumerate(scope_items):
        col = i % 2
        row = i // 2
        sx = margin + col * (col_w + 6*mm)
        sy = scope_y - 10*mm - row * 17*mm
        rrect(c, sx, sy - 11*mm, col_w, 13*mm, fill=BOX_BG, stroke=RULE_GRAY)
        c.setFillColor(BLACK)
        c.circle(sx + 3*mm, sy - 4*mm, 1.2, fill=1, stroke=0)
        c.setFillColor(DARK_GRAY)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(sx + 6*mm, sy - 3*mm, title)
        c.setFillColor(MID_GRAY)
        c.setFont("Helvetica", 7.5)
        c.drawString(sx + 6*mm, sy - 8*mm, desc)

    # ── Support Terms & Billing ──
    terms_y = scope_y - 90*mm
    half = (W - 2*margin - 6*mm) / 2

    # Support Terms
    section_title(c, margin, terms_y, "Support Terms")
    rrect(c, margin, terms_y - 26*mm, half, 24*mm, fill=BOX_BG, stroke=RULE_GRAY)
    for j, (k, v) in enumerate([("Response Time:", "Within 24 Hours"),
                                  ("Critical Issues:", "Priority Resolution")]):
        ry = terms_y - 10*mm - j*10*mm
        c.setFillColor(MID_GRAY)
        c.setFont("Helvetica", 8.5)
        c.drawString(margin + 4*mm, ry, k)
        c.setFillColor(DARK_GRAY)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawRightString(margin + half - 4*mm, ry, v)

    # Billing Cycle
    bill_x = margin + half + 6*mm
    section_title(c, bill_x, terms_y, "Billing Cycle")
    rrect(c, bill_x, terms_y - 26*mm, half, 24*mm, fill=BLACK, stroke=None)
    for j, (k, v) in enumerate([("Monthly Billing:", "$200 USD"),
                                  ("Payment Due:", "Start of each month")]):
        ry = terms_y - 10*mm - j*10*mm
        c.setFillColor(LIGHT_GRAY)
        c.setFont("Helvetica", 8.5)
        c.drawString(bill_x + 4*mm, ry, k)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawRightString(bill_x + half - 4*mm, ry, v)

    # ── Duration & Exclusions ──
    dur_y = terms_y - 35*mm
    third = (W - 2*margin - 2*6*mm) / 3

    # Duration
    section_title(c, margin, dur_y, "Duration")
    rrect(c, margin, dur_y - 20*mm, third, 18*mm, fill=BOX_BG, stroke=RULE_GRAY)
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 8)
    c.drawString(margin + 4*mm, dur_y - 7*mm, "Minimum Commitment")
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(margin + 4*mm, dur_y - 14*mm, "3 Months")
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 7.5)
    c.drawString(margin + 31*mm, dur_y - 14*mm, "(Recommended)")

    # Exclusions
    excl_x = margin + third + 6*mm
    excl_w = third * 2 + 6*mm
    section_title(c, excl_x, dur_y, "Exclusions")
    rrect(c, excl_x, dur_y - 20*mm, excl_w, 18*mm, fill=BOX_BG, stroke=RULE_GRAY)
    excl = ["Major feature development", "Third-party paid services", "Infrastructure costs (server, APIs)"]
    for j, ex in enumerate(excl):
        ex_x = excl_x + 4*mm + (j % 2) * (excl_w / 2)
        if j == 2: ex_x = excl_x + 4*mm
        ey = dur_y - 7*mm - (j // 2) * 8*mm if j < 2 else dur_y - 14*mm
        c.setFillColor(BLACK)
        c.circle(ex_x + 1.5*mm, ey + 1.5*mm, 1, fill=1, stroke=0)
        c.setFillColor(MID_GRAY)
        c.setFont("Helvetica", 8)
        c.drawString(ex_x + 4*mm, ey, ex)

    # ── Signature ──
    sig_y = dur_y - 30*mm
    c.setStrokeColor(RULE_GRAY)
    c.setLineWidth(0.5)
    c.line(margin, sig_y, W - margin, sig_y)

    rrect(c, margin, sig_y - 24*mm, 90*mm, 22*mm, fill=BOX_BG, stroke=RULE_GRAY)
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 8)
    c.drawString(margin + 4*mm, sig_y - 5*mm, "Authorized By — Anonsoft")
    c.setStrokeColor(BLACK)
    c.setLineWidth(0.8)
    c.line(margin + 4*mm, sig_y - 12*mm, margin + 52*mm, sig_y - 12*mm)
    c.setFillColor(DARK_GRAY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin + 4*mm, sig_y - 17*mm, "Yasmin K")
    c.setFillColor(MID_GRAY)
    c.setFont("Helvetica", 8.5)
    c.drawString(margin + 4*mm, sig_y - 22*mm, "Founder & CEO, Anonsoft")

    # Official seal text
    seal_x = W - margin - 55*mm
    rrect(c, seal_x, sig_y - 24*mm, 55*mm, 22*mm, fill=WHITE, stroke=BLACK, sw=1)
    c.setStrokeColor(BLACK)
    c.setLineWidth(0.4)
    c.roundRect(seal_x + 2*mm, sig_y - 22*mm, 51*mm, 18*mm, 2, fill=0, stroke=1)
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(seal_x + 27.5*mm, sig_y - 9*mm, "TODAYINTECH")
    c.setFont("Helvetica", 7)
    c.drawCentredString(seal_x + 27.5*mm, sig_y - 14*mm, "Official Seal")
    c.drawCentredString(seal_x + 27.5*mm, sig_y - 19*mm, "www.anonsoft.in")

    # Footer
    c.setFillColor(BLACK)
    c.rect(0, 0, W, 16*mm, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 8)
    c.drawCentredString(W/2, 9*mm, "Thank you for your business!  ·  www.anonsoft.in  ·  contact@anonsoft.in")
    c.setFillColor(LIGHT_GRAY)
    c.setFont("Helvetica", 7)
    c.drawCentredString(W/2, 4*mm, "This document is confidential and intended solely for the named client.")

    c.save()
    print("Done:", out)

generate_amc()