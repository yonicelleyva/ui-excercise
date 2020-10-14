import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 2,
    padding: theme.spacing(3),
  },
  emailPreview: {
    display: 'flex',
    alignItems: 'center'
  },
  toolbar: theme.mixins.toolbar,
  date: {
    marginLeft: 'auto',
    fontWeight: 'bold'
  },
  subject: {
    fontWeight: 'bold'
  },
  tags: {
    marginLeft: '5px'    
  }
}));

function EmailList({emails, selectedEmails, onDeleteEmail, onEmailsSelected, clearSelected}) {
  const classes = useStyles();

  const handleToggle = (id) => {
    const currentIndex = selectedEmails.indexOf(id);
    const newSelected = [...selectedEmails];

    if (currentIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    onEmailsSelected(newSelected)
  };

  const getEmailPreview = (email) => {
    const body = {__html: email.body.substring(0, 50)}
    return (
      <div className={classes.emailPreview}>
        <div className={classes.subject}>{`${email.subject} ${email.sender}`}</div>
        &nbsp;{'-'}&nbsp;
        <div dangerouslySetInnerHTML={body}/>
        <div>
          {email.tags.map((tag, i) => <Chip key={i} className={classes.tags} variant="outlined" color="secondary" label={tag}/>)}
        </div>
        <div className={classes.date}>{moment(email.date).format('MM-DD-YYYY')}</div>
      </div>
    )
  }

  return (
    <List className={classes.root}>
      <div className={classes.toolbar} />
      {emails.map((email) => 
        <div key={email.id}>
          <ListItem dense button onClick={() => handleToggle(email.id)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedEmails.includes(email.id)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText id={email.id} primary={getEmailPreview(email)} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => onDeleteEmail({id: email.id})}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </div>
      )}
    </List>
  );
}

export default EmailList;