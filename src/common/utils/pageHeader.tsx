import { Link } from "react-router-dom";

function PageHeader (props:{pageFlg:string}) {
    
    return (
      <div style={{position: 'relative', right: '10px', top: '10px', float: 'right'}}>
        {props.pageFlg === '0' && <Link style={{marginRight:'10px', textDecorationLine:'none', color:'#2098D0'}} to = '/MosList'>戻る</Link>}
        <Link style={{marginRight:'20px', textDecorationLine:'none', color:'#2098D0'}} to = '/Login'>ログアウト</Link>
      </div>
    )
  }

  export default PageHeader;