import React from "react";
import {
  Box,
  TextField,
  Link,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "date";
  required?: boolean;
  value?: string | number;
}

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = React.useState<Record<string, any>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          backgroundColor: "#F1F5F9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "40px",
            width: "100%",
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <Link href="/" underline="none">
              <Avatar
                alt="Aazimtak Logo"
                src="/assets/img/Alogo.png"
                sx={{ width: 50, height: 50 }}
              />
            </Link>
            <Typography variant="h5" sx={{ marginLeft: 2, fontWeight: 700 }}>
              AAZIMTAK
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, textAlign: "center" }}
          >
            Add New Wedding
          </Typography>
          {fields.map((field, index) => (
            <TextField
              key={index}
              name={field.name} // Add this line
              label={field.label} // Use field.label for correct display
              type={field.type}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              fullWidth
              autoComplete="off"
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "#F4F6F8",
                },
                marginBottom: "20px",
              }}
            />
          ))}
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              backgroundColor: "#00BFFF",
              "&:hover": { backgroundColor: "#0099CC" },
              padding: "12px",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            ADD WEDDING
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default DynamicForm;

// export default function addWedding() {
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//
//       </form>
//     </>
//   );
// }
