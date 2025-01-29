import React from "react";
import {
  Box,
  TextField,
  Link,
  Avatar,
  Typography,
  Button,
  Container,
  Paper,
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            py: 4,
            px: { xs: 3, md: 6 },
            backgroundColor: "white",
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          {/* Header Section */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Link
              href="/"
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Avatar
                alt="Aazimtak Logo"
                src="/assets/img/Alogo.png"
                sx={{
                  width: 60,
                  height: 60,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  ml: 2,
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #00BFFF, #0099CC)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                AAZIMTAK
              </Typography>
            </Link>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                mb: 3,
              }}
            >
              Add New Wedding
            </Typography>
          </Box>

          {/* Form Fields */}
          <Box
            sx={{
              display: "grid",
              gap: 3,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            {fields.map((field, index) => (
              <TextField
                key={index}
                name={field.name}
                label={field.label}
                type={field.type}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
                fullWidth
                autoComplete="off"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "grey.50",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: "grey.100",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white",
                      boxShadow: "0 0 0 2px rgba(0,191,255,0.2)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "text.secondary",
                  },
                }}
              />
            ))}

            {/* Submit Button */}
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                mt: 2,
                py: 1.5,
                px: 4,
                backgroundColor: "#00BFFF",
                backgroundImage: "linear-gradient(45deg, #00BFFF, #0099CC)",
                color: "white",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1.1rem",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,191,255,0.3)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 6px 16px rgba(0,191,255,0.4)",
                  backgroundColor: "#0099CC",
                },
              }}
            >
              Add Wedding
            </Button>
          </Box>
        </Paper>
      </form>
    </Container>
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
