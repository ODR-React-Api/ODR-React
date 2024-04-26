import React from "react"
import {Link} from 'react-router-dom'
import LockIcon from '@mui/icons-material/Lock';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

class LoginFooter extends React.Component{
    render() {
        return  (
            <div className="footerdiv">
              <p>
                <span className="spanOfFooter">
                    <LockIcon fontSize="small" viewBox="0 -2 24 24"/>
                    <Link className="linkOfFooter" to = '/PrivatePolicies'>プライバシーポリシー</Link>
                </span>
                <span className="spanOfFooter">    
                    <DescriptionOutlinedIcon fontSize="small" viewBox="0 -2 24 24"/>
                    <Link className="linkOfFooter" to = '/RyProtocols'>利用規約</Link>
                </span>
              </p>
            </div>
        )
    }
}
export default LoginFooter;