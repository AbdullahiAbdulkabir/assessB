export default function AchievementCard({ achievement, onClick }) {
    const locked = !achievement.unlocked;

    return (
        <button
            type="button"
            onClick={onClick}
            className="group text-center focus:outline-none"
        >
            <div className="mx-auto w-24 h-24 grid place-items-center">
                {achievement.icon ? (
                    <img
                        src={achievement.icon}
                        alt={achievement.name}
                        className={`w-24 h-24 transition ${
                            locked ? "opacity-30 grayscale" : "opacity-100"
                        } group-hover:scale-[1.03]`}
                    />
                ) : (
                    <div
                        className={`w-24 h-24 rounded-full border grid place-items-center ${
                            locked ? "bg-slate-50 border-slate-200" : "bg-white border-slate-200"
                        }`}
                    >
                        <span className="text-slate-400 text-xs px-3">No icon</span>
                    </div>
                )}
            </div>

            <p className="mt-3 font-semibold text-slate-800">{achievement.name}</p>

            <p className="text-xs mt-1 text-slate-500">
                {locked ? "Locked" : "Unlocked"}
            </p>
        </button>
    );
}
