export const PlanCard = ({ Icons, plan, isSelected, onClick }) => {
  const savings = (plan.baseprice * plan.into) - plan.price;
  const savingsPercent = Math.round(
    (savings / (plan.baseprice * plan.into)) * 100
  );

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer  group transition-all border border-slate-400 duration-500 
      rounded-[2.5rem] p-[1px] 
      ${isSelected
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 scale-[1.06] shadow-[0_20px_60px_rgba(99,102,241,0.35)]"
          : "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 hover:from-indigo-400 hover:to-purple-400"
        }`}
    >
      {/* Inner Card */}
      <div
        className={`relative h-full rounded-[2.5rem] bg-white p-6 flex flex-col items-center text-center transition-all duration-500 overflow-hidden
        ${isSelected ? "bg-white/95 backdrop-blur-md" : "group-hover:bg-white"}
      `}
      >
        {/* 🔥 Glow Effect */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-500 opacity-10 blur-3xl rounded-full"></div>

        {/* Popular Badge */}
        {plan.popular && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-b-xl shadow-lg z-20">
            Most Popular
          </div>
        )}

        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center transition-all duration-500
          ${
            isSelected
              ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg"
              : "bg-indigo-50 text-indigo-500 group-hover:bg-indigo-100"
          }`}
        >
          {plan.into >= 12 ? (
            <Icons.Trophy size={28} />
          ) : plan.into >= 3 ? (
            <Icons.AutoAwesome size={28} />
          ) : (
            <Icons.Calendar size={26} />
          )}
        </div>

        {/* Label */}
        <span className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">
          {plan.into >= 12
            ? "Ultimate"
            : plan.into >= 3
            ? "Recommended"
            : "Basic"}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {plan.duration}
        </h3>

        {/* Price */}
        <div className="mb-4">
          <span className="text-gray-400 text-xs font-semibold line-through block mb-0.5">
            ₹{plan.baseprice * plan.into}
          </span>

          <div className="flex items-baseline justify-center">
            <span className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              ₹{plan.price}
            </span>
            <span className="text-xs font-bold text-gray-500 ml-1">
              /total
            </span>
          </div>
        </div>

        {/* Savings */}
        <div
          className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tight py-1.5 px-3 rounded-full transition-all duration-500
          ${
            isSelected
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600"
          }`}
        >
          Save {savingsPercent}<Icons.Percent size={14} />
        </div>

        {/* Selected Tick */}
        {isSelected && (
          <div className="absolute top-4 right-4 animate-in zoom-in duration-300">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-1.5 shadow-lg">
              <Icons.Check size={16} className="text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};