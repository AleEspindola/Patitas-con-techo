import { Button, Card, CardMedia, Grid, Paper, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React from 'react'
import { useSelector } from "react-redux";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const SingularFoundation = () => {
    const infoView = useSelector((state)=>state.id);

    const buttonStyle = {
        bgcolor:'#FFD640',
        mt:2,
        mb:4,
        borderRadius:10
    }
      
    console.log(infoView)
    return (
    <>
        <br/>
        <Container>
                <CardMedia sx={{padding:0, borderRadius:10}}>
                    <img
                    src={infoView.profile_picture}
                    width='100%'
                    id='petPhoto'
                    />
                </CardMedia>
                <br/>
                <Card sx={{borderRadius:5}}>
                    <Stack padding={2} >
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                            <Typography variant='h4' width={'100%'} paddingLeft={2}>{infoView.name}</Typography>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                            <Typography variant='body' paddingLeft={10}>{infoView.size}</Typography>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'row', paddingLeft:1}}>
                            <Typography><LocationOnIcon sx={{paddingTop:1}}/>{infoView.location}</Typography>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'row', paddingLeft:1}}>
                            <Typography variant='body2'><AlternateEmailIcon sx={{paddingTop:1}}/>{infoView.email}</Typography>
                        </Box>                       
                    </Stack>
                </Card>
                <Card sx={{borderRadius:5, marginTop:3, maxHeight:220}}>
                    <Box sx={{padding:2, paddingTop:3, pb:2}}>
                        <Typography variant='h6'>
                            <AssignmentIcon sx={{paddingTop:1, width:30}}/> Descripcion:
                        </Typography>
                        <Typography sx={{paddingTop:2, pl:2}}>
                            {infoView.history}
                        </Typography>
                        
                    </Box>
                </Card>
                <br/>
                <br/>
        </Container>
    </>
    )
}

export default SingularFoundation