import { useEffect } from "react";

function ShareIcon({ type }) {
    // simple inline icons (no dependencies)
    if (type === "twitter")
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                <path d="M22 5.92c-.74.33-1.54.56-2.38.66a4.15 4.15 0 0 0 1.82-2.29 8.3 8.3 0 0 1-2.63 1 4.14 4.14 0 0 0-7.1 3.78A11.75 11.75 0 0 1 3.15 4.9a4.14 4.14 0 0 0 1.28 5.52 4.1 4.1 0 0 1-1.87-.52v.05a4.15 4.15 0 0 0 3.32 4.06 4.2 4.2 0 0 1-1.86.07 4.15 4.15 0 0 0 3.87 2.88A8.31 8.31 0 0 1 2 18.2a11.73 11.73 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.35 8.35 0 0 0 22 5.92z" />
            </svg>
        );

    if (type === "facebook")
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6H16.7V5.1c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6V11H7v3h2.5v8h4z" />
            </svg>
        );

    // whatsapp
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
            <path d="M20.5 3.5A11 11 0 0 0 3.1 17.1L2 22l5-1.1A11 11 0 0 0 20.5 3.5zm-8.5 18a9 9 0 0 1-4.6-1.3l-.3-.2-2.9.6.6-2.8-.2-.3A9 9 0 1 1 12 21.5zm5.2-6.7c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 .1-.2-.3-.8-.3-1.6-.9-.6-.5-1.2-1.1-1.3-1.4-.1-.3 0-.5.1-.6l.4-.4c.1-.1.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.1-.7-1.7-1-2.3-.3-.6-.6-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7 0 1.6 1.2 3.2 1.4 3.4.2.2 2.3 3.5 5.7 4.8.8.3 1.4.5 1.9.6.8.2 1.5.2 2.1.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.1-1.4-.1-.2-.3-.2-.6-.3z" />
        </svg>
    );
}

export default function AchievementModal({ achievement, nextAvailable, onClose }) {
    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onClose]);

    const shareText = encodeURIComponent(
        `I just earned the "${achievement.name}" badge! 🎉`
    );

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full grid place-items-center text-slate-500 hover:bg-slate-100"
                        aria-label="Close"
                    >
                        <span className="text-2xl leading-none">×</span>
                    </button>

                    <div className="px-8 pt-10 pb-8 text-center">
                        <div className="mx-auto w-28 h-28 grid place-items-center">
                            {achievement.icon ? (
                                <img src={achievement.icon} alt={achievement.name} className="w-28 h-28" />
                            ) : (
                                <div className="w-28 h-28 rounded-full bg-slate-50 border border-slate-200" />
                            )}
                        </div>

                        <h3 className="mt-6 text-3xl font-extrabold text-slate-900">
                            {achievement.name}
                        </h3>

                        <p className="mt-3 text-slate-500 text-lg">
                            {achievement.message ||
                                achievement.description ||
                                (achievement.unlocked
                                    ? "Nice work — keep going!"
                                    : "This badge is locked. Keep progressing to unlock it.")}
                        </p>

                        {/* Share buttons */}
                        <div className="mt-8 flex items-center justify-center gap-3">
                            <a
                                className="w-11 h-11 rounded-xl border border-slate-200 grid place-items-center text-slate-700 hover:bg-slate-50"
                                href={`https://twitter.com/intent/tweet?text=${shareText}`}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Share on Twitter"
                            >
                                <ShareIcon type="twitter" />
                            </a>
                        </div>
                    </div>

                    {/* UP NEXT */}
                    <div className="border-t border-slate-100 px-8 py-6">
                        <p className="text-xs tracking-widest text-slate-500 font-semibold">
                            UP NEXT
                        </p>

                        {nextAvailable?.length ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {nextAvailable.slice(0, 6).map((name) => (
                                    <span
                                        key={name}
                                        className="text-sm px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700"
                                    >
                    {name}
                  </span>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-2 text-sm text-slate-500">
                                No upcoming achievements right now.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
