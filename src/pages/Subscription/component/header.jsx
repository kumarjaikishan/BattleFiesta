
const Membershipheader = ({Icons}) => {
  return (
    <>
      {/* 🔥 Background Glow Effects */}
        <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-purple-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-120px] right-[-80px] w-80 h-80 bg-indigo-400 opacity-30 blur-3xl rounded-full animate-pulse"></div>

        {/* 🔥 Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto space-y-6">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest shadow-lg">
            <Icons.AutoAwesome size={14} className="text-yellow-300" />
            BattleFiesta Premium
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400">Level Up?</span>
          </h1>

          {/* Subtitle */}
          <p className="text-indigo-100 text-sm md:text-lg font-medium opacity-90 max-w-xl mx-auto">
            Choose the perfect plan and unlock premium tournaments, exclusive perks, and priority access.
          </p>

        </div>
    </>
  )
}

export default Membershipheader
