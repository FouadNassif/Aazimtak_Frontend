import LinkIcon from "@mui/icons-material/Link";
import PeopleIcon from "@mui/icons-material/People";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const plans = [
  {
    name: "Free",
    price: "0",
    period: "/month",
    features: [
      { text: "One link for all (static)", icon: LinkIcon },
      { text: "No Guest Limit", icon: PeopleIcon },
      { text: "Static Template (No customization)", icon: DesignServicesIcon },
      { text: "No Dashboard", icon: DashboardIcon },
      { text: "Valid for 7 days", icon: AccessTimeIcon },
    ],
    isPopular: false,
  },
  {
    name: "Basic",
    price: "9",
    period: "/month",
    features: [
      { text: "Each Guest has own link", icon: LinkIcon },
      { text: "Up to 100 Guests", icon: PeopleIcon },
      { text: "Static Template", icon: DesignServicesIcon },
      { text: "Basic Dashboard Features", icon: DashboardIcon },
      { text: "Valid for 30 days", icon: AccessTimeIcon },
    ],
    isPopular: false,
  },
  {
    name: "Standard",
    price: "19",
    period: "/month",
    features: [
      { text: "Personalized Guest Links", icon: LinkIcon },
      { text: "Up to 250 Guests", icon: PeopleIcon },
      { text: "Custom Fonts & Colors", icon: DesignServicesIcon },
      { text: "Full Dashboard Access", icon: DashboardIcon },
      { text: "Valid for 90 days", icon: AccessTimeIcon },
    ],
    isPopular: true,
  },
  {
    name: "Premium",
    price: "39",
    period: "/month",
    features: [
      { text: "Advanced Guest Management", icon: LinkIcon },
      { text: "Unlimited Guests", icon: PeopleIcon },
      { text: "Full Customization + Images", icon: DesignServicesIcon },
      { text: "Advanced Analytics", icon: DashboardIcon },
      { text: "Valid for 180 days", icon: AccessTimeIcon },
    ],
    isPopular: false,
  },
  {
    name: "Premium",
    price: "299",
    period: "/month",
    features: [
      { text: "Advanced Guest Management", icon: LinkIcon },
      { text: "Unlimited Guests", icon: PeopleIcon },
      { text: "Full Customization + Images", icon: DesignServicesIcon },
      { text: "Advanced Analytics", icon: DashboardIcon },
      { text: "Valid for 180 days", icon: AccessTimeIcon },
    ],
    isPopular: false,
  },
  {
    name: "Lifetime",
    price: "299",
    period: "one-time",
    features: [
      { text: "Each Guest his own link", icon: LinkIcon },
      { text: "Unlimited Guests", icon: PeopleIcon },
      { text: "Create your own template", icon: DesignServicesIcon },
      { text: "Full Dashboard Access", icon: DashboardIcon },
      { text: "Lifetime validity", icon: AccessTimeIcon },
    ],
    isPopular: true,
    isLifetime: true,
  },
];
