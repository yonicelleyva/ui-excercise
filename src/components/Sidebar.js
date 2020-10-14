import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles} from '@material-ui/core/styles';


import mockedEmails from "../mockData/emails";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
  tags: {
    margin: '5px'
  }
}));

function Sidebar({inboxEmails}) {
  const classes = useStyles();
  let tags = mockedEmails.messages.reduce((allTags, email) => allTags.concat(email.tags), []);
  tags= [...new Set([...tags])];

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={`Inbox (${inboxEmails})`} />
          </ListItem>
          <ListItem button>
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary={'Trash'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary={'Tags'} />
          </ListItem>
          <div>
            {tags.map((tag,i) => <Chip key={i} className={classes.tags} variant="outlined" color="secondary" label={tag}/>)}
          </div>
        </List>

      </Drawer>
    </>
  );
}

export default Sidebar;