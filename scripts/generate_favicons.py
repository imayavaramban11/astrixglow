import os
from PIL import Image

def generate_favicons():
    logo_path = "assets/images/astrixglowlogo.png"
    if not os.path.exists(logo_path):
        print("Error: astrixglowlogo.png does not exist.")
        return

    # Load transparent logo
    img = Image.open(logo_path)

    # 1. Generate favicon-16x16.png
    fav_16 = img.resize((16, 16), Image.Resampling.LANCZOS)
    fav_16.save("assets/images/favicon-16x16.png", "PNG")
    print("Generated favicon-16x16.png")

    # 2. Generate favicon-32x32.png
    fav_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
    fav_32.save("assets/images/favicon-32x32.png", "PNG")
    print("Generated favicon-32x32.png")

    # 3. Generate apple-touch-icon.png (180x180)
    apple_icon = img.resize((180, 180), Image.Resampling.LANCZOS)
    apple_icon.save("assets/images/apple-touch-icon.png", "PNG")
    print("Generated apple-touch-icon.png")

    # 4. Generate favicon.ico (containing 16x16, 32x32, 48x48, 64x64 sizes)
    sizes = [16, 32, 48, 64]
    ico_imgs = [img.resize((s, s), Image.Resampling.LANCZOS) for s in sizes]
    ico_imgs[0].save("assets/images/favicon.ico", format="ICO", append_images=ico_imgs[1:])
    print("Generated favicon.ico")

generate_favicons()
