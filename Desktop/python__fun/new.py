import pyautogui
import time

# Time delay to open WhatsApp chat
time.sleep(5)

message = "wish you a very very happy birthday 🎂🎂 Radha rani always bless you"  # Your message
count = 53  # Number of times

for i in range(count):
    pyautogui.typewrite(message)
    pyautogui.press("enter")
  




