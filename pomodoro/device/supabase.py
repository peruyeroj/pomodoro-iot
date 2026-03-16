import urequests
import ujson
from config import SUPABASE_URL, SUPABASE_KEY

def log_session(duration, phase, completed=True):
    url = f"{SUPABASE_URL}/rest/v1/sessions"
    
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }
    
    data = ujson.dumps({
        "duration": duration,
        "phase": phase,
        "completed": completed
    })
    
    try:
        response = urequests.post(url, headers=headers, data=data)
        if response.status_code == 201:
            print("Session logged successfully!")
        else:
            print("Error:", response.status_code, response.text)
        response.close()
    except Exception as e:
        print("Failed to log session:", e)