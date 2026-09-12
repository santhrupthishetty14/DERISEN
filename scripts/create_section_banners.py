import cv2
import numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageEnhance
import os

os.makedirs('public/assets', exist_ok=True)

# Standard banner dimensions: 1920 x 760 (cinema-grade ultra-wide)
W, H = 1920, 760

def create_dark_purple_canvas():
    # Base dark studio gradient from deep obsidian #0B041A to rich violet #180D38
    img = np.zeros((H, W, 3), dtype=np.uint8)
    for y in range(H):
        ratio = y / H
        # BGR
        b = int(26 * (1 - ratio) + 56 * ratio)
        g = int(4 * (1 - ratio) + 13 * ratio)
        r = int(11 * (1 - ratio) + 24 * ratio)
        img[y, :] = [b, g, r]
    
    # Add ambient purple radial glow in center/right
    center_x, center_y = int(W * 0.65), int(H * 0.5)
    y_coords, x_coords = np.ogrid[:H, :W]
    dist = np.sqrt((x_coords - center_x)**2 + (y_coords - center_y)**2)
    max_radius = 650
    glow = np.clip(1.0 - (dist / max_radius), 0, 1) ** 2
    
    # Add purple aura (BGR: 238, 32, 99)
    img[:, :, 0] = np.clip(img[:, :, 0] + glow * 120, 0, 255).astype(np.uint8)
    img[:, :, 1] = np.clip(img[:, :, 1] + glow * 25, 0, 255).astype(np.uint8)
    img[:, :, 2] = np.clip(img[:, :, 2] + glow * 80, 0, 255).astype(np.uint8)
    
    return Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

def add_grid_overlay(pil_img, alpha=25):
    draw = ImageDraw.Draw(pil_img, 'RGBA')
    grid_size = 60
    for x in range(0, W, grid_size):
        draw.line([(x, 0), (x, H)], fill=(139, 92, 246, alpha), width=1)
    for y in range(0, H, grid_size):
        draw.line([(0, y), (W, y)], fill=(139, 92, 246, alpha), width=1)
    return pil_img

# =========================================================================
# 1. ABOUT US BANNER: Strategy, Innovation, Creative Agency Workspace
# =========================================================================
def build_about_banner():
    base = create_dark_purple_canvas()
    base = add_grid_overlay(base, alpha=18)
    
    # Load About composition asset
    about_comp_path = 'public/assets/about-visual-composition.png'
    if os.path.exists(about_comp_path):
        comp = Image.open(about_comp_path).convert('RGBA')
        # Scale nicely to fit right side of banner
        target_h = int(H * 0.88)
        aspect = comp.width / comp.height
        target_w = int(target_h * aspect)
        comp_resized = comp.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Glow behind it
        glow_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        glow_draw = ImageDraw.Draw(glow_layer)
        glow_draw.ellipse([W - target_w - 60, int(H*0.1), W + 40, int(H*0.9)], fill=(99, 32, 238, 90))
        glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(80))
        base.paste(glow_layer, (0, 0), glow_layer)
        
        # Paste visual on right side
        paste_x = W - target_w - 70
        paste_y = int((H - target_h) / 2)
        base.paste(comp_resized, (paste_x, paste_y), comp_resized)

    # Add floating glass cards on left/center with branding accents
    card_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card_layer)
    # Card 1: Strategic Innovation badge
    c_draw.rounded_rectangle([90, 160, 480, 270], radius=16, fill=(24, 13, 56, 170), outline=(179, 136, 255, 90), width=1)
    # Card 2: Metrics badge
    c_draw.rounded_rectangle([90, 310, 420, 420], radius=16, fill=(24, 13, 56, 170), outline=(0, 229, 255, 80), width=1)
    
    # Composite
    base = Image.alpha_composite(base.convert('RGBA'), card_layer)
    
    # Save
    out_path = 'public/assets/banner-about.jpg'
    base.convert('RGB').save(out_path, quality=94)
    print(f"Created {out_path} ({W}x{H})")

# =========================================================================
# 2. SERVICES BANNER: IT Solutions, Digital Ecosystem, Web & Tech Stack
# =========================================================================
def build_services_banner():
    base = create_dark_purple_canvas()
    base = add_grid_overlay(base, alpha=22)
    
    # Arrange the 4 service pillar cards in a sleek perspective cascade on right
    service_imgs = [
        'public/assets/service-it-solutions.jpg',
        'public/assets/service-creative-design.jpg',
        'public/assets/service-branding.jpg',
        'public/assets/service-marketing.jpg'
    ]
    
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    
    card_w, card_h = 360, 240
    positions = [
        (W - 440, 90),
        (W - 740, 180),
        (W - 480, 380),
        (W - 780, 450),
    ]
    
    for idx, (path, pos) in enumerate(zip(service_imgs, positions)):
        if os.path.exists(path):
            card = Image.open(path).convert('RGBA')
            card = card.resize((card_w, card_h), Image.Resampling.LANCZOS)
            
            # Create rounded card with glowing border
            mask = Image.new('L', (card_w, card_h), 0)
            m_draw = ImageDraw.Draw(mask)
            m_draw.rounded_rectangle([0, 0, card_w, card_h], radius=18, fill=255)
            
            # Subtle border
            card_with_border = Image.new('RGBA', (card_w + 4, card_h + 4), (0, 0, 0, 0))
            b_draw = ImageDraw.Draw(card_with_border)
            glow_color = (0, 229, 255, 140) if idx == 0 else (179, 136, 255, 120)
            b_draw.rounded_rectangle([0, 0, card_w + 3, card_h + 3], radius=20, outline=glow_color, width=2)
            
            card_with_border.paste(card, (2, 2), mask)
            overlay.paste(card_with_border, pos, card_with_border)
    
    # Ambient cyan/violet energy lines connecting cards
    o_draw = ImageDraw.Draw(overlay)
    o_draw.line([(positions[1][0] + card_w, positions[1][1] + 120), (positions[0][0], positions[0][1] + 120)], fill=(0, 229, 255, 90), width=2)
    o_draw.line([(positions[3][0] + card_w, positions[3][1] + 120), (positions[2][0], positions[2][1] + 120)], fill=(139, 92, 246, 90), width=2)
    
    base = Image.alpha_composite(base.convert('RGBA'), overlay)
    
    out_path = 'public/assets/banner-services.jpg'
    base.convert('RGB').save(out_path, quality=94)
    print(f"Created {out_path} ({W}x{H})")

