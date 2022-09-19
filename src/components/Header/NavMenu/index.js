import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

const pages = ["Products", "Pricing", "Blog"];

function NavMenu({
  children: [anchorElNav, setAnchorElNav, handleCloseNavMenu],
}) {
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const styles = {
    box: { flexGrow: 1, display: { xs: "flex", md: "none" } },
    menu: { display: { xs: "block", md: "none" } },
  };

  return (
    <Box sx={styles.box}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={styles.menu}
      >
        {pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default NavMenu;
