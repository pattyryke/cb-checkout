import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Menu, MenuItem } from "@mui/material";


export default function NavButton() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <Container 
            fixed
            sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            <Button 
                variant="contained"
                id="basic-button"
                size="small"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpen}
            >
                Navigation Menu
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem 
                    component={Link}
                    to="http://localhost:3001"
                    onClick={handleClose} 
                >Home
                </MenuItem>
                
                <MenuItem 
                    component={Link}
                    to="http://localhost:3001/check-in"
                    onClick={handleClose} 
                >Check-In
                </MenuItem>

                <MenuItem 
                    component={Link}
                    to="http://localhost:3001/check-out"
                    onClick={handleClose} 
                >Check-Out
                </MenuItem>
            </Menu>
        </Container>
    );
}