# =========================================================================
# 3. WORK GALLERY BANNER: Portfolio Showcase, Creative Projects
# =========================================================================
def build_work_banner():
    base = create_dark_purple_canvas()
    base = add_grid_overlay(base, alpha=18)
    
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    
    # Hero visual or 3D composition as the centerpiece
    hero_path = 'public/assets/hero-composition.jpg'
    if not os.path.exists(hero_path):
        hero_path = 'public/assets/hero-3d-scene-perfect.png'
    
    if os.path.exists(hero_path):
        hero = Image.open(hero_path).convert('RGBA')
        target_h = int(H * 0.85)
        target_w = int(target_h * (hero.width / hero.height))
        hero_resized = hero.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Soft mask for seamless blending
        mask = Image.new('L', (target_w, target_h), 255)
        m_draw = ImageDraw.Draw(mask)
        # Vignette fade on left
        for x in range(120):
            alpha = int(255 * (x / 120))
            m_draw.line([(x, 0), (x, target_h)], fill=alpha)
            
        overlay.paste(hero_resized, (W - target_w - 50, int((H - target_h) / 2)), mask)
        
    # Floating 5-star testimonial badge on left
    o_draw = ImageDraw.Draw(overlay)
    o_draw.rounded_rectangle([90, 180, 480, 310], radius=18, fill=(24, 13, 56, 180), outline=(255, 215, 0, 90), width=1)
    o_draw.rounded_rectangle([90, 350, 440, 460], radius=18, fill=(24, 13, 56, 180), outline=(139, 92, 246, 90), width=1)
    
    base = Image.alpha_composite(base.convert('RGBA'), overlay)
    
    out_path = 'public/assets/banner-work.jpg'
    base.convert('RGB').save(out_path, quality=94)
    print(f"Created {out_path} ({W}x{H})")

# =========================================================================
# 4. CONTACT BANNER: Digital Connection, Communication Hub, Elevation Beacon
# =========================================================================
def build_contact_banner():
    base = create_dark_purple_canvas()
    base = add_grid_overlay(base, alpha=24)
    
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    o_draw = ImageDraw.Draw(overlay)
    
    # Glowing futuristic connectivity beacon in center/right
    cx, cy = int(W * 0.72), int(H * 0.5)
    
    # Concentric glowing rings
    for r in [80, 140, 200, 280, 360]:
        color = (139, 92, 246, max(20, 120 - int(r*0.25)))
        o_draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=color, width=2)
        
    # Digital data nodes radiating outward
    for angle in np.linspace(0, 2*np.pi, 12, endpoint=False):
        nx = int(cx + 280 * np.cos(angle))
        ny = int(cy + 280 * np.sin(angle))
        o_draw.line([(cx, cy), (nx, ny)], fill=(0, 229, 255, 45), width=1)
        o_draw.ellipse([nx-6, ny-6, nx+6, ny+6], fill=(0, 229, 255, 180))
        
    # Central illuminated brand core
    o_draw.ellipse([cx-50, cy-50, cx+50, cy+50], fill=(99, 32, 238, 220), outline=(255, 255, 255, 200), width=2)
    
    # If official logo exists, overlay on center
    logo_path = 'public/assets/derisen-official-logo.jpg'
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert('RGBA')
        logo = logo.resize((80, 80), Image.Resampling.LANCZOS)
        # Circular mask
        l_mask = Image.new('L', (80, 80), 0)
        lm_draw = ImageDraw.Draw(l_mask)
        lm_draw.ellipse([0, 0, 80, 80], fill=255)
        overlay.paste(logo, (cx-40, cy-40), l_mask)
        
    # Left communication pill badges
    o_draw.rounded_rectangle([90, 200, 480, 310], radius=18, fill=(24, 13, 56, 180), outline=(0, 229, 255, 100), width=1)
    o_draw.rounded_rectangle([90, 350, 440, 460], radius=18, fill=(24, 13, 56, 180), outline=(139, 92, 246, 90), width=1)
    
    base = Image.alpha_composite(base.convert('RGBA'), overlay)
    
    out_path = 'public/assets/banner-contact.jpg'
    base.convert('RGB').save(out_path, quality=94)
    print(f"Created {out_path} ({W}x{H})")

build_about_banner()
build_services_banner()
build_work_banner()
build_contact_banner()
print("All 4 banners generated successfully!")
