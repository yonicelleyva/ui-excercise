import React, {useState} from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Sidebar from "./components/Sidebar"
import Topbar from './components/Topbar';
import EmailList from './components/EmailList';
import mockedEmails from "./mockData/emails";
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#e53935',
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

function App() {
  const classes = useStyles();
  let tags = mockedEmails.messages.reduce((allTags, email) => allTags.concat(email.tags), []);
  tags = [...new Set([...tags])];
  const [data, setData] = useState({
    emails: mockedEmails.messages,
    selectedEmails: [],
    tags
  });


  const onEmailsSelected = (value) => {
    setData({
      ...data,
      selectedEmails: value
    })
  }

  const onDeleteEmail = ({id, deleteSelected}) => {
    if (deleteSelected) {
      setData({
        ...data,
        selectedEmails: [],
        emails: data.emails.filter(email => !data.selectedEmails.includes(email.id))
      })
    } else {
      setData({
        ...data,
        emails: data.emails.filter(email => email.id !== id)
      })
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Topbar 
          emailsSelected={Boolean(data.selectedEmails.length)}
          onDeleteEmail={onDeleteEmail}>
        </Topbar>
        <Sidebar 
          tags={tags}
          inboxEmails={data.emails.length}>
        </Sidebar>
        <EmailList 
          emails={data.emails}
          selectedEmails={data.selectedEmails}
          onDeleteEmail={onDeleteEmail}
          onEmailsSelected={onEmailsSelected}>
        </EmailList>
      </div>
    </ThemeProvider>
  );
}

export default App;