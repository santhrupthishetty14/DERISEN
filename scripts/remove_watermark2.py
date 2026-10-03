import cv2
import numpy as np

def remove_watermark(frame):
    h, w = frame.shape[:2]
    
    # Shutterstock text region - center strip, lower half
    # 596x336 frame -> text ~y:195-240, x:90-510
    y1, y2 = int(h * 0.56), int(h * 0.73)
    x1, x2 = int(w * 0.12), int(w * 0.88)
    
    # Create inpaint mask
    mask = np.zeros((h, w), dtype=np.uint8)
    mask[y1:y2, x1:x2] = 255
    
    # Step 1: Heavy inpaint with larger radius
    result = cv2.inpaint(frame, mask, 25, cv2.INPAINT_NS)
    
    # Step 2: Blend inpainted region with the dark background to eliminate ghost artifacts
    # The background in this region is very dark blue/teal - extract colour from corners
    bg_sample = frame[y1:y1+10, x1:x1+60].mean(axis=(0,1))  # sample dark bg color
    
    # Build a smooth overlay that fades to background
    region = result[y1:y2, x1:x2].astype(np.float32)
    bg_fill = np.full_like(region, bg_sample, dtype=np.float32)
    
    # Check remaining watermark-ness (semi-transparent pale pixels vs dark bg)
    gray_region = cv2.cvtColor(result[y1:y2, x1:x2], cv2.COLOR_BGR2GRAY)
    
    # Blend toward background for areas that are suspiciously lighter than surroundings
    blend_strength = 0.70
    result[y1:y2, x1:x2] = np.clip(
        region * (1 - blend_strength) + bg_fill * blend_strength, 0, 255
    ).astype(np.uint8)
    
    # Step 3: Light Gaussian blur over blended zone to eliminate any edges
    blur_region = result[y1-4:y2+4, x1-4:x2+4]
    blurred = cv2.GaussianBlur(blur_region, (7, 7), 0)
    result[y1-4:y2+4, x1-4:x2+4] = blurred
    
    return result


cap = cv2.VideoCapture('public/assets/_contact_raw.mp4')
fps = cap.get(cv2.CAP_PROP_FPS)
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter('public/assets/_contact_clean2_temp.mp4', fourcc, fps, (w, h))

frame_count = 0
while True:
    ret, frame = cap.read()
    if not ret:
        break
    cleaned = remove_watermark(frame)
    out.write(cleaned)
    frame_count += 1
    if frame_count % 30 == 0:
        print(f'Processing: {frame_count}/{total}')

cap.release()
out.release()
print(f'Done! {frame_count} frames processed.')

# Save preview
cap2 = cv2.VideoCapture('public/assets/_contact_clean2_temp.mp4')
cap2.set(cv2.CAP_PROP_POS_MSEC, 2000)
ret, poster = cap2.read()
if ret:
    cv2.imwrite('scratch_contact_clean2_2s.jpg', poster)
cap2.release()
print('Preview saved.')
