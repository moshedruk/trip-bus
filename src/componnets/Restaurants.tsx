

import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

// נתונים על המסעדות
const kosherRestaurants = [
  {
    name: "מסעדת כרמל",
    description: "מסעדה בשרית כשרה המציעה מטבח יהודי/הונגרי קלאסי.",
    address: "Kazinczy utca 31",
    imageUrl: "/carmel.jpg",  // תמונה מה- public
    link: "https://www.google.com/maps/search/%D7%9E%D7%A1%D7%A2%D7%93%D7%AA+%D7%9B%D7%A8%D7%9E%D7%9C+%28Carmel+Restaurant%29%2C+%D7%91%D7%95%D7%93%D7%A4%D7%A9%D7%98%2C+%D7%94%D7%95%D7%A0%D7%92%D7%A8%D7%99%D7%94"
  },
  {
    name: "מסעדת חנה",
    description: "מסעדה בשרית כשרה המציעה מגוון מנות בשריות בסגנון יהודי.",
    address: "Kazinczy utca 4",
    imageUrl: "/hanna.png",  // תמונה מה- public
    link: "https://www.google.com/maps/search/%D7%9E%D7%A1%D7%A2%D7%93%D7%AA+%D7%97%D7%A0%D7%94+%28Hanna+Restaurant%29%2C+%D7%91%D7%95%D7%93%D7%A4%D7%A9%D7%98%2C+%D7%94%D7%95%D7%A0%D7%92%D7%A8%D7%99%D7%94"
  },
  {
    name: "קפה תל אביב",
    description: "מסעדה חלבית כשרה המציעה מנות ישראליות וים-תיכוניות.",
    address: "Kazinczy utca 28",
    imageUrl: "/telaviv.jpg",  // תמונה מה- public
    link: "https://www.google.com/maps/search/%D7%A7%D7%A4%D7%94+%D7%AA%D7%9C+%D7%90%D7%91%D7%99%D7%91+%28Cafe+Tel+Aviv%29%2C+%D7%91%D7%95%D7%93%D7%A4%D7%A9%D7%98%2C+%D7%94%D7%95%D7%A0%D7%92%D7%A8%D7%99%D7%94"
  },
  {
    name: "מסעדת מיטאפ",
    description: "מסעדה בשרית כשרה המתמחה בסטייקים ובשרים על הגריל.",
    address: "Nagy Diófa utca 4",
    imageUrl: "/mitap.png",  // תמונה מה- public
    link: "https://www.google.com/maps/search/%D7%9E%D7%A1%D7%A2%D7%93%D7%AA+%D7%9E%D7%99%D7%98%D7%90%D7%A4+%28Kosher+MeatUp%29%2C+%D7%91%D7%95%D7%93%D7%A4%D7%A9%D7%98%2C+%D7%94%D7%95%D7%A0%D7%92%D7%A8%D7%99%D7%94"
  },
  {
    name: "ברוקלין בייגל",
    description: "מאפייה חלבית כשרה המציעה מגוון בייגלים, כריכים וקינוחים.",
    address: "Kazinczy utca 4",
    imageUrl: "/bigel.png",  // תמונה מה- public
    link: "https://www.google.com/maps/search/%D7%91%D7%A8%D7%95%D7%A7%D7%9C%D7%99%D7%9F+%D7%91%D7%99%D7%99%D7%92%D7%9C+%28Brooklyn+Bagel%29%2C+%D7%91%D7%95%D7%93%D7%A4%D7%A9%D7%98%2C+%D7%94%D7%95%D7%A0%D7%92%D7%A8%D7%99%D7%94"
  }
];


const KosherRestaurants = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", padding: "20px", justifyContent: "center" }}>
      {kosherRestaurants.map((restaurant, index) => (
        <Card key={index} style={{ width: "300px", marginBottom: "20px", cursor: "pointer" }} onClick={() => window.open(restaurant.link, "_blank")}>
          <CardMedia
            component="img"
            height="200"
            image={restaurant.imageUrl}
            alt={restaurant.name}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {restaurant.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {restaurant.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ marginTop: "8px" }}>
              כתובת: {restaurant.address}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KosherRestaurants;
