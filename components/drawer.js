import React,{useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import PagesIcon from '@material-ui/icons/Pages';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Link from 'next/link'
import {getCookie} from '../lib/cookie'
import * as action from '../redux/actionIndex'
import { connect } from 'react-redux'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    padding: "10px 2rem"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openSub, setOpenSub] = React.useState(props.submenu);
  const [openSub2, setOpenSub2] = React.useState(props.submenuCt);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const showSubMenu = () => {
    setOpenSub(!openSub)
  }
  
  const showSubMenu2 = () => {
    setOpenSub2(!openSub2)
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <Link href="/projects">
                <a style={{textDecoration:'none',color:'black'}}>
                    <ListItem button>
                    <ListItemText primary={'Project'} />
                    </ListItem>
                </a>
            </Link>
            <a style={{textDecoration:'none',color:'black'}} onClick={showSubMenu}>
                <ListItem button>
                  <ListItemText primary={'Ideas + People'} />
                  {openSub ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon/>}
                </ListItem>
            </a>
            <div style={{display: openSub ? 'block' : 'none', paddingLeft: '1rem', backgroundColor: '#f7f7f7' }}>
                <ul>
                  <li>
                    <Link href="/testimonials">
                    <a style={{textDecoration:'none',color:'black'}}>
                        <ListItem button>
                        <ListItemText primary={'Testimonials'} />
                        </ListItem>
                    </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/our-team">
                        <a style={{textDecoration:'none',color:'black'}}>
                            <ListItem button>
                            <ListItemText primary={'Our Team'} />
                            </ListItem>
                        </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/partnership">
                        <a style={{textDecoration:'none',color:'black'}}>
                            <ListItem button>
                            <ListItemText primary={'Partnership'} />
                            </ListItem>
                        </a>
                    </Link>
                  </li>
                </ul>
            </div>
            <Link href="/studies">
                <a style={{textDecoration:'none',color:'black'}}>
                    <ListItem button>
                    <ListItemText primary={'Studies'} />
                    </ListItem>
                </a>
            </Link>
            <Link href="/intouch">
                <a style={{textDecoration:'none',color:'black'}}>
                    <ListItem button>
                    <ListItemText primary={'Intouch'} />
                    </ListItem>
                </a>
            </Link>
            <Link href="/career">
                <a style={{textDecoration:'none',color:'black'}}>
                    <ListItem button>
                    <ListItemText primary={'Career'} />
                    </ListItem>
                </a>
            </Link>
            <a style={{textDecoration:'none',color:'black'}} onClick={showSubMenu2}>
                <ListItem button>
                <ListItemText primary={'Contact'} />
                {openSub2 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon/>}
                </ListItem>
            </a>
            <div style={{display: openSub2 ? 'block' : 'none', paddingLeft: '1rem', backgroundColor: '#f7f7f7' }}>
                <ul>
                  <li>
                    <Link href="/leads">
                    <a style={{textDecoration:'none',color:'black'}}>
                        <ListItem button>
                        <ListItemText primary={'Leads'} />
                        </ListItem>
                    </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/leads-promo">
                        <a style={{textDecoration:'none',color:'black'}}>
                            <ListItem button>
                            <ListItemText primary={'Leads Promo'} />
                            </ListItem>
                        </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/email-receivers">
                        <a style={{textDecoration:'none',color:'black'}}>
                            <ListItem button>
                            <ListItemText primary={'Email Receivers'} />
                            </ListItem>
                        </a>
                    </Link>
                  </li>
                </ul>
            </div>
            <Link href="/faq">
                <a style={{textDecoration:'none',color:'black'}}>
                    <ListItem button>
                    <ListItemText primary={'FAQ'} />
                    </ListItem>
                </a>
            </Link>
        </List>
        <Divider />
        <List>
          {['Log Out'].map((text, index) => (
            <ListItem button key={index} onClick={()=>props.deauthenticate()}>
              <ListItemText primary={'Log Out'} />
            </ListItem>
           ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email,password) => dispatch(action.authenticate(email,password)),
        deauthenticate : () => dispatch(action.deauthenticate())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MiniDrawer)

