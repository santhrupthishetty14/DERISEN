import cv2
import numpy as np

def inpaint_watermark(frame):
    """Remove shutterstock watermark using inpainting."""
    h, w = frame.shape[:2]
    
    # The shutterstock text sits roughly in the lower-center area of the frame
    # Based on the 596x336 frame, the text is around y:200-230, x:120-480
    mask = np.zeros((h, w), dtype=np.uint8)
    
    # Create a mask covering the shutterstock watermark area
    # Approximate region: center strip where text appears
    y1, y2 = int(h * 0.58), int(h * 0.72)
    x1, x2 = int(w * 0.18), int(w * 0.82)
    mask[y1:y2, x1:x2] = 255
    
    # Use inpainting to fill the watermark area
    result = cv2.inpaint(frame, mask, 15, cv2.INPAINT_TELEA)
    return result

cap = cv2.VideoCapture('public/assets/_contact_raw.mp4')
fps = cap.get(cv2.CAP_PROP_FPS)
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter('public/assets/_contact_clean_temp.mp4', fourcc, fps, (w, h))

frame_count = 0
total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cleaned = inpaint_watermark(frame)
    out.write(cleaned)
    frame_count += 1
    if frame_count % 30 == 0:
        print(f'Processing: {frame_count}/{total}')

cap.release()
out.release()
print(f'Done! Processed {frame_count} frames')

# Save poster
cap2 = cv2.VideoCapture('public/assets/_contact_clean_temp.mp4')
cap2.set(cv2.CAP_PROP_POS_MSEC, 2000)
ret, poster = cap2.read()
if ret:
    cv2.imwrite('scratch_contact_clean_2s.jpg', poster)
cap2.release()
print('Preview poster saved')
