import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
import os

def enhance_image(img_cv, scale=2.0, unsharp_amount=1.35):
    h, w = img_cv.shape[:2]
    new_w, new_h = int(w * scale), int(h * scale)
    # High-quality Lanczos upscaling
    upscaled = cv2.resize(img_cv, (new_w, new_h), interpolation=cv2.INTER_LANCZOS4)
    # Gentle bilateral filter to remove JPEG compression noise while preserving edges
    denoised = cv2.bilateralFilter(upscaled, 5, 25, 25)
    # Unsharp mask for crisp professional clarity
    gaussian = cv2.GaussianBlur(denoised, (0, 0), 2.0)
    sharpened = cv2.addWeighted(denoised, unsharp_amount, gaussian, 1 - unsharp_amount, 0)
    return sharpened

def process_leaders():
    # 1. Shweta
    img = cv2.imread('public/assets/leader-shweta.jpg')
    h, w = img.shape[:2]
    # Remove purple D and artifacts on right edge
    mask = np.zeros((h, w), dtype=np.uint8)
    sub = img[0:360, 915:1000]
    hsv = cv2.cvtColor(sub, cv2.COLOR_BGR2HSV)
    p_mask = cv2.inRange(hsv, (115, 35, 35), (175, 255, 255))
    mask[0:360, 915:1000] = cv2.dilate(p_mask, np.ones((7,7), np.uint8))
    # Also top border artifacts
    mask[0:20, 800:1000] = 255
    cleaned = cv2.inpaint(img, mask, 9, cv2.INPAINT_TELEA)
    hd_shweta = enhance_image(cleaned, scale=1.5, unsharp_amount=1.30)
    cv2.imwrite('public/assets/leader-shweta.jpg', hd_shweta, [cv2.IMWRITE_JPEG_QUALITY, 98])
    print('Enhanced leader-shweta.jpg to', hd_shweta.shape)

    # 2. Lejai
    img = cv2.imread('public/assets/leader-lejai.jpg')
    h, w = img.shape[:2]
    mask = np.zeros((h, w), dtype=np.uint8)
    # Giant purple N on top left: x from 0 to 220, y from 0 to 320
    sub = img[0:320, 0:230]
    hsv = cv2.cvtColor(sub, cv2.COLOR_BGR2HSV)
    p_mask = cv2.inRange(hsv, (115, 35, 35), (175, 255, 255))
    mask[0:320, 0:230] = cv2.dilate(p_mask, np.ones((7,7), np.uint8))
    # Top edge artifact
    mask[0:30, 0:250] = 255
    cleaned = cv2.inpaint(img, mask, 9, cv2.INPAINT_TELEA)
    hd_lejai = enhance_image(cleaned, scale=1.5, unsharp_amount=1.30)
    cv2.imwrite('public/assets/leader-lejai.jpg', hd_lejai, [cv2.IMWRITE_JPEG_QUALITY, 98])
    print('Enhanced leader-lejai.jpg to', hd_lejai.shape)

