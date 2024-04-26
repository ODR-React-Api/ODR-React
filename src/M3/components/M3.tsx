import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function M3(){
    const navigate = useNavigate();
    return(
        <Button variant="contained" color="success" onClick={() => navigate('/C08/C09')}>M3[ユーザメール・アンケート]</Button>
    )        
}
export default M3;