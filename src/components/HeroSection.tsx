"use client";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="py-6 md:py-8 relative w-full">
      <div className="flex flex-col items-center text-center px-4">
        {/* Title */}
        <h2 className="text-xl md:text-3xl font-bold leading-tight text-foreground mb-4 md:mb-6">
          World's Largest Online Casino
          <br />
          and Sportsbook
        </h2>

        {/* Register Button */}
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-10 py-2.5 rounded text-sm mb-4">
          Register
        </Button>

        {/* Social Login */}
        <div className="space-y-3">
          <p className="text-xs md:text-sm text-muted-foreground">Or sign up with</p>
          <div className="flex items-center justify-center gap-3">
            {/* Google */}
            <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-secondary hover:bg-muted flex items-center justify-center transition-colors shadow-sm shadow-black/20">
              <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0 1 12 4.5c1.69 0 3.22.58 4.42 1.56l3.27-3.27A11.97 11.97 0 0 0 12 0C7.39 0 3.4 2.6 1.39 6.41l3.88 3.35z"/>
                <path fill="#34A853" d="M12 24c5.18 0 9.52-1.72 12-4.64l-3.7-3.04c-1.34 1.19-3.41 2.04-5.82 2.04a7.07 7.07 0 0 1-6.66-4.62l-3.94 3.04C3.37 21.27 7.32 24 12 24z"/>
                <path fill="#4A90E2" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.7 3.04c2.16-1.99 3.72-4.93 3.72-8.86z"/>
                <path fill="#FBBC05" d="M5.34 14.26a7.14 7.14 0 0 1 0-4.52L1.39 6.41A11.94 11.94 0 0 0 0 12c0 1.96.47 3.81 1.39 5.59l3.95-3.33z"/>
              </svg>
            </button>
            {/* Facebook */}
            <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-secondary hover:bg-muted flex items-center justify-center transition-colors shadow-sm shadow-black/20">
              <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            {/* Line */}
            <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-secondary hover:bg-muted flex items-center justify-center transition-colors shadow-sm shadow-black/20">
              <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#00B900">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
            </button>
            {/* Twitch */}
            <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-secondary hover:bg-muted flex items-center justify-center transition-colors shadow-sm shadow-black/20">
              <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#9146FF">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
