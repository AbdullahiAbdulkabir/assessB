import { Box, Typography, ButtonBase, Chip, Stack } from "@mui/material";

export default function AchievementCard({ achievement, onClick }) {
    const locked = !achievement.unlocked;

    return (
        <ButtonBase
            onClick={onClick}
            sx={{ width: "100%", borderRadius: 2, textAlign: "center", p: 1.5 }}
        >
            <Box sx={{ width: "100%" }}>
                <Box sx={{ display: "grid", placeItems: "center", position: "relative" }}>
                    {achievement.badge ? (
                        <Box
                            component="img"
                            src={achievement.badge}
                            alt={achievement.name}
                            sx={{
                                width: 96,
                                height: 96,
                                borderRadius: "999px",
                                objectFit: "cover",
                                opacity: locked ? 0.35 : 1,
                                filter: locked ? "grayscale(100%)" : "none",
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                width: 96,
                                height: 96,
                                borderRadius: "999px",
                                bgcolor: "#F3F4F6",
                                border: "1px solid #E5E7EB",
                            }}
                        />
                    )}

                    {achievement.isNext && !achievement.unlocked && (
                        <Chip
                            label="Next"
                            size="small"
                            sx={{
                                position: "absolute",
                                bottom: -6,
                                bgcolor: "#EEF2FF",
                                color: "#3730A3",
                                fontWeight: 800,
                            }}
                        />
                    )}
                </Box>

                <Typography sx={{ mt: 1.5, fontWeight: 800, color: "#111827" }}>
                    {achievement.name}
                </Typography>

                <Typography variant="caption" sx={{ color: "#667085" }}>
                    {locked ? `Unlock at ${achievement.no_of_orders} orders` : "Unlocked"}
                </Typography>
            </Box>
        </ButtonBase>
    );
}
