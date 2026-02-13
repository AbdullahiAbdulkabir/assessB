import { useEffect, useMemo, useState } from "react";
import {
    Avatar,
    Box,
    Card,
    CircularProgress,
    Grid,
    Stack,
    Typography,
    Chip,
    Divider,
} from "@mui/material";
import AchievementGrid from "../achievement/AchievementGrid.jsx";
import AchievementModal from "../achievement/AchievementModal.jsx";

export default function UserDashboard({ userId, userName = "Friend", userAvatar = "" }) {
    const [data, setData] = useState(null);
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:5101/api/users/${userId}/achievements`)
            .then((res) => res.json())
            .then((res) => setData(res.data))
            .catch(console.error);
    }, [userId]);

    // Build achievements list from your API structure (names only)
    const achievements = useMemo(() => {
        if (!data) return [];
        const unlockedSet = new Set(data.unlocked_achievements || []);

        const allNames = Array.from(
            new Set([
                ...(data.unlocked_achievements || []),
                ...(data.next_available_achievements || []),
            ])
        );

        return allNames.map((name, idx) => ({
            id: `${idx}-${name}`,
            name,
            unlocked: unlockedSet.has(name),
            // optional fields (safe if missing)
            icon: "", // if you later add icons mapping, put it here
            message: "",
            description: "",
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

    const hasCurrentBadge = Boolean(data.current_badge);
    const hasNextBadge = Boolean(data.next_badge);

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
                                        src={userAvatar}
                                        alt="User"
                                        sx={{
                                            width: 64,
                                            height: 64,
                                            border: "4px solid rgba(16,185,129,0.25)",
                                            bgcolor: "#E5E7EB",
                                            color: "#111827",
                                            fontWeight: 800,
                                        }}
                                    >
                                        {(userName?.[0] || "U").toUpperCase()}
                                    </Avatar>

                                    <Chip
                                        label="User"
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
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                        You’ve got this,{" "}
                                        <span style={{ color: "#667085" }}>{userName}!</span>
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#667085", mt: 0.5 }}>
                                        Keep unlocking achievements.
                                    </Typography>
                                </Box>
                            </Stack>

                            <Divider sx={{ my: 4 }} />

                            {/* CURRENT BADGE (only show if present) */}
                            {hasCurrentBadge && (
                                <Box>
                                    <Typography variant="overline" sx={{ color: "#667085" }}>
                                        Current Badge
                                    </Typography>

                                    <Stack direction="row" spacing={2} sx={{ mt: 2 }} alignItems="center">
                                        <Box
                                            component="img"
                                            src={data.current_badge}
                                            alt="Current Badge"
                                            sx={{ width: 52, height: 52, borderRadius: 1 }}
                                        />
                                        <Box>
                                            <Typography sx={{ fontWeight: 800 }}>Current Badge</Typography>
                                            <Typography variant="body2" sx={{ color: "#667085" }}>
                                                Keep it up!
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Divider sx={{ my: 3 }} />
                                </Box>
                            )}

                            {/* NEXT BADGE (show if present) */}
                            {hasNextBadge && (
                                <Box
                                    sx={{
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
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: 1,
                                                objectFit: "cover",
                                            }}
                                        />
                                        <Box>
                                            <Typography sx={{ fontWeight: 800, fontSize: 14 }}>
                                                Next Badge
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: "#667085" }}>
                                                Unlock {data.remaining_to_unlock_next_badge ?? 0} more achievements
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            )}
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

                            <AchievementGrid achievements={achievements} onSelect={setSelectedAchievement} />
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
