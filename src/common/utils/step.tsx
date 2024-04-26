
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react"


function Step1(props:any){
    return(
        <div >

            <Box sx={{ width: '30%', margin:'auto'}}>
                <Stepper activeStep={props.stepNum} alternativeLabel >
                    {props.steps.map((obj:string) => (
                    <Step key={obj} >
                        <StepLabel>{obj}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Box>
            
        </div>
    )
}
export default Step1;