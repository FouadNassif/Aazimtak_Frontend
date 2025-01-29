import { ListItemText, ListItem } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLinks({ link, text, mode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link href={link} style={{ textDecoration: "none" }}>
      <ListItem
        button
        sx={{
          pl: 7,
          py: 1,
          color: isActive
            ? mode === "dark"
              ? "#fff"
              : "#1a1a1a"
            : mode === "dark"
            ? "#999"
            : "#666",
          backgroundColor: isActive
            ? mode === "dark"
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.04)"
            : "transparent",
          "&:hover": {
            backgroundColor:
              mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
          },
          transition: "all 0.2s ease",
        }}
      >
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontSize: "0.815rem",
            fontWeight: isActive ? 500 : 400,
          }}
        />
      </ListItem>
    </Link>
  );
}
