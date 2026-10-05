import base64
import os
from PIL import Image

def main():
    base_dir = r"c:\Users\dell\Downloads\DERISEN\DERISEN"
    pub_dir = os.path.join(base_dir, "public")
    assets_dir = os.path.join(pub_dir, "assets")
    src_file = os.path.join(pub_dir, "derisen-icon.png")

    if not os.path.exists(src_file):
        print(f"Error: {src_file} does not exist")
        return

    src = Image.open(src_file)

    # 1. Standard PNG sizes recommended by Google, Apple, and W3C
    sizes = {
        "favicon-16x16.png": (16, 16),
        "favicon-32x32.png": (32, 32),
        "favicon-48x48.png": (48, 48),
        "favicon-96x96.png": (96, 96),
        "favicon-192x192.png": (192, 192),
        "favicon-512x512.png": (512, 512),
    }

    for fname, sz in sizes.items():
        resized = src.resize(sz, Image.Resampling.LANCZOS)
        out_path = os.path.join(pub_dir, fname)
        resized.save(out_path, optimize=True)
        print(f"Saved {fname} ({sz[0]}x{sz[1]})")

    # 2. Multi-resolution ICO (16x16, 32x32, 48x48)
    ico_path = os.path.join(pub_dir, "favicon.ico")
    src.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print("Saved favicon.ico (16, 32, 48)")

    # 3. Apple Touch Icons (180x180)
    # iOS home screen needs a solid background to avoid turning transparent pixels black
    apple_img = Image.new("RGBA", (180, 180), (255, 255, 255, 255))
    apple_resized = src.resize((180, 180), Image.Resampling.LANCZOS)
    apple_img.alpha_composite(apple_resized)
    apple_path = os.path.join(pub_dir, "apple-touch-icon.png")
    apple_img.convert("RGB").save(apple_path, optimize=True)
    print("Saved apple-touch-icon.png (180x180)")

    apple_precomp = os.path.join(pub_dir, "apple-touch-icon-precomposed.png")
    apple_resized.save(apple_precomp, optimize=True)
    print("Saved apple-touch-icon-precomposed.png (180x180)")

    # 4. Copy to root public if needed
    outer_pub = r"c:\Users\dell\Downloads\DERISEN\public"
    if os.path.exists(outer_pub):
        for fname in ["favicon.ico", "favicon-48x48.png", "favicon-32x32.png", "favicon.png", "apple-touch-icon.png"]:
            src_p = os.path.join(pub_dir, fname)
            if os.path.exists(src_p):
                with open(src_p, "rb") as f_in, open(os.path.join(outer_pub, fname), "wb") as f_out:
                    f_out.write(f_in.read())
        print("Synchronized with outer public directory")

    # 5. Overwrite favicon.svg with embedded crisp data
    with open(src_file, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")

    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="100%" height="100%">
  <image href="data:image/png;base64,{b64}" width="1080" height="1080" />
</svg>
"""
    with open(os.path.join(pub_dir, "favicon.svg"), "w", encoding="utf-8") as f:
        f.write(svg_content)
    print("Updated favicon.svg with exact De. icon")

    print("All favicon assets successfully generated!")

if __name__ == "__main__":
    main()
