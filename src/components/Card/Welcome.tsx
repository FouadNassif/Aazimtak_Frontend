import { Box, Button, Typography, Fade, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import colorPalettes from "@/data/colorPalettes";
import fonts from "@/data/fonts";
import Head from "next/head";
import { useState, useEffect } from "react";

function Loader({ progress }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.95)",
        zIndex: 9999,
        position: "fixed",
        inset: 0,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 24 }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: "6px solid #eee",
            borderTop: "6px solid #c08497",
            animation: "spin 1s linear infinite",
            mb: 2,
          }}
        />
      </motion.div>
      <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: 1 }}>
        Loading... {progress}%
      </Typography>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}

export default function Card({
  wedding,
  weddingDetails,
  setReady,
  preferences,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const welcomeScreenPreferences = preferences?.welcomeScreen || {};
  const palette =
    colorPalettes.find(
      (palette) => palette.id === welcomeScreenPreferences.palette
    ) || colorPalettes[0];
    console.log(palette)
  const textFont = fonts.find(font => font.id === welcomeScreenPreferences.fontFamily) || fonts[5];
  // Helper for semi-transparent overlay
  const overlay = (color, opacity = 0.08) => {
    return `linear-gradient(rgba(${parseInt(color.slice(1,3),16)},${parseInt(color.slice(3,5),16)},${parseInt(color.slice(5,7),16)},${opacity}), rgba(${parseInt(color.slice(1,3),16)},${parseInt(color.slice(3,5),16)},${parseInt(color.slice(5,7),16)},${opacity}))`;
  };

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Preload images before showing Welcome screen
  useEffect(() => {
    const imageUrls = (weddingDetails.images || []).filter(Boolean);
    if (imageUrls.length === 0) {
      setLoading(false);
      setProgress(100);
      return;
    }
    let loaded = 0;
    imageUrls.forEach((url) => {
      const img = new window.Image();
      img.onload = img.onerror = () => {
        loaded++;
        setProgress(Math.round((loaded / imageUrls.length) * 100));
        if (loaded === imageUrls.length) {
          setTimeout(() => setLoading(false), 300); // small delay for smoothness
        }
      };
      img.src = url;
    });
  }, [weddingDetails.images]);

  if (loading) {
    return <Loader progress={progress} />;
  }

  return (
    <>
      {/* Ensure font is loaded */}
      <Head>
        <link href={textFont.link} rel="stylesheet" />
      </Head>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: palette.gradientBackground || palette.colors.background,
          p: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Glow/Blur */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: overlay(palette.colors.accent, 0.10),
            filter: "blur(8px)",
            opacity: 0.8,
            zIndex: 0,
          }}
        />

        {/* Decorative Corners with gentle rotate animation */}
        <motion.div
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{ position: "absolute", top: "5%", left: "5%", zIndex: 1 }}
        >
          <Box
            sx={{
              width: "90px",
              height: "90px",
              background: `url('/assets/img/floral-corner.png') center/contain no-repeat, ${overlay(palette.colors.secondary, 0.14)}`,
              opacity: 0.22,
              borderRadius: "50%",
            }}
          />
        </motion.div>
        <motion.div
          initial={{ rotate: 10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{ position: "absolute", bottom: "5%", right: "5%", zIndex: 1 }}
        >
          <Box
            sx={{
              width: "90px",
              height: "90px",
              background: `url('/assets/img/floral-corner.png') center/contain no-repeat, ${overlay(palette.colors.secondary, 0.14)}`,
              opacity: 0.22,
              borderRadius: "50%",
              transform: "rotate(180deg)",
            }}
          />
        </motion.div>

        {/* Main Card with animated entrance and glow */}
        <Fade in timeout={1200}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, type: "spring", bounce: 0.18 }}
            sx={{
              zIndex: 2,
              background: palette.colors.card || "rgba(255,255,255,0.96)",
              borderRadius: "32px",
              p: isMobile ? 4 : 7,
              maxWidth: "95vw",
              width: isMobile ? "100%" : "520px",
              boxShadow: `0 8px 40px 0 ${palette.colors.shadow || "rgba(0,0,0,0.10)"}, 0 0 0 6px ${palette.colors.accent}22`,
              border: `2.5px solid ${palette.colors.accent}`,
              backdropFilter: "blur(16px)",
              position: "relative",
            }}
          >
            {/* Couple Names with animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <Typography
                variant={isMobile ? "h4" : "h2"}
                sx={{
                  fontFamily: textFont.css,
                  fontWeight: 700,
                  letterSpacing: "3px",
                  color: palette.colors.text,
                  mb: 2,
                  textTransform: "uppercase",
                  lineHeight: 1.18,
                  textShadow: `0 2px 16px ${palette.colors.shadow || "rgba(0,0,0,0.10)"}`,
                  transition: "color 0.3s",
                }}
              >
                {wedding.groom_name} & {wedding.bride_name}
              </Typography>
            </motion.div>

            {/* Wedding Date with fade-in */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.7 }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontFamily: textFont.css,
                  fontSize: isMobile ? "17px" : "20px",
                  fontStyle: "italic",
                  color: palette.colors.secondary,
                  mb: 3,
                  letterSpacing: "1.5px",
                }}
              >
                {new Date(weddingDetails.wedding_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </motion.div>

            {/* Divider Line with shimmer */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.7 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.9, delay: 1.0 }}
            >
              <Box
                sx={{
                  width: "90px",
                  height: "4px",
                  background: `linear-gradient(90deg, ${palette.colors.accent}, ${palette.colors.secondary})`,
                  mx: "auto",
                  borderRadius: "2px",
                  mb: 3,
                  boxShadow: `0 0 12px 2px ${palette.colors.accent}55`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  component={motion.div}
                  initial={{ left: "-40%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "40%",
                    height: "100%",
                    background: `linear-gradient(90deg, transparent, ${palette.colors.card}99, transparent)`,
                    opacity: 0.5,
                  }}
                />
              </Box>
            </motion.div>

            {/* View Invitation Button with pulse and hover animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 1.2 }}
            >
              <Button
                component={motion.button}
                whileHover={{ scale: 1.07, boxShadow: `0 0 0 6px ${palette.colors.accent}33` }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setReady(true)}
                sx={{
                  backgroundColor: palette.colors.accent,
                  color: palette.colors.buttonText || "#fff",
                  px: 6,
                  py: 2,
                  fontSize: "18px",
                  fontWeight: 700,
                  borderRadius: "32px",
                  textTransform: "uppercase",
                  fontFamily: textFont.css,
                  boxShadow: `0px 8px 24px ${palette.colors.accent}44`,
                  border: `2px solid ${palette.colors.secondary}`,
                  transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                  letterSpacing: "2px",
                  mt: 1,
                  mb: 1,
                  "&:hover": {
                    backgroundColor: palette.colors.secondary,
                    color: palette.colors.accent,
                    boxShadow: `0 0 0 8px ${palette.colors.secondary}22`,
                  },
                }}
              >
                View Invitation
              </Button>
            </motion.div>
          </Box>
        </Fade>

        {/* Floating Flowers with gentle up-down animation */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "15%", right: "10%", zIndex: 1 }}
        >
          <Box
            sx={{
              width: "54px",
              height: "54px",
              background: `url('/floating-flower.png') center/contain no-repeat, ${overlay(palette.colors.accent, 0.10)}`,
              opacity: 0.32,
              borderRadius: "50%",
            }}
          />
        </motion.div>
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: "25%", left: "10%", zIndex: 1 }}
        >
          <Box
            sx={{
              width: "44px",
              height: "44px",
              background: `url('/floating-flower.png') center/contain no-repeat, ${overlay(palette.colors.accent, 0.10)}`,
              opacity: 0.32,
              borderRadius: "50%",
            }}
          />
        </motion.div>

        {/* Floating animation keyframes for fallback */}
        <style>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}</style>
      </Box>
    </>
  );
}
