import { ListItemText, Link, ListItem } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NavLinks({ link, text }) {
  const router = useRouter();
  const isActive = router.pathname === link;

  return (
    <Link href={link} underline="none" color="white">
      <ListItem
        button
        sx={{
          pl: 4,
          borderBottom: isActive
            ? "2px solid #00BFFF"
            : "2px solid transparent",
          "&:hover": {
            borderBottom: "2px solid #00BFFF",
          },
          transition: "border-color 0.3s ease",
        }}
      >
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  );
}
