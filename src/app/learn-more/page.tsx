"use client";
export const dynamic = 'force-dynamic';

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Sections from "@/components/Sections";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

const sections = [
  {
    id: "wedding-website",
    title: "Create Your Dream Wedding Website",
    image: "/assets/img/Welcome2.jpg",
    mainDescription:
      "Transform your wedding planning journey with our stunning, customizable wedding websites. Share your love story, event details, and beautiful photos in one elegant space.",
    features: [
      "Beautiful, responsive templates that work on all devices",
      "Customizable design elements to match your wedding theme",
      "Easy-to-use photo galleries and story sections",
      "RSVP management system with guest tracking",
      "Wedding registry integration",
      "Mobile-friendly interface for guests",
      "Password protection for privacy",
      "Real-time updates and notifications",
    ],
    benefits: [
      "Save time and reduce stress in wedding planning",
      "Keep all wedding information in one place",
      "Reduce paper waste with digital invitations",
      "Track guest responses in real-time",
      "Share your love story beautifully",
      "Easy access for all your guests",
    ],
  },
  {
    id: "digital-invitations",
    title: "Digital Invitations That Make an Impact",
    image: "/assets/img/Welcome3.jpg",
    mainDescription:
      "Go paperless with our elegant digital invitations and save-the-dates. Share your special day instantly through email, text, or WhatsApp.",
    features: [
      "Stunning animated invitation designs",
      "Multiple sharing options (Email, SMS, WhatsApp)",
      "Real-time RSVP tracking",
      "Guest list management",
      "Customizable templates",
      "Digital save-the-dates",
      "Rehearsal dinner invitations",
      "Wedding day timeline",
    ],
    benefits: [
      "Save on printing and postage costs",
      "Reduce environmental impact",
      "Instant delivery to all guests",
      "Easy tracking of responses",
      "Beautiful, modern designs",
      "Convenient for international guests",
    ],
  },
  {
    id: "why-aazimtak",
    title: "Your Trusted Wedding Planning Partner",
    image: "/assets/img/WhyAazimtak.jpg",
    mainDescription:
      "With over a decade of experience, we've helped thousands of couples create their perfect wedding experience.",
    features: [
      "10+ years of industry experience",
      "Family-owned business with personalized service",
      "24/7 customer support",
      "Regular platform updates",
      "Secure payment processing",
      "Data privacy protection",
      "Regular backups and security",
      "Comprehensive documentation",
    ],
    benefits: [
      "Personalized attention to your needs",
      "Reliable and trusted service",
      "Proven track record of success",
      "Dedicated support team",
      "Regular feature updates",
      "Competitive pricing",
    ],
  },
  {
    id: "how-it-works",
    title: "Simple Steps to Your Perfect Wedding Website",
    image: null,
    mainDescription:
      "Follow our simple process to create your perfect wedding website in no time.",
    steps: [
      {
        title: "Create Your Account",
        description:
          "Sign up for a free account and get access to your personalized dashboard.",
      },
      {
        title: "Choose Your Template",
        description:
          "Select from our beautiful, mobile-friendly templates designed for your perfect day.",
      },
      {
        title: "Customize Your Details",
        description:
          "Add your wedding date, photos, and important information to your invitation.",
      },
      {
        title: "Manage Your Guest List",
        description:
          "Add, edit, and track your guest list with our easy-to-use management system.",
      },
      {
        title: "Launch Your Website",
        description:
          "Review everything, make final adjustments, and launch your beautiful wedding website.",
      },
    ],
  },
];

