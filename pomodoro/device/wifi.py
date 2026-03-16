import network
import time
from config import WIFI_SSID, WIFI_PASSWORD

def connect():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    
    if wlan.isconnected():
        return wlan
    
    print("Connecting to Wi-Fi...")
    wlan.connect(WIFI_SSID, WIFI_PASSWORD)
    
    # Wait up to 10 seconds
    for i in range(10):
        if wlan.isconnected():
            print("Connected!")
            print("IP:", wlan.ifconfig()[0])
            return wlan
        print("...")
        time.sleep(1)
    
    print("Failed to connect")
    return None
