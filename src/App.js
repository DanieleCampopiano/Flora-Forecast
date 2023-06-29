
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Amplify } from 'aws-amplify';
import { Authenticator  } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import SiteNav from './components/Common/SiteNav';
import SiteFooter from './components/Common/SiteFooteer';
import {Route,Routes} from 'react-router-dom';
import HomePage from './components/home/HomePage';
import Contacts from './components/contacts/Contacts';



Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator loginMechanisms={['email']} >
    {({ signOut, user }) => (
      <div>
        <SiteNav logOut={signOut} />
        <Routes>
          <Route path='*' element={<HomePage />} />
          <Route path='/' exact={true} element={<HomePage />} />
          <Route path='/contacts' element={<Contacts />} />
        </Routes>
        <SiteFooter />
      </div>
    )}
    </Authenticator>
  );
}

export default App;
