from wifi import connect
from timer import PomodoroTimer
from supabase import log_session

wlan = connect()

timer = PomodoroTimer()




def on_complete(phase, count):
    print(f"Phase complete! Total pomodoros: {count}")
    if phase == "work":
        print("Logging session...")
        try:
            log_session(25, phase)
        except Exception as e:
            print("log_session crashed:", e)

# Run through phases
while True:
    timer.run(on_complete=on_complete)
