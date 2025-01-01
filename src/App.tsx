import { useState } from 'react'


// import './App.css'
import { Box, Button, Drawer } from '@mui/material'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Places from './componnets/Places';
import Images from './componnets/images';
import ExpensesTable from './componnets/Pay';
import KosherRestaurants from './componnets/Restaurants';


function App() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };
  const handleNavigatePlaces = () => {
    navigate('/Places'); 
  };
  const handleNavigateRestaurants = () => {
    navigate('/Restaurants'); 
  };
  const handleNavigCrudPay = () => {
    navigate('/Pay');
  }
  const handleNavigImages = () => {
    navigate('/Images');
  }
 

  return (
    <>
    <div className='app'>     
      <h1 className='header'>משפחת דרוק 2025 הונגריה</h1>  
      <Routes>
        <Route path="/Places" element={<Places />} />
        <Route path="/Restaurants" element={<KosherRestaurants />} />
        <Route path="/Pay" element={<ExpensesTable />} />
        <Route path="/Images" element={<Images />} />        
      </Routes>
      </div>
      <Button variant="contained" onClick={handleToggleDrawer} sx={{ position: 'absolute', top: 20, left: 20 }}>
        הרשימה שלנו
      </Button>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleToggleDrawer} 
      >
        <Box
          sx={{
            width: 250, 
            height: '100vh',
            backgroundColor: '#f4f4f4',
            display: 'flex',
            flexDirection: 'column', 
            padding: 2, 
          }}
        >
          <Button
            variant="contained"
            onClick={handleNavigatePlaces}
            sx={{ mb: 2 }} 
          >
            מקומות שחייבים להיות
          </Button>
          <Button
            variant="contained"
            onClick={handleNavigImages}
            sx={{ mb: 2 }} 
          >
            תמונות 
          </Button>
          <Button
            variant="contained"
            onClick={handleNavigateRestaurants}
            sx={{ mb: 2 }}
          >
            מסעדות
          </Button>
          <Button
            variant="contained"
            onClick={handleNavigCrudPay}
            sx={{ mb: 2 }}
          >
            תשלומים
          </Button>
          
        </Box>
      </Drawer>
   
    </>
  )
}

export default App
