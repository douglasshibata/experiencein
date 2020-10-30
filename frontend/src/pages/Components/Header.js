import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { logout } from '../../services/auth';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const {title } = props;
  const handleLogout = e => {
    logout();
    window.location.href = '/';
  };
  return (
    <React.Fragment>
      <Container>
      <Toolbar className={classes.toolbar}>
        <Button size="small" href="/perfis">ExperienceIn</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
         Olá, <Link to='/perfil'>{title}</Link>
        </Typography>
        <Button variant="outlined" size="small"  onClick={handleLogout}>
          Sair
        </Button>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
     
      </Toolbar>
      </Container>
    </React.Fragment>
  );
}