const Section = ({ section, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isEven = index % 2 === 0;

  return (
    <Box
      ref={ref}
      id={section.id}
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      sx={{
        py: { xs: 6, md: 12 },
        backgroundColor: isEven ? "#f8f9fa" : "#ffffff",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: isEven 
            ? "linear-gradient(135deg, rgba(42, 82, 152, 0.05) 0%, rgba(25, 118, 210, 0.05) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%)",
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          direction={isMobile ? "column" : (isEven ? "row" : "row-reverse")}
        >
          {section.image && (
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                sx={{
                  position: "relative",
                  height: { xs: "300px", md: "400px" },
                  borderRadius: { xs: "20px", md: "30px" },
                  overflow: "hidden",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                />
              </Box>
            </Grid>
          )}

          <Grid item xs={12} md={section.image ? 6 : 12}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: isEven ? 50 : -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              sx={{
                textAlign: { xs: "center", md: section.image ? "left" : "center" },
                maxWidth: section.image ? undefined : "800px",
                margin: section.image ? undefined : "0 auto",
                position: "relative",
                zIndex: 2,
                px: { xs: 2, md: 0 },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  background: "linear-gradient(45deg, #2a5298, #1976d2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
                  letterSpacing: "-0.5px",
                }}
              >
                {section.title}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  mb: 4,
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  maxWidth: "600px",
                  marginLeft: { xs: "auto", md: section.image ? "0" : "auto" },
                  marginRight: { xs: "auto", md: section.image ? "0" : "auto" },
                }}
              >
                {section.mainDescription}
              </Typography>

              {section.id === "how-it-works" ? (
                <Box>
                  {section.steps.map((step, stepIndex) => (
                    <Paper
                      key={stepIndex}
                      component={motion.div}
                      initial={{ y: 20, opacity: 0 }}
                      animate={inView ? { y: 0, opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 * stepIndex }}
                      sx={{
                        p: { xs: 3, md: 4 },
                        mb: 3,
                        borderRadius: "20px",
                        background: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: "#2a5298",
                          fontSize: { xs: "1.5rem", md: "2rem" },
                        }}
                      >
                        {stepIndex + 1}. {step.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.8,
                          fontSize: { xs: "0.9rem", md: "1rem" },
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Box>
                  <Paper
                    sx={{
                      p: { xs: 3, md: 4 },
                      mb: 4,
                      borderRadius: "20px",
                      background: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        color: "#2a5298",
                        fontSize: { xs: "1.5rem", md: "2rem" },
                      }}
                    >
                      Key Features
                    </Typography>
                    <List>
                      {section.features.map((feature, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <CheckCircleOutlineIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature}
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontSize: { xs: "0.9rem", md: "1rem" },
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>

                  <Paper
                    sx={{
                      p: { xs: 3, md: 4 },
                      borderRadius: "20px",
                      background: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        color: "#2a5298",
                        fontSize: { xs: "1.5rem", md: "2rem" },
                      }}
                    >
                      Benefits
                    </Typography>
                    <List>
                      {section.benefits.map((benefit, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <StarIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={benefit}
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontSize: { xs: "0.9rem", md: "1rem" },
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Box>
              )}

              {index === 0 && (
                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Link href="/register" passHref>
                    <Button
                      variant="contained"
                      size="large"
                      component={motion.button}
                      whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(25, 118, 210, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      sx={{
                        px: { xs: 4, md: 6 },
                        py: { xs: 1.5, md: 2 },
                        borderRadius: "30px",
                        backgroundImage: "linear-gradient(45deg, #2a5298, #1976d2)",
                        textTransform: "none",
                        fontSize: { xs: "1rem", md: "1.2rem" },
                        fontWeight: 600,
                        boxShadow: "0 4px 15px rgba(25, 118, 210, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(25, 118, 210, 0.4)",
                        },
                      }}
                    >
                      Start Your Wedding Journey
                    </Button>
                  </Link>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default function LearnMore() {
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("section");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80; // Adjust this value based on your header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  }, [sectionId]);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
        pt: { xs: 4, md: 6 }, // Add padding top to account for header
      }}
    >
      <motion.div
        className="progress-bar"
        style={{
          scaleX,
          transformOrigin: "0%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(45deg, #2a5298, #1976d2)",
          zIndex: 1000,
        }}
      />
      {sections.map((section, index) => (
        <Section key={section.id} section={section} index={index} />
      ))}
    </Box>
  );
} 