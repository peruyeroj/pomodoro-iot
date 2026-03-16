import time

# Settings
WORK_MINUTES = 25/60
SHORT_BREAK_MINUTES = 5/60
LONG_BREAK_MINUTES = 15/60
POMODOROS_BEFORE_LONG_BREAK = 4

class PomodoroTimer:
    def __init__(self):
        self.pomodoro_count = 0
        self.is_running = False
        self.current_phase = "work"  # "work", "short_break", "long_break"
    
    def get_duration(self):
        if self.current_phase == "work":
            return WORK_MINUTES * 60
        elif self.current_phase == "short_break":
            return SHORT_BREAK_MINUTES * 60
        else:
            return LONG_BREAK_MINUTES * 60
    
    def next_phase(self):
        if self.current_phase == "work":
            self.pomodoro_count += 1
            if self.pomodoro_count % POMODOROS_BEFORE_LONG_BREAK == 0:
                self.current_phase = "long_break"
            else:
                self.current_phase = "short_break"
        else:
            self.current_phase = "work"
    
    def run(self, on_tick=None, on_complete=None):
        self.is_running = True
        duration = self.get_duration()
        
        for remaining in range(duration, 0, -1):
            if not self.is_running:
                print("Timer stopped")
                return
            
            minutes = remaining // 60
            seconds = remaining % 60
            print(f"{self.current_phase}: {int(minutes):02d}:{int(seconds):02d}")
            
            if on_tick:
                on_tick(remaining, self.current_phase)
            
            time.sleep(1)
        
        print(f"{self.current_phase} complete!")
        
        self.next_phase()
        
        
        if on_complete:
            on_complete(self.current_phase, self.pomodoro_count)
        
        self.is_running = False
    
    def stop(self):
        self.is_running = False