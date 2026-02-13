import { Grid } from "@mui/material";
import AchievementCard from "./AchievementCard.jsx";

export default function AchievementGrid({ achievements, onSelect }) {
    return (
        <Grid
            container
            spacing={3}
            justifyContent="center"
        >
            {achievements.map((achievement) => (
                <Grid item xs={6} key={achievement.id}>
                    <AchievementCard
                        achievement={achievement}
                        onClick={() => onSelect(achievement)}
                    />
                </Grid>
            ))}
        </Grid>

    );
}
