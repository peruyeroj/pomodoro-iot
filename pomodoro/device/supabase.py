import urequests
import ujson
import network
from config import SUPABASE_URL, SUPABASE_KEY

def get_mac():
    wlan = network.WLAN(network.STA_IF)
    mac = wlan.config('mac')
    return ':'.join('{:02x}'.format(b) for b in mac)

def get_user_id():
    mac = get_mac()
    url = f"{SUPABASE_URL}/rest/v1/devices?device_id=eq.{mac}&select=user_id"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }
    try:
        response = urequests.get(url, headers=headers)
        rows = ujson.loads(response.text)
        response.close()
        if rows:
            return rows[0]['user_id']
    except Exception as e:
        print("Failed to get user_id:", e)
    return None

def log_session(duration, phase, completed=True):
    url = f"{SUPABASE_URL}/rest/v1/sessions"
    
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "duration": duration,
        "phase": phase,
        "completed": completed,
        "device_id": get_mac(),
        "user_id": get_user_id(),
    }

    data = ujson.dumps(payload)
    print("Payload:", data)  

    try:
        response = urequests.post(url, headers=headers, data=data)
        if response.status_code == 201:
            print("Session logged successfully!")
        else:
            print("Error:", response.status_code, response.text)
        response.close()
    except Exception as e:
        print("Failed to log session:", e)