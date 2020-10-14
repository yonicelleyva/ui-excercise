import React, {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: 'calc(100% - 240px)',
    marginLeft: 240,
  },
}));

function Topbar({emailsSelected, onDeleteEmail}) {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        {emailsSelected && 
            <span>
              <IconButton onClick={() => onDeleteEmail({deleteSelected: true})}>
                <DeleteIcon />
              </IconButton>
            </span>
          }
          {!emailsSelected && 
            <Typography variant="h6" noWrap>
              Mail
            </Typography>
          }
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Topbar;