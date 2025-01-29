import CelebrationIcon from "@mui/icons-material/Celebration";
import CakeIcon from "@mui/icons-material/Cake";
import BusinessIcon from "@mui/icons-material/Business";
import RsvpIcon from "@mui/icons-material/Mail";
import TimerIcon from "@mui/icons-material/Timer";
import DomainIcon from "@mui/icons-material/Domain";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AnalyticsIcon from "@mui/icons-material/Analytics";

export const packages = [
  {
    name: "Wedding Package",
    price: "49",
    icon: CelebrationIcon,
    features: [
      { text: "Premium Plan", icon: CelebrationIcon },
      { text: "Personalized RSVP", icon: RsvpIcon },
      { text: "Event countdown", icon: TimerIcon },
      { text: "Custom domain", icon: DomainIcon },
      { text: "Lifetime validity for the event", icon: TimerIcon },
    ],
    isPopular: true,
  },
  {
    name: "Birthday Package",
    price: "29",
    icon: CakeIcon,
    features: [
      { text: "Standard Plan", icon: CelebrationIcon },
      { text: "Video background", icon: CelebrationIcon },
      { text: "Music", icon: MusicNoteIcon },
      { text: "Valid for 90 days", icon: TimerIcon },
    ],
    isPopular: false,
  },
  {
    name: "Corporate Events",
    price: "59",
    icon: BusinessIcon,
    features: [
      { text: "Premium Plan", icon: CelebrationIcon },
      { text: "QR Code invitations", icon: QrCodeIcon },
      { text: "Analytics report", icon: AnalyticsIcon },
      { text: "Valid for 180 days", icon: TimerIcon },
    ],
    isPopular: false,
  },
];
