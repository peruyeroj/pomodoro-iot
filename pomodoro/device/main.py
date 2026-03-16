from wifi import connect
from timer import PomodoroTimer
from supabase import log_session

wlan = connect()

timer = PomodoroTimer()

def on_complete(phase, count):
    print(f"Phase complete! Total pomodoros: {count}")
    if phase == "work":
        print("Logging session...")
        log_session(25, phase)

# Run through phases
while True:
    timer.run(on_complete=on_complete)
