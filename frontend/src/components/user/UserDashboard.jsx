import {useEffect, useMemo, useState} from "react";
import {
    Avatar,
    Box,
    Card,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import AchievementGrid from "../achievement/AchievementGrid.jsx";
import AchievementModal from "../achievement/AchievementModal.jsx";
import {apiGet} from "../../api/achievements.js";

export default function UserDashboard({userId, userName = "Friend", userAvatar = ""}) {
    const [userAchData, setUserAchData] = useState(null);
    const [allAchievements, setAllAchievements] = useState(null);
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    useEffect(() => {
        let alive = true;

        Promise.all([
            apiGet(`users/${userId}/achievements`),
            apiGet(`achievements`),
        ])
            .then(([userRes, allRes]) => {
                if (!alive) return;
                setUserAchData(userRes.data);
                setAllAchievements(allRes.data);
            })
            .catch(console.error);

        return () => {
            alive = false;
        };
    }, [userId]);

    const achievements = useMemo(() => {
        if (!userAchData || !Array.isArray(allAchievements)) return [];

        const unlockedSet = new Set(userAchData.unlocked_achievements || []);
        const nextSet = new Set(userAchData.next_available_achievements || []);

        const sorted = [...allAchievements].sort((a, b) => (a.no_of_orders || 0) - (b.no_of_orders || 0));

        return sorted.map((a) => ({
            id: a.id,
            name: a.name,
            slug: a.slug,
            description: a.description,
            icon: a.badge,
            badge: a.badge,
            no_of_orders: a.no_of_orders,
            unlocked: unlockedSet.has(a.name),
            isNext: nextSet.has(a.name),
        }));
    }, [userAchData, allAchievements]);

    if (!userAchData || !allAchievements) {
        return (
            <Box sx={{p: 6, display: "grid", placeItems: "center"}}>
                <CircularProgress/>
            </Box>
        );
    }

    const unlockedSet = new Set(userAchData.unlocked_achievements || []);
    const nextAvailableNames = (userAchData.next_available_achievements || []).filter(
        (n) => !unlockedSet.has(n)
    );

    const hasNextBadge = Boolean(userAchData.next_badge);

    const highestUnlocked = [...achievements]
        .filter((a) => a.unlocked)
        .sort((a, b) => (b.no_of_orders || 0) - (a.no_of_orders || 0))[0];

    const currentBadgeToShow = userAchData.current_badge || highestUnlocked?.badge || null;

    return (
        <Box sx={{minHeight: "100vh", bgcolor: "#F6F7FB", py: 6}}>
            <Box sx={{maxWidth: 1100, mx: "auto", px: 3}}>
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        border: "1px solid #EEF0F6",
                    }}
                >
                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            sx={{
                                p: 4,
                                borderRight: {md: "1px solid #EEF0F6"},
                                borderBottom: {xs: "1px solid #EEF0F6", md: "none"},
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{position: "relative"}}>
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
                                    <Typography variant="h6" sx={{fontWeight: 900}}>
                                        You’ve got this,{" "}
                                        <span style={{color: "#667085"}}>{userName}!</span>
                                    </Typography>
                                    <Typography variant="body2" sx={{color: "#667085", mt: 0.5}}>
                                        Keep unlocking achievements.
                                    </Typography>
                                </Box>
                            </Stack>

                            <Divider sx={{my: 4}}/>


                            {currentBadgeToShow && (
                                <Box>
                                    <Typography variant="overline" sx={{color: "#667085"}}>
                                        Current Badge
                                    </Typography>

                                    <Stack direction="row" spacing={2} sx={{mt: 2}}
                                           alignItems="center">
                                        <Box
                                            component="img"
                                            src={currentBadgeToShow}
                                            alt="Current Badge"
                                            sx={{
                                                width: 52,
                                                height: 52,
                                                borderRadius: 1,
                                                objectFit: "cover"
                                            }}
                                        />
                                        <Box>
                                            <Typography sx={{fontWeight: 800}}>
                                                {highestUnlocked?.name || "Current Badge"}
                                            </Typography>
                                            <Typography variant="body2" sx={{color: "#667085"}}>
                                                {highestUnlocked
                                                    ? `Unlocked at ${highestUnlocked.no_of_orders} orders`
                                                    : "Keep it up!"}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Divider sx={{my: 3}}/>
                                </Box>
                            )}

                            {hasNextBadge && (
                                <Box
                                    sx={{
                                        bgcolor: "#F9FAFB",
                                        border: "1px solid #EEF0F6",
                                        borderRadius: 2,
                                        p: 2,
                                    }}
                                >
                                    <Typography variant="body2" sx={{color: "#111827"}}>
                                        <b>{userAchData.remaining_to_unlock_next_badge ?? 0}</b> more
                                        achievement(s)
                                    </Typography>

                                    <Stack direction="row" spacing={2} sx={{mt: 2}}
                                           alignItems="center">
                                        <Box
                                            component="img"
                                            src={userAchData.next_badge}
                                            alt="Next Badge"
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: 1,
                                                objectFit: "cover"
                                            }}
                                        />
                                        <Box>
                                            <Typography sx={{fontWeight: 800, fontSize: 14}}>
                                                Next Badge
                                            </Typography>
                                            <Typography variant="caption" sx={{color: "#667085"}}>
                                                {nextAvailableNames.length
                                                    ? `Up next: ${nextAvailableNames[0]}`
                                                    : "You're close—keep going."}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            )}
                        </Grid>


                        <Grid item xs={12} md={8} sx={{ p: 4 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    mb: 4,
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                    Achievements
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{ color: "#667085", mt: 0.5 }}
                                >
                                    Tap a badge to view details.
                                </Typography>
                            </Box>

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
                        nextAvailable={nextAvailableNames}
                        onClose={() => setSelectedAchievement(null)}
                    />
                )}
            </Box>
        </Box>
    );
}
