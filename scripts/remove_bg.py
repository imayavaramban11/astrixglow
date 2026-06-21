import os
from PIL import Image

def make_transparent(img_path, output_path):
    if not os.path.exists(img_path):
        print(f"Skipping: {img_path} does not exist.")
        return
    
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        # Check if pixel is white or near-white (all channels above 230)
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            new_data.append((255, 255, 255, 0))  # Set alpha to 0
        else:
            # Optionally: make the gold logo slightly brighter/clearer if needed,
            # but keeping original pixels is safest to maintain quality.
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Processed: {img_path} -> {output_path} successfully.")

# Run transparency process on all active logo images
make_transparent("assets/images/astrixglowlogo.png", "assets/images/astrixglowlogo.png")
make_transparent("assets/images/logo.png", "assets/images/logo.png")
make_transparent("assets/images/logo-header.webp", "assets/images/logo-header.webp")
make_transparent("assets/images/logo-footer.webp", "assets/images/logo-footer.webp")
make_transparent("assets/images/apple-touch-icon.png", "assets/images/apple-touch-icon.png")
make_transparent("assets/images/favicon-16x16.png", "assets/images/favicon-16x16.png")
make_transparent("assets/images/favicon-32x32.png", "assets/images/favicon-32x32.png")
