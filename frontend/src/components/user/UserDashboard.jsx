import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Card,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Typography,
    Avatar,
    Chip,
} from "@mui/material";
import AchievementGrid from "../achievement/AchievementGrid.jsx";
import AchievementModal from "../achievement/AchievementModal.jsx";


export default function UserDashboard({ userId }) {
    const [data, setData] = useState(null);
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:5101/api/users/${userId}/achievements`)
            .then((res) => res.json())
            .then((res) => setData(res.data))
            .catch(console.error);
    }, [userId]);

    const achievements = useMemo(() => {
        if (!data) return [];

        // Preferred: backend returns full objects
        if (Array.isArray(data.achievements) && data.achievements.length) {
            return data.achievements;
        }

        // Fallback: backend returns only names; we create simple objects
        const unlockedSet = new Set(data.unlocked_achievements || []);
        const all = [
            ...(data.unlocked_achievements || []),
            ...(data.next_available_achievements || []),
        ];
        const unique = Array.from(new Set(all));

        return unique.map((name, idx) => ({
            id: `${idx}-${name}`,
            name,
            unlocked: unlockedSet.has(name),
            icon: (data.achievement_icons && data.achievement_icons[name]) || "",
            message: (data.achievement_messages && data.achievement_messages[name]) || "",
            description:
                (data.achievement_descriptions && data.achievement_descriptions[name]) || "",
        }));
    }, [data]);

    if (!data) {
        return (
            <Box sx={{ p: 6, display: "grid", placeItems: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    const unlockedSet = new Set(data.unlocked_achievements || []);
    const nextAvailable = (data.next_available_achievements || []).filter(
        (n) => !unlockedSet.has(n)
    );

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#F6F7FB", py: 6 }}>
            <Box sx={{ maxWidth: 1100, mx: "auto", px: 3 }}>
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        border: "1px solid #EEF0F6",
                    }}
                >
                    <Grid container>
                        {/* LEFT PANEL */}
                        <Grid
                            item
                            xs={12}
                            md={4}
                            sx={{
                                p: 4,
                                borderRight: { md: "1px solid #EEF0F6" },
                                borderBottom: { xs: "1px solid #EEF0F6", md: "none" },
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ position: "relative" }}>
                                    <Avatar
                                        src={data.user_avatar}
                                        alt="User"
                                        sx={{
                                            width: 64,
                                            height: 64,
                                            border: "4px solid rgba(16,185,129,0.25)",
                                        }}
                                    />
                                    <Chip
                                        label={data.user_badge_short || "User"}
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            bottom: -8,
                                            right: -8,
                                            bgcolor: "#10B981",
                                            color: "white",
                                            fontWeight: 700,
                                        }}
                                    />
                                </Box>

                                <Box>
                                    <Typography variant="body2" sx={{ color: "#667085", mt: 0.5 }}>
                                        Keep unlocking achievements.
                                    </Typography>
                                </Box>
                            </Stack>

                            <Box sx={{ mt: 6 }}>
                                <Typography variant="overline" sx={{ color: "#667085" }}>
                                    Current Badge
                                </Typography>

                                <Stack direction="row" spacing={2} sx={{ mt: 2 }} alignItems="center">
                                    <Box
                                        component="img"
                                        src={data.current_badge}
                                        alt="Current Badge"
                                        sx={{ width: 52, height: 52 }}
                                    />
                                    <Box>
                                        <Typography sx={{ fontWeight: 800 }}>
                                            {data.current_badge_name || "Current Badge"}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#667085" }}>
                                            {data.current_badge_note || "Nice progress so far."}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Box
                                    sx={{
                                        mt: 3,
                                        bgcolor: "#F9FAFB",
                                        border: "1px solid #EEF0F6",
                                        borderRadius: 2,
                                        p: 2,
                                    }}
                                >
                                    <Typography variant="body2" sx={{ color: "#111827" }}>
                                        <b>{data.remaining_to_unlock_next_badge ?? 0}</b> more badge(s) to go
                                    </Typography>

                                    <Stack direction="row" spacing={2} sx={{ mt: 2 }} alignItems="center">
                                        <Box
                                            component="img"
                                            src={data.next_badge}
                                            alt="Next Badge"
                                            sx={{ width: 44, height: 44 }}
                                        />
                                        <Box>
                                            <Typography sx={{ fontWeight: 800, fontSize: 14 }}>
                                                {data.next_badge_name || "Next Badge"}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: "#667085" }}>
                                                {data.next_badge_hint || "You're close—keep going."}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Box>
                        </Grid>

                        {/* RIGHT PANEL */}
                        <Grid item xs={12} md={8} sx={{ p: 4 }}>
                            <Stack
                                direction="row"
                                alignItems="baseline"
                                justifyContent="space-between"
                                sx={{ mb: 3 }}
                            >
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                        Achievements
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#667085", mt: 0.5 }}>
                                        Tap a badge to view details.
                                    </Typography>
                                </Box>
                            </Stack>

                            <AchievementGrid
                                achievements={achievements}
                                onSelect={setSelectedAchievement}
                            />
                        </Grid>
                    </Grid>
                </Card>

                {selectedAchievement && (
                    <AchievementModal
                        achievement={selectedAchievement}
                        nextAvailable={nextAvailable}
                        onClose={() => setSelectedAchievement(null)}
                    />
                )}
            </Box>
        </Box>
    );
}
