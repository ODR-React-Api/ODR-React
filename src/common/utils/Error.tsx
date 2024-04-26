import Alert from "@mui/material/Alert";

function Error1(props:any){
    return (
        <div>
            {props.errorId===1 &&
            <div>
                <Alert icon={false} severity="success" >
                    {props.errorMsg[props.errorNum]}
                </Alert>
            </div>
            }
            {props.errorId===2 &&
            <div>
                <Alert icon={false} severity="info" >
                    {props.errorMsg[props.errorNum]}
                </Alert>
            </div>
            }
            {props.errorId===3 &&
            <div>
                <Alert icon={false} severity="warning" >
                    {props.errorMsg[props.errorNum]}
                </Alert>
            </div>
            }
            {props.errorId===4 &&
            <div>
                <Alert icon={false} severity="error" >
                    {props.errorMsg[props.errorNum]}
                </Alert>
            </div>
            }
            {props.errorId===5 &&
            <div>
                <Alert icon={false}  variant="outlined" >
                    {props.errorMsg[props.errorNum]}
                </Alert>
            </div>
            }    
        </div>
    )
}

export default Error1;