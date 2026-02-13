import AchievementCard from "./AchievementCard.jsx";

export default function AchievementGrid({ achievements, onSelect }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {achievements.map((achievement) => (
                <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    onClick={() => onSelect(achievement)}
                />
            ))}
        </div>
    );
}
