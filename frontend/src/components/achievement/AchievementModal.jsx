import {
    Box,
    Dialog,
    DialogContent,
    IconButton,
    Typography,
    Chip,
    Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AchievementModal({ achievement, nextAvailable, onClose }) {

    return (
        <Dialog
            open={Boolean(achievement)}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <IconButton
                onClick={onClose}
                sx={{ position: "absolute", top: 12, right: 12, color: "#667085" }}
                aria-label="Close"
            >
                <CloseIcon />
            </IconButton>

            <DialogContent sx={{ p: 0 }}>
                <Box sx={{ p: 6, textAlign: "center" }}>
                    <Box sx={{ display: "grid", placeItems: "center" }}>
                        {achievement?.icon ? (
                            <Box
                                component="img"
                                src={achievement.icon}
                                alt={achievement.name}
                                sx={{ width: 120, height: 120 }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: "999px",
                                    bgcolor: "#F3F4F6",
                                    border: "1px solid #E5E7EB",
                                }}
                            />
                        )}
                    </Box>

                    <Typography variant="h4" sx={{ mt: 3, fontWeight: 900, color: "#0F172A" }}>
                        {achievement?.name}
                    </Typography>

                    <Typography sx={{ mt: 2, color: "#667085", fontSize: 18 }}>
                        {achievement?.message ||
                            achievement?.description ||
                            (achievement?.unlocked
                                ? "Nice work — keep going!"
                                : "This badge is locked. Keep progressing to unlock it.")}
                    </Typography>

                </Box>

                <Divider />

                <Box sx={{ p: 4 }}>
                    <Typography
                        variant="overline"
                        sx={{ color: "#667085", fontWeight: 900, letterSpacing: 2 }}
                    >
                        UP NEXT
                    </Typography>

                    <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {nextAvailable?.length ? (
                            nextAvailable.slice(0, 8).map((n) => (
                                <Chip key={n} label={n} variant="outlined" sx={{ borderRadius: "999px" }} />
                            ))
                        ) : (
                            <Typography variant="body2" sx={{ color: "#667085" }}>
                                No upcoming achievements right now.
                            </Typography>
                        )}
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
