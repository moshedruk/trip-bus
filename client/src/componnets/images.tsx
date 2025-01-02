import React, { useEffect, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { socket } from "../main";

interface Image {
  fileName: string;
  filePath: string; // Base64
}

export default function Images() {
  const [images, setImages] = useState<Image[]>([]);
  
  useEffect(() => {
    socket.emit("getAllImages");

    // קבלת התמונות מהשרת
    socket.on("allImage", (imageResponses: any[]) => {
      // עדכון התמונות שהתקבלו ל-state
      const imageObjects = imageResponses.map((image: any) => ({
        fileName: image.fileName,
        filePath: `data:image/png;base64,${image.filePath}`, // הצגת ה-Base64 כ-Data URL
      }));
      setImages(imageObjects);
    });

    // ניקוי כאשר הרכיב מבוטל
    return () => {
      socket.off("allImage");
    };
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => {
        const reader = new FileReader();
  
        return new Promise<string>((resolve, reject) => {
          reader.onloadend = () => {
            const base64 = reader.result as string;
            resolve(base64); // קבלת ה-Base64 של התמונה
          };
  
          reader.onerror = reject;
          reader.readAsDataURL(file); // טוען את הקובץ כ-Base64
        });
      });
  
      // שלח את הקובץ לשרת כ-Binary Data
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const buffer = reader.result as ArrayBuffer;
          socket.emit("fileUploaded", buffer); // שלח את הקובץ לשרת
        };
        reader.readAsArrayBuffer(file);
      });
  
      // כאשר כל התמונות נטענו
      Promise.all(newImages)
  .then((base64Images) => {
    const newImageObjects = base64Images.map((base64, index) => ({
      fileName: files[index].name,
      filePath: base64,
    }));
    setImages((prevImages) => [...prevImages, ...newImageObjects]);
  })
  .catch((error) => {
    console.error("Error reading image files", error);
  });
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
        {images.map((image, index) => (
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
              src={image.filePath}
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
