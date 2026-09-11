import os
import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

def unsharp_mask(img_cv, amount=1.25, radius=1.5):
    gaussian = cv2.GaussianBlur(img_cv, (0, 0), radius)
    sharpened = cv2.addWeighted(img_cv, amount, gaussian, 1 - amount, 0)
    return sharpened

def run():
    os.makedirs('public/assets', exist_ok=True)
    
    # -------------------------------------------------------------
    # 1. Operating Model: 4 Services (from Slide 4 4K: 3840 x 2160)
    # -------------------------------------------------------------
    im4 = cv2.imread('extracted_hd_slides/slide_4_4k.png')
    
    # Exactly bounds inside the photo of each card, perfectly avoiding the circular badge at the bottom
    service_boxes = {
        'service-creative-design.jpg': (585, 1035, 102, 975),
        'service-branding.jpg': (585, 1035, 1032, 1905),
        'service-marketing.jpg': (585, 1035, 1962, 2835),
        'service-it-solutions.jpg': (585, 1035, 2892, 3765)
    }
    
    for fname, (y1, y2, x1, x2) in service_boxes.items():
        crop = im4[y1:y2, x1:x2].copy()
        # Upscale 1.5x with Lanczos for 4K display fidelity (1310 x 675)
        h, w = crop.shape[:2]
        scaled = cv2.resize(crop, (int(w * 1.5), int(h * 1.5)), interpolation=cv2.INTER_LANCZOS4)
        denoised = cv2.bilateralFilter(scaled, 5, 20, 20)
        sharp = unsharp_mask(denoised, amount=1.25, radius=1.8)
        out_path = os.path.join('public/assets', fname)
        cv2.imwrite(out_path, sharp, [cv2.IMWRITE_JPEG_QUALITY, 98])
        print(f'Saved {fname}: {sharp.shape}')
        
    # Also save operating-model-banner
    banner_op = im4[500:1500, :].copy()
    cv2.imwrite('public/assets/operating-model-banner.jpg', banner_op, [cv2.IMWRITE_JPEG_QUALITY, 95])
    print('Saved operating-model-banner.jpg')

    # -------------------------------------------------------------
    # 2. Leadership Team: Shweta & Lejai (from Slide 6 4K)
    # -------------------------------------------------------------
    im6 = cv2.imread('extracted_hd_slides/slide_6_4k.png')
    
    # Shweta: (y: 90 to 1010, x: 270 to 1190) -> 920x920
    shweta = im6[90:1010, 270:1190].copy()
    h, w = shweta.shape[:2]
    # Remove 'D' letter on top-right:
    sub_s = shweta[0:280, 650:920]
    hsv_s = cv2.cvtColor(sub_s, cv2.COLOR_BGR2HSV)
    mask_sub_s = cv2.inRange(hsv_s, (120, 45, 20), (160, 255, 130))
    mask_d = np.zeros((h, w), dtype=np.uint8)
    mask_d[0:280, 650:920] = cv2.dilate(mask_sub_s, np.ones((7,7), np.uint8))
    shweta_clean = cv2.inpaint(shweta, mask_d, 7, cv2.INPAINT_TELEA)
    # Upscale to 1400x1400
    shweta_hd = cv2.resize(shweta_clean, (1400, 1400), interpolation=cv2.INTER_LANCZOS4)
    shweta_sharp = unsharp_mask(shweta_hd, amount=1.20, radius=1.6)
    cv2.imwrite('public/assets/leader-shweta.jpg', shweta_sharp, [cv2.IMWRITE_JPEG_QUALITY, 98])
    cv2.imwrite('public/assets/leader-shweta-cleaned.jpg', shweta_sharp, [cv2.IMWRITE_JPEG_QUALITY, 98])
    print('Saved leader-shweta.jpg:', shweta_sharp.shape)

    # Lejai: (y: 90 to 1010, x: 2650 to 3570) -> 920x920
    lejai = im6[90:1010, 2650:3570].copy()
    h_l, w_l = lejai.shape[:2]
    # Remove 'EN' on top-left:
    sub_l = lejai[0:280, 0:260]
    hsv_l = cv2.cvtColor(sub_l, cv2.COLOR_BGR2HSV)
    mask_sub_l = cv2.inRange(hsv_l, (120, 45, 20), (160, 255, 130))
    mask_en = np.zeros((h_l, w_l), dtype=np.uint8)
    mask_en[0:280, 0:260] = cv2.dilate(mask_sub_l, np.ones((7,7), np.uint8))
    # Remove tiny white artifact on lapel at y: 885..915, x: 90..160
    mask_en[885:920, 85:165] = 255
    lejai_clean = cv2.inpaint(lejai, mask_en, 7, cv2.INPAINT_TELEA)
    lejai_hd = cv2.resize(lejai_clean, (1400, 1400), interpolation=cv2.INTER_LANCZOS4)
    lejai_sharp = unsharp_mask(lejai_hd, amount=1.20, radius=1.6)
    cv2.imwrite('public/assets/leader-lejai.jpg', lejai_sharp, [cv2.IMWRITE_JPEG_QUALITY, 98])
    cv2.imwrite('public/assets/leader-lejai-cleaned.jpg', lejai_sharp, [cv2.IMWRITE_JPEG_QUALITY, 98])
    print('Saved leader-lejai.jpg:', lejai_sharp.shape)
    
    cv2.imwrite('public/assets/leadership-banner.jpg', im6[400:1500, :], [cv2.IMWRITE_JPEG_QUALITY, 95])

    # -------------------------------------------------------------
    # 3. What We Do: Center Visual & Banner (from Slide 7 4K)
    # -------------------------------------------------------------
    im7 = cv2.imread('extracted_hd_slides/slide_7_4k.png')
    # Center frame: mug + laptop + sketchbook (y: 200 to 1620, x: 1580 to 2550)
    center = im7[200:1620, 1580:2550].copy()
    h_c, w_c = center.shape[:2]
    # Inpaint only the very top-left corner thin line where the arch touches (x < 65, y < 180)
    mask_c = np.zeros((h_c, w_c), dtype=np.uint8)
    sub_arch = center[0:180, 0:70]
    hsv_arch = cv2.cvtColor(sub_arch, cv2.COLOR_BGR2HSV)
    mask_arch = cv2.inRange(hsv_arch, (120, 30, 30), (170, 255, 255))
    mask_c[0:180, 0:70] = cv2.dilate(mask_arch, np.ones((5,5), np.uint8))
    center_clean = cv2.inpaint(center, mask_c, 5, cv2.INPAINT_TELEA)
    
    # Upscale 1.3x
    center_hd = cv2.resize(center_clean, (int(w_c * 1.3), int(h_c * 1.3)), interpolation=cv2.INTER_LANCZOS4)
    center_sharp = unsharp_mask(center_hd, amount=1.25, radius=1.6)
    cv2.imwrite('public/assets/what-we-do-center.jpg', center_sharp, [cv2.IMWRITE_JPEG_QUALITY, 98])
    print('Saved what-we-do-center.jpg:', center_sharp.shape)
    
    banner_wwd = im7[300:1500, :].copy()
    cv2.imwrite('public/assets/what-we-do-banner.jpg', banner_wwd, [cv2.IMWRITE_JPEG_QUALITY, 95])

    # -------------------------------------------------------------
    # 4. Slide 2: Hero Visual Composition (3D scene in 4K)
    # -------------------------------------------------------------
    im2 = cv2.imread('extracted_hd_slides/slide_2_4k.png')
    # 3D iMac + phone + mug + ribbon scene: y: 170 to 1480, x: 1740 to 3740
    hero_3d = im2[170:1480, 1740:3740].copy()
    hero_sharp = unsharp_mask(hero_3d, amount=1.18, radius=1.5)
    cv2.imwrite('public/assets/hero-composition.jpg', hero_sharp, [cv2.IMWRITE_JPEG_QUALITY, 98])
    # Also save as PNG for hero-3d-scene-perfect.png
    cv2.imwrite('public/assets/hero-3d-scene-perfect.png', hero_sharp)
    print('Saved hero-composition.jpg and hero-3d-scene-perfect.png:', hero_sharp.shape)

    # -------------------------------------------------------------
    # 5. Slide 5: About Us visual & 3 right cards
    # -------------------------------------------------------------
    im5 = cv2.imread('extracted_hd_slides/slide_5_4k.png')
    # Center circle collage: y: 250 to 1050, x: 1770 to 2570 (800x800)
    about_circle = im5[250:1050, 1770:2570].copy()
    about_circle_sharp = unsharp_mask(about_circle, amount=1.20, radius=1.6)
    cv2.imwrite('public/assets/about-circle-collage.jpg', about_circle_sharp, [cv2.IMWRITE_JPEG_QUALITY, 98])
    
    # 3 Right cards from Slide 5:
    thumb_creative = im5[180:520, 2880:3760].copy()
    thumb_creative_sharp = unsharp_mask(thumb_creative, amount=1.20, radius=1.6)
    cv2.imwrite('public/assets/about-thumb-creative.jpg', thumb_creative_sharp, [cv2.IMWRITE_JPEG_QUALITY, 98])
    
    thumb_mkt = im5[540:880, 2880:3760].copy()
    thumb_mkt_sharp = unsharp_mask(thumb_mkt, amount=1.20, radius=1.6)
    cv2.imwrite('public/assets/about-thumb-marketing.jpg', thumb_mkt_sharp, [cv2.IMWRITE_JPEG_QUALITY, 98])
    
    thumb_it = im5[900:1240, 2880:3760].copy()
    thumb_it_sharp = unsharp_mask(thumb_it, amount=1.20, radius=1.6)
    cv2.imwrite('public/assets/about-thumb-it.jpg', thumb_it_sharp, [cv2.IMWRITE_JPEG_QUALITY, 98])
    
    cv2.imwrite('public/assets/about-banner.jpg', im5[300:1500, :], [cv2.IMWRITE_JPEG_QUALITY, 95])
    print('Saved about-circle-collage and 3 about thumbs!')

if __name__ == '__main__':
    run()
    print('ALL CLIENT PHOTOS MASTERED IN ULTRA 4K RESOLUTION SUCCESSFULLY!')
