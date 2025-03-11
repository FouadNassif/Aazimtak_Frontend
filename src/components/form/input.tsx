import {TextField} from "@mui/material";
interface InputProps {
  label: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({label, value, type, onChange}: InputProps){
    return (<TextField
                label={label}
                value={value}
                type={type}
                onChange={onChange}
                fullWidth
                variant="outlined"
                autoComplete="off"
                sx={{
                    "& .MuiInputBase-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "& .MuiInputBase-input": {
                      color: "whitesmoke",
                    },
                  }}
              />)
}