const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 p-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="max-w-md text-center relative z-10">
        <div className="grid grid-cols-4 gap-3 mb-8 p-6 bg-base-100/50 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl">
          {/* Enhanced chat bubbles pattern */}
          <div className="col-span-3 bg-gradient-to-r from-primary/30 to-primary/20 rounded-2xl p-4 animate-pulse shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <div className="h-2 bg-primary/60 rounded-full mb-2 group-hover:bg-primary/80 transition-colors"></div>
            <div className="h-2 bg-primary/40 rounded-full w-3/4 group-hover:bg-primary/60 transition-colors"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary/60 rounded-full animate-ping"></div>
          </div>
          <div className=""></div>
          
          <div className=""></div>
          <div className="col-span-2 bg-gradient-to-l from-secondary/30 to-secondary/20 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <div className="h-2 bg-secondary/60 rounded-full mb-2 group-hover:bg-secondary/80 transition-colors"></div>
            <div className="h-2 bg-secondary/40 rounded-full w-2/3 group-hover:bg-secondary/60 transition-colors"></div>
          </div>
          <div className=""></div>
          
          <div className="col-span-3 bg-gradient-to-r from-accent/30 to-accent/20 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <div className="h-2 bg-accent/60 rounded-full mb-2 group-hover:bg-accent/80 transition-colors"></div>
            <div className="h-2 bg-accent/40 rounded-full w-4/5 group-hover:bg-accent/60 transition-colors"></div>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-accent/70 rounded-full animate-bounce"></div>
          </div>
          <div className=""></div>
          
          <div className=""></div>
          <div className="col-span-2 bg-gradient-to-l from-info/30 to-info/20 rounded-2xl p-4 animate-pulse shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group" style={{animationDelay: '0.5s'}}>
            <div className="h-2 bg-info/60 rounded-full mb-2 group-hover:bg-info/80 transition-colors"></div>
            <div className="h-2 bg-info/40 rounded-full w-1/2 group-hover:bg-info/60 transition-colors"></div>
          </div>
          <div className=""></div>
          
          {/* Enhanced input field */}
          <div className="col-span-4 bg-gradient-to-r from-neutral/20 to-base-300/30 rounded-2xl p-3 flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-white/10">
            <div className="w-8 h-8 bg-gradient-to-br from-primary/40 to-primary/60 rounded-full flex items-center justify-center group-hover:from-primary/60 group-hover:to-primary/80 transition-all">
              <div className="w-3 h-3 bg-white/80 rounded-full animate-pulse"></div>
            </div>
            <div className="h-2 bg-neutral/40 rounded-full flex-1 group-hover:bg-neutral/60 transition-colors"></div>
            <div className="w-6 h-6 bg-gradient-to-br from-primary/50 to-primary/70 rounded-lg flex items-center justify-center group-hover:from-primary/70 group-hover:to-primary/90 transition-all transform group-hover:rotate-12">
              <div className="w-2 h-2 bg-white/90 rounded-sm"></div>
            </div>
          </div>
          
          {/* Floating notification dots */}
          <div className="absolute -top-2 left-1/4 w-2 h-2 bg-success rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute -bottom-2 right-1/3 w-1.5 h-1.5 bg-warning rounded-full animate-bounce" style={{animationDelay: '0.8s'}}></div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-accent transition-all duration-500">
            {title}
          </h2>
          <p className="text-base-content/70 text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>
        
        {/* Subtle floating elements */}
        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;