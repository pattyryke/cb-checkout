import { Container, Typography } from "@mui/material";


export default function TitleBar() {
    const title = "Chromebook Data Management"

    return(
        <Container
            id="title-bar"
            maxWidth="xl"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
            }}
        >

            <Typography variant="h2">
                {title}
            </Typography> 

        </Container>
    );
}