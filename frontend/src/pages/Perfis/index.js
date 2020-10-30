import React, { useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    titleMain:{
        color:"#092332",
        textAlign:"center",
    },
    pos: {
        marginBottom: 12,
    },
    success:{
        color:"#228b22",
        marginBottom:'-1px'
    },
});
function Perfis() {
    const [perfis, setPerfis] = useState([]);
    const [error, setError] = useState('');
    const classes = useStyles();

    useEffect(() => {
        async function getPerfis() {
            try {
                const response = await api.get('perfis/')
                setPerfis(response.data)
                console.log(response.data);
            } catch (error) {
                setError("Erro ao carregar os dados")
                console.log(error.data);
            }
        }
        getPerfis()
    }, [])
    const allPerfis = perfis.map(item => (
        <Grid item xs={6} sm={3}  key={item.id}>

            <Card className={classes.root} key={item.id}>
                <CardContent  key={item.id}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {item.id}
        </Typography>
                    <Typography variant="h5" component="h2">
                        {item.nome}
        </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {item.email}
        </Typography>
                </CardContent>
                <CardActions>
                {item.pode_convidar?<Button size="small">Convidar</Button>:<p className={classes.success}>Já faz parte da Sua rede de Contatos</p>}
                    
                </CardActions>
            </Card>
        </Grid>

    ))
    const nome = localStorage.getItem('nome')
    return (
        <>
            <Header title={nome} />
            <Container>
                <h1 className={classes.titleMain}>Membros da Rede Social</h1>
                {error && <p id='error'>{error}</p>}
                <Grid container spacing={3}>
                    {allPerfis}
                </Grid>

            </Container>
            <Footer title="Rede Social Experiencein" description="Desenvolvido por Mônica Oliveira e Douglas Shibata" />
        </>
    );
}

export default withRouter(Perfis);