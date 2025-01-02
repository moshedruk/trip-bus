import React, { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Images() {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleImageDelete = (indexToDelete: number) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== indexToDelete));
  };

  return (
    <Box sx={{ padding: 3, textAlign: "center" }}>
      <h2>Gallery</h2>

      {/* כפתור העלאה מעוצב */}
      <Button variant="contained" component="label" sx={{ marginBottom: 2 }}>
        Upload Images
        <input type="file" multiple accept="image/*" hidden onChange={handleImageUpload} />
      </Button>

      {/* תצוגת תמונות */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {images.map((src, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              width: 200,
              height: 200,
              overflow: "hidden",
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: "#fff",
            }}
          >
            {/* תמונה */}
            <img
              src={src}
              alt={`Uploaded ${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* כפתור מחיקה */}
            <IconButton
              onClick={() => handleImageDelete(index)}
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
              }}
            >
              <DeleteIcon sx={{ color: "#f44336" }} />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