def process_service_images():
    service_files = [
        'service-creative-design.jpg',
        'service-branding.jpg',
        'service-marketing.jpg',
        'service-it-solutions.jpg'
    ]
    
    for fname in service_files:
        path = os.path.join('public/assets', fname)
        if not os.path.exists(path):
            continue
        img = cv2.imread(path)
        h, w = img.shape[:2]
        
        # Circle is always at bottom-left
        # Let's create an exact mask for the bottom-left circular badge
        mask = np.zeros((h, w), dtype=np.uint8)
        # Search region: bottom 38% height, left 34% width
        y_start = int(h * 0.62)
        x_end = int(w * 0.36)
        sub = img[y_start:h, 0:x_end]
        hsv = cv2.cvtColor(sub, cv2.COLOR_BGR2HSV)
        # Circle colors: deep purple and white
        p_mask = cv2.inRange(hsv, (110, 30, 25), (175, 255, 255))
        w_mask = cv2.inRange(hsv, (0, 0, 180), (180, 60, 255))
        comb = cv2.bitwise_or(p_mask, w_mask)
        
        # Find contours
        contours, _ = cv2.findContours(comb, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        found_circle = False
        for c in contours:
            area = cv2.contourArea(c)
            if area > 3500:
                (cx, cy), radius = cv2.minEnclosingCircle(c)
                cv2.circle(mask, (int(cx), int(cy + y_start)), int(radius + 8), 255, -1)
                found_circle = True
                
        if not found_circle:
            # Fallback circle mask in bottom-left
            cv2.circle(mask, (int(w * 0.16), int(h * 0.82)), int(h * 0.18), 255, -1)
            
        # Inpaint Telea + Navier-Stokes blended for natural texture restoration
        cleaned = cv2.inpaint(img, mask, 15, cv2.INPAINT_TELEA)
        # 2x HD upscale & sharpening
        hd = enhance_image(cleaned, scale=2.0, unsharp_amount=1.4)
        cv2.imwrite(path, hd, [cv2.IMWRITE_JPEG_QUALITY, 96])
        print(f'Cleaned & enhanced {fname} to {hd.shape}')

def process_center_images():
    # 1. what-we-do-center.jpg
    path = 'public/assets/what-we-do-center.jpg'
    if os.path.exists(path):
        img = cv2.imread(path)
        h, w = img.shape[:2]
        mask = np.zeros((h, w), dtype=np.uint8)
        # Remove bottom-left IT solutions circle (y: bottom 20%, x: left 30%)
        y_start = int(h * 0.80)
        x_end = int(w * 0.35)
        sub = img[y_start:h, 0:x_end]
        hsv = cv2.cvtColor(sub, cv2.COLOR_BGR2HSV)
        p_mask = cv2.inRange(hsv, (110, 30, 25), (175, 255, 255))
        w_mask = cv2.inRange(hsv, (0, 0, 180), (180, 60, 255))
        comb = cv2.bitwise_or(p_mask, w_mask)
        contours, _ = cv2.findContours(comb, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        for c in contours:
            if cv2.contourArea(c) > 2000:
                (cx, cy), radius = cv2.minEnclosingCircle(c)
                cv2.circle(mask, (int(cx), int(cy + y_start)), int(radius + 10), 255, -1)
        # Also remove curved purple line on top and left
        # purple pixels near left border [0:h, 0:35]
        sub_left = img[0:h, 0:40]
        hsv_l = cv2.cvtColor(sub_left, cv2.COLOR_BGR2HSV)
        p_l = cv2.inRange(hsv_l, (110, 30, 25), (175, 255, 255))
        mask[0:h, 0:40] = cv2.dilate(p_l, np.ones((5,5), np.uint8))
        
        cleaned = cv2.inpaint(img, mask, 15, cv2.INPAINT_TELEA)
        hd = enhance_image(cleaned, scale=1.3, unsharp_amount=1.35)
        cv2.imwrite(path, hd, [cv2.IMWRITE_JPEG_QUALITY, 96])
        print('Cleaned & enhanced what-we-do-center.jpg to', hd.shape)

    # 2. about-circle-collage.jpg
    path = 'public/assets/about-circle-collage.jpg'
    if os.path.exists(path):
        img = cv2.imread(path)
        h, w = img.shape[:2]
        mask = np.zeros((h, w), dtype=np.uint8)
        # Find purple circles in top-right, bottom-left, bottom-right
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        p_mask = cv2.inRange(hsv, (115, 40, 30), (175, 255, 255))
        w_mask = cv2.inRange(hsv, (0, 0, 210), (180, 45, 255))
        comb = cv2.bitwise_or(p_mask, w_mask)
        
        # Only check outer perimeter (not the center laptop/mug)
        perimeter_mask = np.zeros((h, w), dtype=np.uint8)
        # corners
        perimeter_mask[0:int(h*0.35), int(w*0.65):w] = 255 # top right
        perimeter_mask[int(h*0.65):h, 0:int(w*0.35)] = 255 # bottom left
        perimeter_mask[int(h*0.65):h, int(w*0.65):w] = 255 # bottom right
        
        target = cv2.bitwise_and(comb, perimeter_mask)
        contours, _ = cv2.findContours(cv2.dilate(target, np.ones((5,5), np.uint8)), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        for c in contours:
            if cv2.contourArea(c) > 3000:
                (cx, cy), radius = cv2.minEnclosingCircle(c)
                cv2.circle(mask, (int(cx), int(cy)), int(radius + 8), 255, -1)
                
        cleaned = cv2.inpaint(img, mask, 15, cv2.INPAINT_TELEA)
        hd = enhance_image(cleaned, scale=1.4, unsharp_amount=1.35)
        cv2.imwrite(path, hd, [cv2.IMWRITE_JPEG_QUALITY, 96])
        print('Cleaned & enhanced about-circle-collage.jpg to', hd.shape)

if __name__ == '__main__':
    process_leaders()
    process_service_images()
    process_center_images()
    print('All photo enhancement completed!')
