# import qrcode

# # Step 1: Enter your website link here 👇
# website_link = "https://zegnite.com"

# # Step 2: Create QR object
# qr = qrcode.QRCode(
#     version=1,
#     error_correction=qrcode.constants.ERROR_CORRECT_H,
#     box_size=10,
#     border=4,
# )

# # Step 3: Add data (your link)
# qr.add_data(website_link)
# qr.make(fit=True)

# # Step 4: Create an image (you can customize color)
# img = qr.make_image(fill_color="black", back_color="white")

# # Step 5: Save QR as image
# img.save("zegnite_qr.png")

# print("✅ QR Code generated successfully! Check your folder for 'zegnite_qr.png'")


import qrcode

# Step 1: User se link input lena
website_link = input("Enter your website link or any URL: ")

# Step 2: Create QR object
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

# Step 3: Add data (your input link)
qr.add_data(website_link)
qr.make(fit=True)

# Step 4: Create QR image
img = qr.make_image(fill_color="black", back_color="white")

# Step 5: Save the QR image
img_name = "generated_qr.png"
img.save(img_name)

print(f"✅ QR Code generated successfully! Saved as '{img_name}'")
